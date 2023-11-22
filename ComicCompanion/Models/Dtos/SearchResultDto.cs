namespace ComicCompanion.Models;

public class SearchResultDto
{
    public List<Comic> Comics { get; set; }
    public int CurrentPage { get; set; }
    public int MaxPage { get; set; }
}