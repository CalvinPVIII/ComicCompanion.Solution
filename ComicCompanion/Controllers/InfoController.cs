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
        string[] patchNotes = { "Implemented caching to reduce overall loading times", "Fix issue with images not loading on mobile app" };
        return Ok(new APIResponseDto("success", 200, new { version = "Beta 1.5", downloadLink = "https://github.com/CalvinPVIII/ComicCompanion.Solution/releases/download/1.5-beta/comiccompanionv1.5-beta.apk", patchNotes }));
    }





}