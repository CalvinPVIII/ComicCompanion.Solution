namespace ComicCompanion.Models;

using AngleSharp;
using AngleSharp.Dom;
using AngleSharp.Io.Network;
using ComicCompanion.Interfaces;

public class XoxoComicHelper : ComicHelper, IComicHelper
{

    private static HttpClient _client = new HttpClient { Timeout = new TimeSpan(0, 0, 15) };

    private static HttpClientRequester _requester = new HttpClientRequester(_client);
    private static AngleSharp.IConfiguration _config = Configuration.Default.With(_requester).WithDefaultLoader();
    private static IBrowsingContext _context = BrowsingContext.New(_config);

    public static async Task<SearchResultDto> Search(string keyword, int pageNumber = 1)
    {
        SearchResultDto results = await GetListOfComics("https://xoxocomic.com/search-comic", pageNumber, keyword);

        return results;
    }


    public static async Task<SearchResultDto> Popular(int pageNumber = 1)
    {
        SearchResultDto results = await GetListOfComics("https://xoxocomic.com/hot-comic", pageNumber, null);
        return results;
    }

    public static async Task<Comic> GetComicFromId(string comicId)
    {
        var doc = await _context.OpenAsync($"https://xoxocomic.com/comic/{comicId}");
        string name = doc.QuerySelector(".col-xs-4.col-image").FirstElementChild.Attributes["alt"].Value;
        string img = doc.QuerySelector(".col-xs-4.col-image").FirstElementChild.Attributes["src"].Value;


        List<string> issues = new();
        var issueNodes = doc.QuerySelectorAll(".col-xs-9.chapter");

        foreach (var node in issueNodes)
        {
            string issueLink = node.FirstElementChild.Attributes["href"].Value;
            string issue = issueLink.Replace($"https://xoxocomic.com/comic/{comicId}/issue-", "");

            issues.Add(issue);
        }
        return new Comic() { CoverImg = img, Name = name, ComicId = comicId, IssueIds = issues };
    }

    public static async Task<string[]> GetPagesFromIssue(Issue issue)
    {
        var url = $"https://xoxocomic.com/comic/{issue.ComicId}/issue-${issue.IssueId}/all";
        var document = await _context.OpenAsync($"https://xoxocomic.com/comic/{issue.ComicId}/issue-{issue.IssueId}/all");

        string[] pages = document.QuerySelectorAll("img.lazy").Select(e => e.Attributes["data-original"].Value).ToArray();
        return pages;

    }

    private static string GetIdFromUrl(string url)
    {
        return url.Replace("https://xoxocomic.com/comic/", "");
    }


    private static async Task<SearchResultDto> GetListOfComics(string url, int pageNumber, string? searchQuery)
    {
        if (searchQuery != null)
        {
            searchQuery = FormatSearchKeyword(searchQuery);
            url += $"?keyword={searchQuery}&";
        }
        url += $"?page={pageNumber}";
        List<Comic> results = new List<Comic>();
        int pageNumbers = 0;
        try
        {

            var document = await _context.OpenAsync(url);
            var cells = document.QuerySelectorAll(".item");

            foreach (var node in cells)
            {
                if (node.FirstElementChild.ClassList.Length != 0)
                {

                    var name = node.FirstElementChild.FirstElementChild.FirstElementChild.Attributes["title"].Value;
                    var id = GetIdFromUrl(node.FirstElementChild.FirstElementChild.FirstElementChild.Attributes["href"].Value);
                    var img = node.FirstElementChild.FirstElementChild.FirstElementChild.FirstElementChild.Attributes["data-original"].Value;
                    results.Add(new Comic() { Name = name, ComicId = id, CoverImg = img });
                }
                else
                {
                    var name = node.FirstElementChild.Attributes["title"].Value;
                    var id = GetIdFromUrl(node.FirstElementChild.Attributes["href"].Value);
                    var img = node.FirstElementChild.FirstElementChild.Attributes["data-src"].Value;
                    results.Add(new Comic() { Name = name, ComicId = id, CoverImg = img });
                }
            }

            var paginationElement = document.QuerySelector("ul.pagination").FirstElementChild;
            pageNumbers = int.Parse(paginationElement.Children[paginationElement.Children.Length - 2].Text());

        }
        catch (Exception e)
        {

        }
        var searchResults = new SearchResultDto() { Comics = results, CurrentPage = (int)pageNumber, MaxPage = pageNumbers };
        return searchResults;
    }

}