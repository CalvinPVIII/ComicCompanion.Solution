using System.IdentityModel.Tokens.Jwt;
using System.Linq;
namespace ComicCompanion.Models;

public class AuthHelper
{
    public static string? GetUserId(string? authHeader)
    {
        if (authHeader == null) return null;
        string token = authHeader.Replace("Bearer", "");
        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
        string userId = securityToken.Claims.FirstOrDefault(claim => claim.Type == "UserId").Value;
        return userId;
    }
}