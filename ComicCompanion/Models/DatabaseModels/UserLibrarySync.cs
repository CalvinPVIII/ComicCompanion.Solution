namespace ComicCompanion.Models;

public class UserLibrarySync
{
    public string UserId { get; set; }
    public int UserLibrarySyncId { get; set; }
    public string ComicLibrary { get; set; }
    public string ReadingListLibrary { get; set; }
    public DateTime LastSynced { get; set; }

}