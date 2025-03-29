namespace ComicCompanion.Models;
public class Chapter
{
    public int Pages { get; set; }
    public string Id { get; set; }
    public string Title { get; set; }
    public string Date { get; set; }
    public string ComicId { get; set; }
    public string ComicName { get; set; }
    public string[]? Images { get; set; }

    public static async Task<Chapter> GetFullChapter(string comicId, string issueId, string cookie)
    {
        return await BatcaveHelper.GetFullChapter(comicId, issueId, cookie);
    }
}

