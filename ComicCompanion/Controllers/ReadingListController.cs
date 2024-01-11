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
    public IActionResult Get([FromQuery] int page = 0, [FromQuery] string? userId = null, string? userName = null, string? listName = null)
    {

        var readingListQuery = _db.ReadingLists.Include(l => l.Ratings).AsQueryable();

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
        if (listName != null)
        {
            readingListQuery = readingListQuery.Where(l => l.Name == listName);
        }


        int skipBy = page * 10;
        var readingLists = readingListQuery.Include(list => list.User).Skip(skipBy).Take(10).ToList().Select(readingList => new ReadingListDto(readingList, true));


        // searching by user name?
        ApplicationUser? userByName = _db.Users.FirstOrDefault(user => user.UserName == userName);
        if (userByName != null)
        {
            readingLists = readingLists.Where(list => list.CreatedBy.Equals(userByName.UserName));
        }


        // if (!readingLists.Any())
        // {
        //     return NotFound(new APIResponseDto("error", 404, "Not Found"));
        // }


        return Ok(new APIResponseDto("success", 200, readingLists, page));
    }



    [HttpGet("ReadingLists/{id}")]
    public IActionResult GetReadingList(int id)
    {
        var readingList = _db.ReadingLists.Include(l => l.Ratings).Include(list => list.User).FirstOrDefault(list => list.ReadingListId == id);
        if (readingList == null)
        {
            return NotFound(new APIResponseDto("error", 404, "Not Found"));
        }
        string? requestingUserId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        if (readingList != null)
        {
            if (readingList.IsPrivate)
            {
                if (requestingUserId != readingList.UserId)
                {
                    return Unauthorized(new APIResponseDto("error", 401, "Insufficient Permissions"));
                }
            }
            var list = new ReadingListDto(readingList, true);
            return Ok(new APIResponseDto("success", 200, list));
        }
        else
        {
            return NotFound(new APIResponseDto("error", 404, "Not Found"));
        }
    }


    [HttpGet("ReadingLists/popular")]
    public IActionResult Popular()
    {
        var popularLists = _db.ReadingLists.Include(l => l.Ratings).Include(l => l.User
        ).Where(l => l.IsPrivate == false).OrderByDescending(readingList => readingList.Ratings.Where(rating => rating.Positive == true).Count() - readingList.Ratings.Where(rating => rating.Positive == false).Count()).ToList().Select(list => new ReadingListDto(list, false));

        return Ok(new APIResponseDto("success", 200, popularLists));
    }

    [HttpPost("ReadingLists")]
    public IActionResult Create(ReadingList list)
    {

        string? userId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        if (userId != null)
        {
            list.UserId = userId;
            _db.ReadingLists.Add(list);
            _db.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, new APIResponseDto("success", 201, list));

        }
        else
        {
            return Unauthorized(new APIResponseDto("error", 401, "Unauthorized"));
        }
    }



    [HttpPut("ReadingLists/{id}")]
    public IActionResult Update(ReadingList list)
    {
        string? userId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        if (userId != null && userId == list.UserId)
        {
            _db.ReadingLists.Update(list);
            _db.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, new APIResponseDto("success", 201, list));
        }
        else
        {
            return Unauthorized(new APIResponseDto("error", 401, "Unauthorized"));

        }
    }

    [HttpPost("ReadingLists/{id}")]
    public IActionResult Delete(ReadingList list)
    {
        string? userId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        if (userId != null && list.UserId == userId)
        {
            _db.ReadingLists.Remove(list);
            _db.SaveChanges();
            return NoContent();
        }
        else
        {
            return Unauthorized(new APIResponseDto("error", 401, "Unauthorized"));

        }
    }


    [HttpPut("ReadingLists/{readingListId}/vote")]
    public IActionResult Vote([FromRoute] int readingListId, [FromBody] bool positive)
    {
        string? requestingUserId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        if (requestingUserId == null)
        {
            return Unauthorized(new APIResponseDto("error", 401, "Unauthorized"));
        }

        ReadingListRating? rating = _db.ReadingListRatings.FirstOrDefault(rating => rating.ReadingListId == readingListId && rating.UserId == requestingUserId);
        if (rating == null)
        {
            rating = new ReadingListRating() { ReadingListRatingId = readingListId, Positive = positive, UserId = requestingUserId };

            _db.ReadingListRatings.Add(rating);
            _db.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, new APIResponseDto("success", 201, "Rating Posted"));

        }
        else
        {
            return BadRequest(new APIResponseDto("error", 400, "Bad Request"));
        }
    }

    [HttpPost("ReadingLists/{id}/favorite")]
    public IActionResult Favorite(int id)
    {
        string? requestingUserId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        if (requestingUserId == null)
        {
            return Unauthorized(new APIResponseDto("error", 401, "Unauthorized"));
        }

        string responseMessage;

        UserReadingListFavorite? favorite = _db.UserReadingListFavorites.FirstOrDefault(favorite => favorite.ReadingListId == id && favorite.UserId == requestingUserId);
        if (favorite != null)
        {
            _db.UserReadingListFavorites.Remove(favorite);
            responseMessage = "Favorite Removed";
        }
        else
        {
            _db.UserReadingListFavorites.Add(new UserReadingListFavorite() { UserId = requestingUserId, ReadingListId = id });
            responseMessage = "Favorite Added";
        }
        _db.SaveChanges();
        return StatusCode(StatusCodes.Status201Created, new APIResponseDto("success", 201, responseMessage));

    }

}