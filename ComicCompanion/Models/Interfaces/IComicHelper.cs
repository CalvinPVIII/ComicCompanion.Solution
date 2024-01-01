using ComicCompanion.Models;
namespace ComicCompanion.Interfaces;

public interface IComicHelper
{
    static abstract Task<SearchResultDto> Search(string keyword, int? pageNumber);
    static abstract Task<string[]> GetPagesFromIssue(Issue issue);
    static abstract Task<Comic> GetComicFromId(string comicId);

}