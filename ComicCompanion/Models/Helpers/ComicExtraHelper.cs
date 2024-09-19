namespace ComicCompanion.Models;

using System.Text.RegularExpressions;
using AngleSharp;
using AngleSharp.Dom;
using AngleSharp.Io.Network;
using ComicCompanion.Interfaces;

public class ComicExtraHelper : ComicHelper, IComicHelper
{

    private static HttpClient _client = new HttpClient { Timeout = new TimeSpan(0, 0, 15) };

    private static HttpClientRequester _requester = new HttpClientRequester(_client);
    private static AngleSharp.IConfiguration _config = Configuration.Default.With(_requester).WithDefaultLoader();
    private static IBrowsingContext _context = BrowsingContext.New(_config);

    public static async Task<SearchResultDto> Search(string keyword, int pageNumber)
    {
        SearchResultDto results = await GetListOfComics("https://comixextra.com/search?", pageNumber, keyword);

        return results;
    }


    public static async Task<SearchResultDto> Popular(int pageNumber)
    {
        SearchResultDto results = await GetListOfComics("https://xoxocomic.com/hot-comic?", pageNumber, null);
        return results;
    }

    public static async Task<Comic> GetComicFromId(string comicId)
    {

        var doc = await _context.OpenAsync($"https://comixextra.com/comic/{comicId}");
        var comicInfoElement = doc.QuerySelector(".movie-l-img").FirstElementChild;
        string name = comicInfoElement.Attributes["alt"].Value;
        string img = comicInfoElement.Attributes["src"].Value;

        List<string> issues = new();



        var issueNodes = doc.QuerySelectorAll("#list tr");

        foreach (var node in issueNodes)
        {
            string issueLink = node.FirstElementChild.FirstElementChild.Attributes["href"].Value;

            string issue = issueLink.Replace($"https://comixextra.com/{comicId}/", "");
            if (issue.Contains("issue-"))
            {
                issue = issue.Replace("issue-", "");
            }
            issues.Add(issue);
        }

        return new Comic() { CoverImg = img, Name = name, ComicId = comicId, IssueIds = issues };
    }

    public static async Task<string[]> GetPagesFromIssue(Issue issue)
    {
        var url = $"https://comixextra.com/{issue.ComicId}/issue-{issue.IssueId}/full";
        var document = await _context.OpenAsync(url);
        string[] pages = document.QuerySelectorAll(".chapter-container img").Select(e => ValidateHTTPSImage(e.Attributes["src"].Value)).ToArray();

        return pages;

    }

    private static string GetIdFromUrl(string url)
    {
        return url.Replace("https://comixextra.com/comic/", "");
    }


    private static async Task<SearchResultDto> GetListOfComics(string url, int pageNumber, string? searchQuery)
    {
        if (searchQuery != null)
        {
            searchQuery = FormatSearchKeyword(searchQuery);
            url += $"keyword={searchQuery}&";
        }
        url += $"page={pageNumber}";
        List<Comic> results = new List<Comic>();
        int currentPage = 0;
        int maxPage = 0;
        try
        {

            var document = await _context.OpenAsync(url);
            var cells = document.QuerySelectorAll(".cartoon-box");

            foreach (var node in cells)
            {

                string id = GetIdFromUrl(node.FirstElementChild.Attributes["href"].Value);
                string img = node.FirstElementChild.FirstElementChild?.Attributes["src"].Value;
                string name = node.LastElementChild.FirstElementChild.TextContent;
                results.Add(new Comic() { Name = name, ComicId = id, CoverImg = img });
            }



            int placeHolder;
            var paginationDiv = document.QuerySelector(".general-nav:not([id])");
            foreach (var node in paginationDiv.ChildNodes)
            {
                if (int.TryParse(node.TextContent, out placeHolder))
                {
                    Console.WriteLine(node.TextContent);
                    maxPage++;
                }
                if (node.ToHtml().Contains("span"))
                {
                    currentPage = int.Parse(node.TextContent);
                }
            }



        }
        catch (Exception e)
        {

        }
        var searchResults = new SearchResultDto() { Comics = results, CurrentPage = currentPage, MaxPage = maxPage };
        return searchResults;
    }

    private static string ValidateHTTPSImage(string imgUrl)
    {
        if (imgUrl.Contains("https"))
        {
            return imgUrl;
        }
        else
        {
            return imgUrl.Replace("http", "https");
        }
    }

}

