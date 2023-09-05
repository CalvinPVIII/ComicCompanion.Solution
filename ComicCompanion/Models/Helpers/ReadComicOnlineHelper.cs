using System.Text.RegularExpressions;
using AngleSharp;


using Microsoft.Playwright;

namespace ComicCompanion.Models;

public class ReadComicOnlineHelper : ComicHelper, IHelperAsync
{

    private static AngleSharp.IConfiguration _config = Configuration.Default.WithDefaultLoader();
    private static IBrowsingContext _context = BrowsingContext.New(_config);

    public static async Task<string[]> GetPagesFromIssue(Issue issue)
    {

        var playwright = await Playwright.CreateAsync();

        var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
        {
            SlowMo = 100
        });
        string url;
        int number;
        if(Int32.TryParse(issue.IssueId, out number))
        {
            url = $"https://readcomiconline.li/Comic/{issue.ComicId}/issue-{issue.IssueId}?readType=1";
        }
        else
        {
            url = $"https://readcomiconline.li/Comic/{issue.ComicId}/{issue.IssueId}?readType=1";
        } 
        var page = await browser.NewPageAsync();
        try
        {
            await page.GotoAsync(url);
            var pages = await page.EvaluateAsync<string[]>(@"()=>
            {
                const pages = []
                document.querySelectorAll('#divImage p img').forEach((node)=>{
                    pages.push(node.src)
                })
                return pages;
            }
            ");

             return pages;
        }
        catch(Exception)
        {
            return new string[]{};
        }
       
    }

    public async static Task<List<Comic>> Search(string keyword, int? pageNumber = 1)
    {

        keyword = FormatSearchKeyword(keyword);
        List<Comic> results = new List<Comic>();
        try
        {
            var document = await _context.OpenAsync($"https://readcomiconline.li/Search/Comic?keyword={keyword}");
            var cells = document.QuerySelectorAll(".col.cover");
            foreach (var node in cells)
            {
                var img = "https://readcomiconline.li/" + node.FirstElementChild.FirstElementChild.Attributes["src"].Value;
                var id = GetIdFromUrl(node.FirstElementChild.Attributes["href"].Value);
                var name = node.FirstElementChild.FirstElementChild.Attributes["title"].Value;
                results.Add(new Comic() { Name = name, ComicId = id, CoverImg = img });

            }
        }
        catch (Exception)
        {

            // do nothing
        }
        return results;
    }

    public async static Task<Comic> GetComicFromId(string comicId)
    {
        var doc = await _context.OpenAsync($"https://readcomiconline.li/Comic/{comicId}");
        var img = "https://readcomiconline.li/" + doc.QuerySelector(".col.cover").FirstElementChild.Attributes["src"].Value;
        var name = doc.QuerySelector(".col.cover").FirstElementChild.Attributes["title"].Value;
        var issueNodes = doc.QuerySelectorAll("li > div > a");
        List<string> issueIds = new List<string>();
        foreach (var node in issueNodes)
        {

            issueIds.Add(GetIssueIdFromHref(node.Attributes["href"].Value));
        }
        return new Comic() { CoverImg = img, ComicId = comicId, Name = name, IssueIds = issueIds };
    }


    private static string GetIdFromUrl(string url)
    {
        return url.Replace("/Comic/", "");
    }
    private static string GetIssueIdFromHref(string href)
    {

        string pattern = @"/([^/]+)\?id";
        Match match = Regex.Match(href, pattern);

        if (match.Success)
        {
            return match.Groups[1].Value.Replace("Issue-", "");
        }
        else
        {
            return href;
        }
    }

}


