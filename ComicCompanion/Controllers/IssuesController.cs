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
    public async Task<ActionResult<Issue>> GetIssue(string comicId, string issueId, int? serverNumber)
    {
        Issue issue = new Issue() { IssueId = issueId, ComicId = comicId };
        await issue.GetPagesAsync(serverNumber, _configuration["CookieValue"]);
        return Ok(issue);
    }

}