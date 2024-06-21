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
        string[] patchNotes = { "Add behavior to handle when back button is pressed on mobile devices", "Adjust look of confirm reading list modal" };
        return Ok(new APIResponseDto("success", 200, new { version = "Beta 1.4", downloadLink = "https://github.com/CalvinPVIII/ComicCompanion.Solution/releases/download/1.4-beta/comiccompanionv1.4-beta.apk", patchNotes }));
    }





}