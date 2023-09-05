using Microsoft.AspNetCore.Mvc;

namespace ComicCompanion.Models;

public class ReadingListController : Controller
{
    private readonly ComicCompanionDbContext _db;

    public ReadingListController(ComicCompanionDbContext db)
    {
        _db = db;
    }

}