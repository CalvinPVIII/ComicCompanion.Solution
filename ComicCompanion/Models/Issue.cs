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

        Pages = await XoxoComicHelper.GetPagesFromIssue(this);
        // Pages = await ComicExtraHelper.GetPagesFromIssue(this);
        return Pages;
    }

}