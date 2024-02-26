using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ComicCompanion.Models;
[Route("api/")]
[ApiController]
[EnableCors("AppCorsPolicy")]
public class LibrarySyncController : Controller
{
    private readonly ComicCompanionContext _db;


    public LibrarySyncController(ComicCompanionContext db)
    {
        _db = db;

    }


    [HttpPost("sync")]
    public IActionResult SyncLibrary([FromBody] UserLibrarySync library)
    {
        string? requestingUserId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        if (requestingUserId == null)
        {
            return NotFound(new APIResponseDto("error", 404, "User Not Found"));
        }
        UserLibrarySync? prevSync = _db.UserLibrarySyncs.FirstOrDefault(library => library.UserId == requestingUserId);
        library.LastSynced = DateTime.Now;
        if (prevSync == null)
        {
            _db.UserLibrarySyncs.Add(library);

        }
        else
        {

            library.UserLibrarySyncId = prevSync.UserLibrarySyncId;
            _db.UserLibrarySyncs.Remove(prevSync);

            _db.UserLibrarySyncs.Add(library);
        }
        _db.SaveChanges();
        return Ok(new APIResponseDto("success", 200, library));
    }

    [HttpGet("sync")]
    public IActionResult Get()
    {
        string? requestingUserId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
        if (requestingUserId == null)
        {
            return NotFound(new APIResponseDto("error", 404, "User Not Found"));
        }
        else
        {
            UserLibrarySync? foundSync = _db.UserLibrarySyncs.FirstOrDefault(library => library.UserId == requestingUserId);
            if (foundSync == null)
            {
                return NotFound(new APIResponseDto("error", 404, "Library Not Found"));
            }
            else
            {
                return Ok(new APIResponseDto("success", 200, foundSync));

            }
        }
    }

}

