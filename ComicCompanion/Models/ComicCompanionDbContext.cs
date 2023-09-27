using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ComicCompanion.Models
{
    public class ComicCompanionContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<ReadingList> ReadingLists { get; set; }
        public ComicCompanionContext(DbContextOptions options) : base(options) { }
    }
}