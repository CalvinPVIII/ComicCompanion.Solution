namespace ComicCompanion.Models;

using System.Text.RegularExpressions;
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

    public static async Task<SearchResultDto> Search(string keyword, int pageNumber)
    {
        SearchResultDto results = await GetListOfComics("https://xoxocomic.com/search-comic?", pageNumber, keyword);

        return results;
    }


    public static async Task<SearchResultDto> Popular(int pageNumber)
    {
        SearchResultDto results = await GetListOfComics("https://xoxocomic.com/hot-comic?", pageNumber, null);
        return results;
    }

    public static async Task<Comic> GetComicFromId(string comicId)
    {
        var doc = await _context.OpenAsync($"https://xoxocomic.com/comic/{comicId}?page=1");
        string name = doc.QuerySelector(".col-xs-4.col-image").FirstElementChild.Attributes["alt"].Value;
        string img = doc.QuerySelector(".col-xs-4.col-image").FirstElementChild.Attributes["src"].Value;
        string author = doc.QuerySelector(".author .col-xs-8").TextContent.Trim();
        string year = doc.QuerySelector(".list-info > li:nth-child(3) > p:nth-child(2)").TextContent.Trim();
        string status = doc.QuerySelector(".status .col-xs-8").TextContent.Trim();
        string description = doc.QuerySelector(".detail-content p").TextContent.Trim();


        List<string> issues = new();

        bool isNextPage = true;
        while (isNextPage)
        {

            var issueNodes = doc.QuerySelectorAll(".col-xs-9.chapter");

            foreach (var node in issueNodes)
            {
                string issueLink = node.FirstElementChild.Attributes["href"].Value;

                string issue = issueLink.Replace($"https://xoxocomic.com/comic/{comicId}/", "");
                if (issue.Contains("issue-"))
                {
                    issue = issue.Replace("issue-", "");
                }
                issues.Add(issue);
            }
            var paginationElements = doc.QuerySelectorAll("ul.pagination > li");
            if (paginationElements.Length > 0)
            {
                var lastPaginationElement = paginationElements[paginationElements.Length - 1].FirstElementChild.Attributes["href"];
                if (lastPaginationElement == null)
                {
                    isNextPage = false;
                }
                else
                {
                    doc = await _context.OpenAsync($"https://xoxocomic.com/comic/{lastPaginationElement.Value}");
                }
            }
            else
            {
                isNextPage = false;
            }

        }
        return new Comic() { CoverImg = img, Name = name, ComicId = comicId, IssueIds = issues, Author = author, Year = year, Status = status, Description = description };
    }

    public static async Task<string[]> GetPagesFromIssue(Issue issue)
    {
        var url = $"https://xoxocomic.com/comic/{issue.ComicId}/";
        if (Regex.IsMatch(issue.IssueId, @"^\d+$"))
        {
            url += $"issue-{issue.IssueId}/all";
        }
        else
        {
            url += $"{issue.IssueId}/all";
        }
        var document = await _context.OpenAsync(url);

        string[] pages = document.QuerySelectorAll("img.lazy").Select(e => ValidateHTTPSImage(e.Attributes["data-original"].Value)).ToArray();
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
            url += $"keyword={searchQuery}&";
        }
        url += $"page={pageNumber}";
        List<Comic> results = new List<Comic>();
        int pageNumbers = 0;
        try
        {

            var document = await _context.OpenAsync(url);
            var cells = document.QuerySelectorAll(".row > .item");

            foreach (var node in cells)
            {
                if (node.FirstElementChild.ClassList.Length != 0)
                {
                    string name = node.FirstElementChild.FirstElementChild.FirstElementChild.Attributes["title"].Value[..^5]; // range operator removes the "Comic" at the end of every result
                    string id = GetIdFromUrl(node.FirstElementChild.FirstElementChild.FirstElementChild.Attributes["href"].Value);
                    string img = node.FirstElementChild.FirstElementChild.FirstElementChild.FirstElementChild.Attributes["data-original"].Value;
                    results.Add(new Comic() { Name = name, ComicId = id, CoverImg = img });
                }
                else
                {
                    string name = node.FirstElementChild.Attributes["title"].Value[..^5];
                    string id = GetIdFromUrl(node.FirstElementChild.Attributes["href"].Value);
                    string img = node.FirstElementChild.FirstElementChild.Attributes["data-src"].Value;
                    results.Add(new Comic() { Name = name, ComicId = id, CoverImg = img });
                }
            }

            int paginationElementNumber = document.QuerySelectorAll("ul.pagination").Length - 1;
            var paginationElement = document.QuerySelectorAll("ul.pagination")[paginationElementNumber];

            pageNumbers = int.Parse(paginationElement.Children[paginationElement.Children.Length - 2].TextContent);

        }
        catch (Exception e)
        {

        }
        var searchResults = new SearchResultDto() { Comics = results, CurrentPage = (int)pageNumber, MaxPage = pageNumbers };
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