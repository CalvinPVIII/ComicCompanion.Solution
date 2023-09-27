using Microsoft.AspNetCore.Mvc;

namespace ComicCompanion.Models;

[Route("api")]
[ApiController]
public class ReadingListController : Controller
{
    private readonly ComicCompanionContext _db;

    public ReadingListController(ComicCompanionContext db)
    {
        _db = db;
    }

    [HttpGet("ReadingLists")]
    public IActionResult Get()
    {
        var readingLists = _db.ReadingLists.Where(l => l.IsPrivate == false).ToArray();
        return Ok(readingLists);
    }


    [HttpPost("ReadingLists")]
    public IActionResult Create(ReadingList list)
    {
        _db.ReadingLists.Add(list);
        _db.SaveChanges();
        return Ok(list);
    }


    // [HttpPatch("ReadingLists/{id}")]
    // public IActionResult Update(ReadingList list)
    // {

    // }



}