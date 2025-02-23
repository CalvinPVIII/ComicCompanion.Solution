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
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    public async Task<Issue> GetPagesAsync(int? serverNumber, string cookie)
    {

        // Pages = await XoxoComicHelper.GetPagesFromIssue(this);
        // Pages = await ComicExtraHelper.GetPagesFromIssue(this);
        await BatcaveHelper.GetFullIssue(this, cookie);
        return this;
    }

}