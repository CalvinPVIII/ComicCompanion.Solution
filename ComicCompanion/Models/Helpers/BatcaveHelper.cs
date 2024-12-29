using AngleSharp;
using AngleSharp.Io.Network;
using ComicCompanion.Interfaces;
using ComicCompanion.Models;
using Microsoft.Extensions.Configuration;
public class BatcaveHelper : ComicHelper
// IComicHelper
{

    private static readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;

    private static HttpClient _client = new HttpClient { Timeout = new TimeSpan(0, 0, 15) };


    private static HttpClientRequester _requester = new HttpClientRequester(_client);
    private static AngleSharp.IConfiguration _config = Configuration.Default.With(_requester).WithDefaultLoader().WithCookies();
    private static IBrowsingContext _context = BrowsingContext.New(_config);

    public static async Task<SearchResultDto> Search(string keyword, int pageNumber, string cookie)
    {
        _client.DefaultRequestHeaders.Add("Cookie", cookie);
        string url = $"https://batcave.biz/search/{keyword}";

        SearchResultDto results = await GetListOfComics(url, pageNumber);
        return results;
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
            Console.WriteLine("stop");
            foreach (var node in nodes)
            {
                string id = GetIdFromUrl(node.FirstElementChild.Attributes["href"].Value);


                string name = node.FirstElementChild.FirstElementChild.Attributes["alt"].Value;
                string img = $"https://batcave.biz/posts/poster/ec/{id}.jpg";


                results.Add(new Comic() { Name = name, CoverImg = img, ComicId = id });
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

    private static string GetIdFromUrl(string url)
    {
        string newString = url.Replace("https://batcave.biz/", "");
        return newString.Replace(".html", "");
    }
}

