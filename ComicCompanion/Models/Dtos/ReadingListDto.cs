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
    public int Rating { get; set; }
    public string CreatedBy { get; set; }

    public ReadingListDto(ReadingList list)
    {
        ReadingListId = list.ReadingListId;
        IsPrivate = list.IsPrivate;
        UserId = list.UserId;
        Name = list.Name;
        Description = list.Description;
        CreatedBy = list.User.UserName;
        Rating = list.Ratings.Where(r => r.Positive == true).Count() - list.Ratings.Where(r => r.Positive == false).Count();
    }

    public ReadingListDto(ReadingList list, bool deserialize) : this(list)
    {
        if (deserialize)
        {
            Issues = ReadingListHelper.DeserializeIssues(list.SerializedIssues);
        }
    }

}