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
    public IActionResult Get([FromQuery] int page = 0)
    {
        int skipBy = page * 10;
        var readingLists = _db.ReadingLists.Where(l => l.IsPrivate == false).Skip(skipBy).Take(10).ToList().Select(readingList => new ReadingListDto(readingList, true));
        return Ok(readingLists);
    }


    // need to check token or if reading list is private
    [HttpGet("ReadingList/{id}")]
    public IActionResult GetReadingList(int id)
    {
        var readingList = _db.ReadingLists.FirstOrDefault(list => list.ReadingListId == id);
        if (readingList != null)
        {
            return Ok(new ReadingListDto(readingList, true));
        }
        else
        {
            return NotFound();
        }
    }


    [HttpPost("ReadingLists")]
    public IActionResult Create(ReadingList list)
    {
        _db.ReadingLists.Add(list);
        _db.SaveChanges();
        return Ok(list);
    }


    [HttpPut("ReadingLists/{id}")]
    public IActionResult Update(ReadingList list)
    {
        _db.ReadingLists.Update(list);
        _db.SaveChanges();
        return Ok(list);

    }



}