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
    private object l;

    public ReadingListController(ComicCompanionContext db, UserManager<ApplicationUser> userManager)
    {
        _db = db;
        _userManager = userManager;
    }

    [HttpGet("ReadingLists")]
    public IActionResult Get([FromQuery] int page = 1, [FromQuery] string? userId = null, [FromQuery] string? userName = null, [FromQuery] string? listName = null)
    {

        var readingListQuery = _db.ReadingLists.Include(l => l.Ratings).Include(l => l.User).AsQueryable();

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
            readingListQuery = readingListQuery.Where(l => l.Name.Contains(listName));
        }


        int skipBy = (page - 1) * 100;
        var readingLists = readingListQuery.Skip(skipBy).Take(100).ToList().Select(readingList => new ReadingListDto(readingList, true));


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

        int maxPage = (int)Math.Ceiling((double)_db.ReadingLists.Count() / 100);
        return Ok(new APIResponseDto("success", 200, readingLists, page, maxPage));
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
            if (requestingUserId != null)
            {
                bool favorite = _db.UserReadingListFavorites.Any(fav => fav.ReadingListId == id && fav.UserId == requestingUserId);
                ReadingListRating? rating = _db.ReadingListRatings.FirstOrDefault(rating => rating.ReadingListId == id && rating.UserId == requestingUserId);
                var response = new APIResponseDto("success", 200, new { list, userInfo = new { favorite, rating = rating?.Positive } });
                return Ok(response);

            }
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

    [HttpGet("ReadingLists/favorite")]
    public IActionResult Favorites()
    {
        string? requestingUserId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        if (requestingUserId == null)
        {
            return NotFound(new APIResponseDto("error", 401, "Bad Request"));

        }
        else
        {
            var favorites = _db.UserReadingListFavorites.Where(fav => fav.UserId == requestingUserId).Include(fav => fav.ReadingList).ThenInclude(list => list.User).Include(fav => fav.ReadingList).ThenInclude(list => list.Ratings).ToList().Select(fav => new ReadingListDto(fav.ReadingList));
            return Ok(new APIResponseDto("success", 200, favorites));
        }
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

    [HttpDelete("ReadingLists/{id}")]
    public IActionResult Delete(int id)
    {
        string? userId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        ReadingList list = _db.ReadingLists.FirstOrDefault(list => list.ReadingListId == id);
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
        if (rating != null)
        {
            if (rating.Positive != positive)
            {
                rating.Positive = positive;
                _db.ReadingListRatings.Update(rating);
                _db.SaveChanges();
                var data = new { message = "Rating Updated", content = new ReadingListDto(_db.ReadingLists.Include(l => l.Ratings).Include(l => l.User).FirstOrDefault(l => l.ReadingListId == readingListId), true) };
                return StatusCode(StatusCodes.Status201Created, new APIResponseDto("success", 201, data));

            }
            else if (rating.Positive == positive)
            {
                _db.ReadingListRatings.Remove(rating);
                _db.SaveChanges();
                var data = new { message = "Rating Removed", content = new ReadingListDto(_db.ReadingLists.Include(l => l.Ratings).Include(l => l.User).FirstOrDefault(l => l.ReadingListId == readingListId), true) };
                return StatusCode(StatusCodes.Status201Created, new APIResponseDto("success", 201, data));
            }
        }
        if (rating == null)
        {
            rating = new ReadingListRating() { ReadingListId = readingListId, Positive = positive, UserId = requestingUserId };

            _db.ReadingListRatings.Add(rating);
            _db.SaveChanges();
            var data = new { message = "Rating Posted", content = new ReadingListDto(_db.ReadingLists.Include(l => l.Ratings).Include(l => l.User).FirstOrDefault(l => l.ReadingListId == readingListId), true) };
            return StatusCode(StatusCodes.Status201Created, new APIResponseDto("success", 201, data));

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