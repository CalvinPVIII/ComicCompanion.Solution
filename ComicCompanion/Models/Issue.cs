using System.Text.Json.Serialization;

namespace ComicCompanion.Models;

public class Issue
{

    [JsonPropertyName("issueId")]
    public string IssueId { get; set; }

    [JsonPropertyName("comicId")]
    public string ComicId { get; set; }

    [JsonPropertyName("pages")]
    public string[]? Pages { get; set; }

    public async Task<string[]> GetPagesAsync(int? serverNumber)
    {
        // if (serverNumber == 2)
        // {
        //     Pages = await ReadComicOnlineHelper.GetPagesFromIssue(this);
        // }
        // else
        // {
        Pages = await XoxoComicHelper.GetPagesFromIssue(this);
        // if (Pages.Length == 0)
        // {
        //     Pages = await ReadComicOnlineHelper.GetPagesFromIssue(this);
        // }
        ;
        // }
        return Pages;
    }

}