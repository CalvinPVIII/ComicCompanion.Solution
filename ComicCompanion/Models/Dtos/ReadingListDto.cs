namespace ComicCompanion.Models;

public class ReadingListDto
{


    public int ReadingListId { get; set; }

    public Issue[] Issues { get; set; }
    public bool IsPrivate { get; set; }
    public string UserId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Rating { get; set; }

}