namespace ComicCompanion.Models;

public class ReadingListRating
{
    public int ReadingListRatingId { get; set; }
    public int ReadingListId { get; set; }
    public string UserId { get; set; }
    public bool Positive { get; set; }
}