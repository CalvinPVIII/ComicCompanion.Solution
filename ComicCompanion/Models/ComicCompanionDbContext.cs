using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ComicCompanion.Models;

public class ComicCompanionDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<ReadingList> ReadingLists { get; set; }
}