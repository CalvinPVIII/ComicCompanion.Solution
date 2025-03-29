using Microsoft.AspNetCore.Mvc;
using ComicCompanion.Models;


namespace ComicCompanion.Controllers;
[Route("api/")]
[ApiController]
public class IssuesController : Controller
{
    private readonly IConfiguration _configuration;

    // [HttpGet("/comics/{comicId}/issues")]
    // public async Task<ActionResult<Comic>> Get(string comicId)
    // {

    // }

    public IssuesController(IConfiguration configuration) { _configuration = configuration; }


    [HttpGet("comics/{comicId}/issues/{issueId}")]
    public async Task<ActionResult<Chapter>> GetIssue(string comicId, string issueId, int? serverNumber)
    {
        
        var chapter = await Chapter.GetFullChapter(comicId, issueId, _configuration["CookieValue"]);
        return Ok(chapter);
    }

}