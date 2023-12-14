namespace ComicCompanion.Models;

public class ReadingListDto
{


    public int ReadingListId { get; set; }
    public Issue[]? Issues { get; set; }
    public bool IsPrivate { get; set; }
    public string UserId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Rating { get; set; }

    public ReadingListDto(ReadingList list)
    {
        ReadingListId = list.ReadingListId;
        IsPrivate = list.IsPrivate;
        UserId = list.UserId;
        Name = list.Name;
        Description = list.Description;
        Rating = list.Rating;
    }

    public ReadingListDto(ReadingList list, bool deserialize)
    {
        ReadingListId = list.ReadingListId;
        IsPrivate = list.IsPrivate;
        UserId = list.UserId;
        Name = list.Name;
        Description = list.Description;
        Rating = list.Rating;
        if (deserialize)
        {
            Issues = ReadingListHelper.DeserializeIssues(list.SerializedIssues);
        }
    }

}