using Microsoft.Playwright;

namespace ComicCompanion.Models;

public class ReadComicOnlineHelper : ComicHelper, IHelperAsync
{
    public static async Task<string[]> GetPagesFromIssue(Issue issue)
    {

        var playwright = await Playwright.CreateAsync();

        var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
        {
            SlowMo = 100
        });
        var page = await browser.NewPageAsync();
        await page.GotoAsync($"https://readcomiconline.li/Comic/{issue.ComicId}/issue-{issue.IssueId}?readType=1");
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

    public async static Task<Comic[]> Search(string keyword, int? pageNumber = 1)
    {
        keyword = FormatSearchKeyword(keyword);
        var playwright = await Playwright.CreateAsync();

        var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
        {
            SlowMo = 100
        });
        var page = await browser.NewPageAsync();
        await page.GotoAsync($"https://readcomiconline.li/Search/Comic?keyword={keyword}");

        var searchResults = await page.EvaluateAsync<object[]>(@"()=>
        {
            const comics = []
            document.querySelectorAll('.item').forEach((node)=>{
                const comicId = node.firstChild.nextSibling.href.replace('https://readcomiconline.li/Comic/', '')
                const title = node.title.match(/>(.*?)</gm)
                comics.push({Name: title, ComicId: comicId})
            })
            return comics;
        }");
        Comic[] comics = Array.ConvertAll(searchResults, x => x as Comic);
        return comics;
    }


}


