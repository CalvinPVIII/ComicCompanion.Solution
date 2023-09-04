namespace ComicCompanion.Models;

public class PlaywrightHelper
{
    public static string InstallPlayWright()
    {
        var exitCode = Microsoft.Playwright.Program.Main(new[] { "install" });
        if (exitCode != 0)
        {
            throw new Exception($"Playwright exited with code {exitCode}");
        }
        return "success";
    }
}