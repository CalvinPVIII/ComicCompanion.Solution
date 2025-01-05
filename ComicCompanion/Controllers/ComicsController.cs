using Microsoft.AspNetCore.Mvc;
using ComicCompanion.Models;


namespace ComicCompanion.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ComicsController : Controller
{

    private readonly IConfiguration _configuration;

    public ComicsController(IConfiguration configuration) { _configuration = configuration; }

    [HttpGet("{comicId}")]
    public async Task<ActionResult<Comic>> GetComic(string comicId, int? serverNumber)
    {
        return Ok(await Comic.GetComicById(comicId, serverNumber, _configuration["CookieValue"]));
    }

    [HttpGet("search")]
    public async Task<ActionResult<List<Comic>>> Search(string keyword, int? serverNumber, int pageNumber = 1)
    {

        try
        {
            return Ok(await Comic.Search(keyword, serverNumber, pageNumber, _configuration["CookieValue"]));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [HttpGet("popular")]
    public async Task<ActionResult<Comic>> Popular(int? serverNumber, int pageNumber = 1)
    {

        var results = await Comic.Popular(pageNumber, serverNumber, _configuration["CookieValue"]);
        return Ok(new APIResponseDto("success", 200, results));
    }


}