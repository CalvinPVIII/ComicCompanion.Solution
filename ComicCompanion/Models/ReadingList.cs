namespace ComicCompanion.Models;

public class ReadingList
{
    public int ReadingListId;
    public Issue[] Issues;
    public bool IsPrivate;
    public string UserId;
}