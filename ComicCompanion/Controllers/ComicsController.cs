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
    public async Task<ActionResult<List<Comic>>> Search(string keyword, int? serverNumber, int pageNumber = 1)
    {

        try
        {
            return Ok(await Comic.Search(keyword, serverNumber, pageNumber));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    // add pagination
    [HttpGet("popular")]
    public async Task<ActionResult<Comic>> Popular(int? serverNumber)
    {

        var results = await Comic.Popular(serverNumber);
        return Ok(new APIResponseDto("success", 200, results));
    }


}