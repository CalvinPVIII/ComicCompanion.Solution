using Microsoft.AspNetCore.Mvc;
using ComicCompanion.Models;


namespace ComicCompanion.Controllers;
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

    [HttpGet("popular")]
    public async Task<ActionResult<Comic>> Popular(int? serverNumber, int pageNumber = 1)
    {

        var results = await Comic.Popular(pageNumber, serverNumber);
        return Ok(new APIResponseDto("success", 200, results));
    }


}