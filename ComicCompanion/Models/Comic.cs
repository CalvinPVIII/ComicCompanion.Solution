namespace ComicCompanion.Models;


public class Comic
{
    public string ComicId { get; set; }
    public string Name { get; set; }
    public string CoverImg { get; set; }
    public List<string>? IssueIds { get; set; }


    public async static Task<Comic> GetComicById(string comicId, int? serverNumber)
    {
        if (serverNumber == 2)
        {
            return await ReadComicOnlineHelper.GetComicFromId(comicId);
        }
        else
        {
            return await ComicExtraHelper.GetComicFromId(comicId);
        }
    }

    public async static Task<List<Comic>> Search(string keyword, int? serverNumber, int? pageNumber = 1)
    {
        if (serverNumber == 2)
        {
            return await ReadComicOnlineHelper.Search(keyword);
        }
        else
        {
            return await ComicExtraHelper.Search(keyword, pageNumber);
        }
    }
}