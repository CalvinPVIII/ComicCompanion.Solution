using Microsoft.AspNetCore.Mvc;
using ComicCompanion.Services;


namespace ComicCompanion.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ImgProxyController : Controller
{

    private readonly IConfiguration _configuration;

    public ImgProxyController(IConfiguration configuration) { _configuration = configuration; }

    [HttpGet()]
    public async Task<ActionResult> Get(string imgUrl)
    {
        byte[] img = await ImgProxyService.LoadImg(imgUrl, _configuration["CookieValue"]);
        return File(img, "image/png");
    }






}