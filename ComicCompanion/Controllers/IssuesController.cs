using Microsoft.AspNetCore.Mvc;

namespace ComicCompanion.Models;
[Route("api/")]
[ApiController]
public class IssuesController : Controller
{

    // [HttpGet("/comics/{comicId}/issues")]
    // public async Task<ActionResult<Comic>> Get(string comicId)
    // {

    // }


    [HttpGet("comics/{comicId}/issues/{issueId}")]
    public async Task<ActionResult<Issue>> GetIssue(string comicId, string issueId, int? serverNumber)
    {
        Issue issue = new Issue() { IssueId = issueId, ComicId = comicId };
        await issue.GetPagesAsync(serverNumber);
        return Ok(issue);
    }

}