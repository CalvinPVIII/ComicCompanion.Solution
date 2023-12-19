using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ComicCompanion.Models;

[Route("api")]
[ApiController]
public class ReadingListController : Controller
{
    private readonly ComicCompanionContext _db;
    private readonly UserManager<ApplicationUser> _userManager;


    public ReadingListController(ComicCompanionContext db, UserManager<ApplicationUser> userManager)
    {
        _db = db;
        _userManager = userManager;
    }

    [HttpGet("ReadingLists")]
    public IActionResult Get([FromQuery] int page = 0, [FromQuery] string? userId = null)
    {

        var readingListQuery = _db.ReadingLists.AsQueryable();

        string? requestingUserId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);

        // if you are searching for a specific users lists
        if (userId != null)
        {
            readingListQuery = readingListQuery.Where(l => l.UserId == userId);

            // if you are not searching for your own list

            if (requestingUserId != userId)
            {
                // return only the public lists
                readingListQuery = readingListQuery.Where(l => l.IsPrivate == false);
            }

        }
        else
        {
            readingListQuery = readingListQuery.Where(l => l.IsPrivate == false);
        }


        int skipBy = page * 10;
        var readingLists = readingListQuery.Include(list => list.User).Skip(skipBy).Take(10).ToList().Select(readingList => new ReadingListDto(readingList, true));
        return Ok(readingLists);
    }


    // need to check token or if reading list is private
    [HttpGet("ReadingList/{id}")]
    public IActionResult GetReadingList(int id)
    {
        var readingList = _db.ReadingLists.Include(list => list.User).FirstOrDefault(list => list.ReadingListId == id);
        if (readingList == null)
        {
            return NotFound();
        }
        string? requestingUserId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        if (readingList != null)
        {
            if (readingList.IsPrivate)
            {
                if (requestingUserId != readingList.UserId)
                {
                    return Unauthorized();
                }
            }
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