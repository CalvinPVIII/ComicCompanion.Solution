namespace ComicCompanion.Models;

public class UserReadingListFavorite
{
    public int UserReadingListFavoriteId { get; set; }
    public ApplicationUser User { get; set; }
    public string UserId { get; set; }
    public ReadingList ReadingList { get; set; }
    public int ReadingListId { get; set; }

}