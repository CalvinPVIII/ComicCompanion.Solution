namespace ComicCompanion.Models;

public interface IHelperAsync
{
    abstract static Task<Comic[]> Search(string keyword, int? pageNumber = 1);
    abstract static Task<string[]> GetPagesFromIssue(Issue issue);

}