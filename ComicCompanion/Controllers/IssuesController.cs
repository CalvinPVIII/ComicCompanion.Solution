using Microsoft.AspNetCore.Mvc;

namespace ComicCompanion.Models;
[Route("api")]
[ApiController]
public class IssuesController : Controller
{
    [HttpGet("/comics/{comicId}/issue/{issueId}")]
    public async Task<ActionResult<Issue>> GetIssue(string comicId, string issueId, int? serverNumber)
    {
        Issue issue = new Issue() { IssueId = issueId, ComicId = comicId };
        if (serverNumber != 0)
        {
            await issue.GetPagesAsync(serverNumber);
        }
        else
        {
            await issue.GetPagesAsync(0);
        }
        return Ok(issue);
    }

}