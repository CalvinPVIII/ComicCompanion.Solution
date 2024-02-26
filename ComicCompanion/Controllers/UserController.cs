namespace ComicCompanion.Controllers
{
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using ComicCompanion.Models;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AppCorsPolicy")]
    public class UserController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager; ;
            _signInManager = signInManager;
            _configuration = configuration;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto user)
        {
            var userExists = await _userManager.FindByEmailAsync(user.Email);
            if (userExists != null)
            {
                return BadRequest(new APIResponseDto("error", 400, "User Already Exists"));
            }

            var newUser = new ApplicationUser() { Email = user.Email, UserName = user.UserName };
            var result = await _userManager.CreateAsync(newUser, user.Password);
            if (result.Succeeded)
            {
                return Ok(new APIResponseDto("success", 200, "User has been successfully created"));

            }
            else
            {
                return BadRequest(new APIResponseDto("error", 400, result.Errors));

            }
        }



        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInDto userInfo)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(userInfo.Email);
            if (user != null)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(user, userInfo.Password, isPersistent: false, lockoutOnFailure: false);
                if (signInResult.Succeeded)
                {
                    var authClaims = new List<Claim> { new Claim("UserId", user.Id) };

                    var newToken = CreateToken(authClaims);


                    return Ok(new APIResponseDto("success", 200, new { email = userInfo.Email, token = newToken, userName = user.UserName, userId = user.Id }));

                }
            }

            return BadRequest(new APIResponseDto("error", 400, "Unable to sign in"));


        }

        [HttpPatch("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateUserDto userInfo)
        {
            var requestingUserId = AuthHelper.GetUserId(HttpContext.Request.Headers.Authorization);
            var user = await _userManager.FindByIdAsync(requestingUserId);
            if (user == null)
            {
                return NotFound(new APIResponseDto("error", 404, "No user found"));
            }
            var originalPasswordCheck = await _signInManager.CheckPasswordSignInAsync(user, userInfo.OriginalPassword, false);
            if (userInfo.UserId != requestingUserId || originalPasswordCheck.IsNotAllowed == true)
            {
                return Unauthorized(new APIResponseDto("error", 401, "Unauthorized"));
            }


            if (userInfo.UserName != null)
            {

                user.UserName = userInfo.UserName;



            }
            if (userInfo.Email != null)
            {
                var token = await _userManager.GenerateChangeEmailTokenAsync(user, userInfo.Email);
                var changeResult = await _userManager.SetEmailAsync(user, userInfo.Email);
                await _userManager.ConfirmEmailAsync(user, token);

            }
            if (userInfo.Password != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var changeResult = await _userManager.ResetPasswordAsync(user, token, userInfo.Password);
            }

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok(new APIResponseDto("success", 200, "User Info Updated"));

            }
            else
            {
                return BadRequest(new APIResponseDto("error", 400, string.Join(" ", result.Errors)));
            }
        }

        private string CreateToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}