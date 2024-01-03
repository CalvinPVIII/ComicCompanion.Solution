namespace ComicCompanion.Models;

public class ReadingListDto
{


    public int ReadingListId { get; set; }
    public Issue[]? Issues { get; set; }
    public bool IsPrivate { get; set; }
    public string UserId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string CoverImg { get; set; }
    public int Rating { get; set; } // will need to query the database for ReadingListRatings, count how many of the Positive properties are true vs false
    public string CreatedBy { get; set; }

    public ReadingListDto(ReadingList list)
    {
        ReadingListId = list.ReadingListId;
        IsPrivate = list.IsPrivate;
        UserId = list.UserId;
        Name = list.Name;
        Description = list.Description;
        CreatedBy = list.User.UserName;
    }

    public ReadingListDto(ReadingList list, bool deserialize) : this(list)
    {
        if (deserialize)
        {
            Issues = ReadingListHelper.DeserializeIssues(list.SerializedIssues);
        }
    }

}