namespace ComicCompanion.Models;

public abstract class ComicHelper
{
    public static string FormatSearchKeyword(string keyword)
    {
        return keyword.Trim().Replace(" ", "+").Replace("(", "%28").Replace(")", "%29");
    }
}