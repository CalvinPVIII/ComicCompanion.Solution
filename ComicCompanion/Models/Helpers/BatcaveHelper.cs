using System.Text.RegularExpressions;
using AngleSharp;
using AngleSharp.Io.Network;
using ComicCompanion.Interfaces;
using ComicCompanion.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
public class BatcaveHelper : ComicHelper
// IComicHelper
{
    private static HttpClient _client = new HttpClient { Timeout = new TimeSpan(0, 0, 15) };
    private static HttpClientRequester _requester = new HttpClientRequester(_client);
    private static AngleSharp.IConfiguration _config = Configuration.Default.With(_requester).WithDefaultLoader().WithCookies();
    private static IBrowsingContext _context = BrowsingContext.New(_config);

    public static async Task<SearchResultDto> Search(string keyword, int pageNumber, string cookie)
    {
        _client.DefaultRequestHeaders.Add("Cookie", cookie);

        string url = pageNumber == 1 ? $"https://batcave.biz/search/{keyword}" : $"https://batcave.biz/search/{keyword}/page/{pageNumber}";

        SearchResultDto results = await GetListOfComics(url, pageNumber);
        return results;
    }

    public static async Task<SearchResultDto> Popular(int pageNumber, string cookie)
    {
        _client.DefaultRequestHeaders.Add("Cookie", cookie);
        string url;
        if (pageNumber == 1)
        {
            url = "https://batcave.biz/comix";
        }
        else
        {
            url = $"https://batcave.biz/comix/page/{pageNumber}";
        }

        SearchResultDto results = await GetListOfComics(url, pageNumber);
        return results;
    }

    public static async Task<string[]> GetPagesFromIssue(Issue issue, string cookie)
    {
        _client.DefaultRequestHeaders.Add("Cookie", cookie);
        string url = $"https://batcave.biz/reader/{issue.ComicId}/{issue.IssueId}";
        var response = await _client.GetAsync(url);
        var content = await response.Content.ReadAsStringAsync();
        var document = await _context.OpenAsync(req => req.Content(content));


        string pagesPattern = @"\""images\""\s*:\s*(\[[^\]]*\])";

        Match pagesArrayMatch = Regex.Match(content, pagesPattern);
        string pagesArray = pagesArrayMatch.Value.Replace("\"images\":", "");

        // List<string> images = JsonConvert.DeserializeObject<List<string>>(pagesArray);
        string[] images = JsonConvert.DeserializeObject<string[]>(pagesArray);

        var nodes = document.QuerySelectorAll(".reader__item-wrap");
        Console.WriteLine("stop");
        // string[] pages = images.Select(image => $"https://batcave.biz{image}").ToArray();

        return images;
    }


    private static async Task<SearchResultDto> GetListOfComics(string url, int pageNumber = 0)
    {
        List<Comic> results = new List<Comic>();
        int maxPage = 0;
        try
        {
            var response = await _client.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();
            var document = await _context.OpenAsync(req => req.Content(content));
            var nodes = document.QuerySelectorAll(".readed.d-flex.short");
            foreach (var node in nodes)
            {
                string id = GetIdFromUrl(node.FirstElementChild.Attributes["href"].Value);

                // string fullId = node.LastElementChild.FirstElementChild.FirstElementChild.Attributes
                string img = "https://batcave.biz" + node.FirstElementChild.FirstElementChild.Attributes["data-src"].Value;
                var comicInfoNode = node.Children[1];
                string name = comicInfoNode.Children[0].TextContent;
                string publisher = comicInfoNode.Children[1].FirstElementChild.TextContent;
                string year = comicInfoNode.Children[1].LastElementChild.TextContent;
                string description = comicInfoNode.Children[2].FirstElementChild.TextContent;

                results.Add(new Comic() { Name = name, CoverImg = img, ComicId = id, Description = description, Publisher = publisher, Year = year });
            }

            var paginationDiv = document.QuerySelector(".pagination__pages.d-flex.jc-center");

            maxPage = int.TryParse(paginationDiv?.LastElementChild?.TextContent, out int lastPage) ? lastPage : 1;



        }
        catch (Exception e)
        {

        }

        var searchResults = new SearchResultDto() { Comics = results, MaxPage = maxPage, CurrentPage = pageNumber };
        return searchResults;

    }

    public static async Task<Comic> GetComicById(string id, string cookie)
    {
        _client.DefaultRequestHeaders.Add("Cookie", cookie);
        string url = $"https://batcave.biz/{id}.html#chapters";
        var response = await _client.GetAsync(url);
        var content = await response.Content.ReadAsStringAsync();
        var document = await _context.OpenAsync(req => req.Content(content));

        string name = document.QuerySelector("h1.flex-grow-1").TextContent;

        string img = "https://batcave.biz" + document.QuerySelector(".page__poster > img").Attributes["src"].Value;

        string year = document.QuerySelector(".page__list > li:nth-child(1) > a:nth-child(2)").TextContent;

        string publisher = document.QuerySelector(".page__list > li:nth-child(2)").TextContent.Replace("Publisher:", "");

        string status = document.QuerySelector(".page__list > li:nth-child(3)").TextContent.Replace("Release type:", "");


        string description = document.QuerySelector(".page__text.full-text.clearfix").TextContent;

        string comicIdPattern = @"\""news_id\"":(\d+)";
        Match comicIdMatch = Regex.Match(content, comicIdPattern);
        string comicId = comicIdMatch.Value.Replace("\"news_id\":", "");


        var issueNodes = document.QuerySelectorAll(".cl__item-title");
        string chaptersPattern = @"\""chapters\""\s*:\s*(\[[^\]]*\])";

        Match chaptersArrayMatch = Regex.Match(content, chaptersPattern);
        string chaptersArray = chaptersArrayMatch.Value.Replace("\"chapters\":", "");

        List<Chapter> chapters = JsonConvert.DeserializeObject<List<Chapter>>(chaptersArray);

        Comic comic = new Comic() { ComicId = comicId, Name = name, CoverImg = img, Publisher = publisher, Year = year, Chapters = chapters, Description = description, Status = status };

        return comic;

    }

    private static string GetIdFromUrl(string url)
    {
        string newString = url.Replace("https://batcave.biz/", "");
        return newString.Replace(".html", "");
    }
}


public class Chapter
{
    public int Pages { get; set; }
    public int Id { get; set; }
    public string Title { get; set; }
    public string Date { get; set; }
}

