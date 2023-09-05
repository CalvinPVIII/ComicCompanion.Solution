namespace ComicCompanion.Models;

public class Issue
{

    public string IssueId { get; set; }
    public string ComicId { get; set; }
    public string[] Pages { get; set; }

    public async Task<string[]> GetPagesAsync(int? serverNumber)
    {
        if (serverNumber == 2)
        {
            Pages = await ReadComicOnlineHelper.GetPagesFromIssue(this);
        }
        else
        {
            Pages = await ComicExtraHelper.GetPagesFromIssue(this);
            if (Pages.Length == 0)
            {
                Pages = await ReadComicOnlineHelper.GetPagesFromIssue(this);
            }
;
        }
        return Pages;
    }

}