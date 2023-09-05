namespace ComicCompanion.Models;

public interface IHelperAsync
{
    abstract static Task<List<Comic>> Search(string keyword, int? pageNumber = 1);
    abstract static Task<string[]> GetPagesFromIssue(Issue issue);

}