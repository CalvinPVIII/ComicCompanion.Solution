using Microsoft.AspNetCore.Mvc;
using ComicCompanion.Models;


namespace ComicCompanion.Controllers;
[Route("api/[controller]")]
[ApiController]
public class InfoController : Controller
{

    [HttpGet()]
    public ActionResult Get()
    {
        string[] patchNotes = { "Adjust displaying widescreen images on vertical viewports", "Fix issue with bulk issue select always triggering when scrolling issues", "Adjust case sensitivity when searching for reading lists", "add option to bulk add selected issues to a reading list", };
        return Ok(new APIResponseDto("success", 200, new { version = "Beta 1.3", downloadLink = "https://github.com/CalvinPVIII/ComicCompanion.Solution/releases/download/1.3-beta/comiccompanionv1.3-beta.apk", patchNotes }));
    }





}