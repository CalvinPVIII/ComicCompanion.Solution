namespace ComicCompanion.Models;


public class Comic
{
    public string ComicId { get; set; }
    public string Name { get; set; }
    public string CoverImg { get; set; }
    public string? Author { get; set; }
    public string? Description { get; set; }
    public string? Year { get; set; }
    public string? Status { get; set; }
    public List<string>? IssueIds { get; set; }


    public async static Task<Comic> GetComicById(string comicId, int? serverNumber)
    {

        // return await ComicExtraHelper.GetComicFromId(comicId);

        return await XoxoComicHelper.GetComicFromId(comicId);

    }

    public async static Task<SearchResultDto> Search(string keyword, int? serverNumber, int pageNumber)
    {


        // if (serverNumber == 1)
        // {
        // return await ComicExtraHelper.Search(keyword, pageNumber);
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
        // return await ComicExtraHelper.Popular(pageNumber);

    }
}