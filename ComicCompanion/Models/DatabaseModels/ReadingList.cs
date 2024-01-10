using System.ComponentModel.DataAnnotations.Schema;

namespace ComicCompanion.Models;

public class ReadingList
{
    public int ReadingListId { get; set; }
    public string UserId { get; set; }
    [ForeignKey("UserId")]
    public virtual ApplicationUser? User { get; set; }
    public string SerializedIssues { get; set; }
    public bool IsPrivate { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string CoverImg { get; set; }
    public virtual ICollection<ReadingListRating>? Ratings { get; set; }

}