using System.Text.Json;

namespace ComicCompanion.Models;

public class ReadingListHelper
{
    public static ReadingListIssue[] DeserializeIssues(string serializedIssues)
    {
        var issues = JsonSerializer.Deserialize<ReadingListIssue[]>(serializedIssues);
        return issues;
    }
}