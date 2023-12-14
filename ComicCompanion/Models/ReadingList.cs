namespace ComicCompanion.Models;

public class ReadingList
{
    public int ReadingListId { get; set; }
    // THIS NEEDS TO BE SERIALIZED
    public string SerializedIssues { get; set; }
    public bool IsPrivate { get; set; }
    public string UserId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Rating { get; set; }
}