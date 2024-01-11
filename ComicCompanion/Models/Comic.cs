namespace ComicCompanion.Models;


public class Comic
{
    public string ComicId { get; set; }
    public string Name { get; set; }
    public string CoverImg { get; set; }
    public List<string>? IssueIds { get; set; }


    public async static Task<Comic> GetComicById(string comicId, int? serverNumber)
    {

        return await XoxoComicHelper.GetComicFromId(comicId);

    }

    public async static Task<SearchResultDto> Search(string keyword, int? serverNumber, int pageNumber)
    {


        // if (serverNumber == 1)
        // {
        //     return await ReadComicOnlineHelper.Search(keyword);
        // }
        // else
        // {
        return await XoxoComicHelper.Search(keyword, pageNumber);
        // }
    }

    public async static Task<SearchResultDto> Popular(int pageNumber, int? serverNumber)
    {
        int server;
        if (serverNumber == null || serverNumber == 0)
        {
            server = 1;
        }
        else
        {
            server = (int)serverNumber;
        }
        return await XoxoComicHelper.Popular(pageNumber);
    }
}