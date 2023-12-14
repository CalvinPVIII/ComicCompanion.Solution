using System.Text.Json;

namespace ComicCompanion.Models;

public class ReadingListHelper
{
    public static Issue[] DeserializeIssues(string serializedIssues)
    {
        var issues = JsonSerializer.Deserialize<Issue[]>(serializedIssues);
        return issues;
    }
}