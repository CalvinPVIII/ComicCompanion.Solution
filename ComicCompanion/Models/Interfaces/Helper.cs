namespace ComicCompanion.Models;

public interface IHelper
{
    abstract static List<Comic> Search(string keyword, int? pageNumber = 1);
    abstract static string[] GetPagesFromIssue(Issue issue);
    abstract static Comic GetComicFromId(string comicId);
}