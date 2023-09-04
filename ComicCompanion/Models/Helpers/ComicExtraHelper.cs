using HtmlAgilityPack;
using AngleSharp;

namespace ComicCompanion.Models;

public class ComicExtraHelper : ComicHelper
{

    private static AngleSharp.IConfiguration _config = Configuration.Default.WithDefaultLoader();
    private static IBrowsingContext _context = BrowsingContext.New(_config);

    public async static Task<Comic[]> Search(string keyword, int? pageNumber = 1)
    {

        keyword = FormatSearchKeyword(keyword);
        List<Comic> results = new List<Comic>();
        try
        {
            var document = await _context.OpenAsync($"https://comicextra.net/comic-search?key={keyword}&page={pageNumber}");
            var cells = document.QuerySelectorAll(".cartoon-box");
            foreach (var node in cells)
            {
                var img = node.FirstElementChild.FirstElementChild.Attributes["src"].Value;
                var id = GetIdFromUrl(node.FirstElementChild.Attributes["href"].Value);
                var name = node.LastElementChild.FirstElementChild.TextContent;
                results.Add(new Comic() { Name = name, ComicId = id, CoverImg = img });

            }

        }
        catch (Exception)
        {
            // do nothing
        }
        return results.ToArray();

    }

    public async static Task<string[]> GetPagesFromIssue(Issue issue)
    {
        var document = await _context.OpenAsync($"https://comicextra.net/comic/{issue.ComicId}/issue-{issue.IssueId}/full");
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
        var doc = await _context.OpenAsync($"https://comicextra.net/comic/{comicId}");
        var img = doc.QuerySelector("body > main > div > div > div > div.col-lg-8 > div:nth-child(1) > div.movie-info > div.block-movie-info.movie-info-box > div > div.col-5.movie-image > div > img").Attributes["src"].Value;
        var name = doc.QuerySelector("body > main > div > div > div > div.col-lg-8 > div:nth-child(1) > div.movie-info > div.block-movie-info.movie-info-box > div > h1 > span").TextContent;
        return new Comic() { CoverImg = img, ComicId = comicId, Name = name };
    }


    private static string GetIdFromUrl(string url)
    {
        return url.Replace("https://comicextra.net/comic/", "");
    }
}
