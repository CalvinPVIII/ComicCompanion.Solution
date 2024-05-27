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
        string[] patchNotes = { "Adjust displaying widescreen images on vertical viewports", "Fix issue with bulk issue select always triggering when scrolling issues" };
        return Ok(new APIResponseDto("success", 200, new { version = "Beta 1.2", downloadLink = "https://github.com/CalvinPVIII/ComicCompanion.Solution/releases/download/1.2-beta/comiccompanionv1.2-beta.apk", patchNotes }));
    }





}