namespace ComicCompanion.Models;

public class UpdateUserDto
{
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? UserName { get; set; }
    public string UserId { get; set; }
    public string OriginalPassword { get; set; }

}