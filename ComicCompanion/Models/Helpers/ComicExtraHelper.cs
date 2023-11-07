using System.Text.RegularExpressions;
using AngleSharp;
using AngleSharp.Io.Network;
namespace ComicCompanion.Models;

public class ComicExtraHelper : ComicHelper, IHelperAsync
{

    private static HttpClient _client = new HttpClient { Timeout = new TimeSpan(0, 0, 5) };

    private static HttpClientRequester _requester = new HttpClientRequester(_client);
    private static AngleSharp.IConfiguration _config = Configuration.Default.With(_requester).WithDefaultLoader();
    private static IBrowsingContext _context = BrowsingContext.New(_config);

    public async static Task<List<Comic>> Search(string keyword, int? pageNumber)
    {

        if (pageNumber == 0 || pageNumber == null)
        {
            pageNumber = 1;
        }
        keyword = FormatSearchKeyword(keyword);
        List<Comic> results = new List<Comic>();
        try
        {
            var document = await _context.OpenAsync($"https://comicextra.me/comic-search?key={keyword}&page={pageNumber}");
            var cells = document.QuerySelectorAll(".cartoon-box");
            foreach (var node in cells)
            {
                var img = node.FirstElementChild.FirstElementChild.Attributes["src"].Value;
                var id = GetIdFromUrl(node.FirstElementChild.Attributes["href"].Value);
                var name = node.LastElementChild.FirstElementChild.TextContent;
                results.Add(new Comic() { Name = name, ComicId = id, CoverImg = img });

            }

        }
        catch (Exception e)
        {

        }
        return results;

    }

    public async static Task<string[]> GetPagesFromIssue(Issue issue)
    {
        var document = await _context.OpenAsync($"https://comicextra.me/{issue.ComicId}/issue-{issue.IssueId}/full");
        List<string> pages = new List<string>();
        try
        {
            pages = document.QuerySelectorAll(".chapter_img").Select(e => e.Attributes["src"].Value).ToList();
            ;
        }
        catch (Exception)
        {
            // do nothing;
        }
        return pages.ToArray();

    }

    public async static Task<Comic> GetComicFromId(string comicId)
    {
        var doc = await _context.OpenAsync($"https://comicextra.me/comic/{comicId}");
        var img = doc.QuerySelector("body > main > div > div > div > div.col-lg-8 > div:nth-child(1) > div.movie-info > div.block-movie-info.movie-info-box > div > div.col-5.movie-image > div > img").Attributes["src"].Value;
        var name = doc.QuerySelector("body > main > div > div > div > div.col-lg-8 > div:nth-child(1) > div.movie-info > div.block-movie-info.movie-info-box > div > h1 > span").TextContent;
        var issueNodes = doc.QuerySelectorAll("#list > tr> td:nth-child(1) > a");
        List<string> issueIds = new List<string>();
        foreach (var node in issueNodes)
        {

            issueIds.Add(GetIssueIdFromHref(node.Attributes["href"].Value));
        }
        return new Comic() { CoverImg = img, ComicId = comicId, Name = name, IssueIds = issueIds };
    }

    // public static List<string> GetComicIssueIds(string comicId)
    // {

    // }


    private static string GetIdFromUrl(string url)
    {
        return url.Replace("https://comicextra.me/comic/", "");
    }

    private static string GetIssueIdFromHref(string href)
    {

        string pattern = @"issue-(.+)";
        Match match = Regex.Match(href, pattern);

        if (match.Success)
        {
            return match.Groups[1].Value;
        }
        else
        {
            return href;
        }
    }
}
