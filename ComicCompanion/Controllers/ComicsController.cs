using Microsoft.AspNetCore.Mvc;

namespace ComicCompanion.Models;
[Route("api/[controller]")]
[ApiController]
public class ComicsController : Controller
{
    [HttpGet("{comicId}")]
    public async Task<ActionResult<Comic>> GetComic(string comicId, int? serverNumber)
    {
        return Ok(await Comic.GetComicById(comicId, serverNumber));
    }

    [HttpGet("search")]
    public async Task<ActionResult<List<Comic>>> Search(string keyword, int? serverNumber, int? pageNumber = 1)
    {
        return Ok(await Comic.Search(keyword, serverNumber, pageNumber));
    }

}