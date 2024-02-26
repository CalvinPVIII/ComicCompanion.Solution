using Microsoft.EntityFrameworkCore;
using ComicCompanion.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ToDoList
{
  class Program
  {
    static void Main(string[] args)
    {

      WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

      builder.Services.AddControllersWithViews();

      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();


      builder.Services.AddCors(options =>
      {
        options.AddDefaultPolicy(
            policy =>
            {

              policy.AllowAnyOrigin();
              policy.AllowAnyHeader();
              policy.AllowAnyMethod();
            });
      });

      builder.Services.AddDbContext<ComicCompanionContext>(
                        dbContextOptions => dbContextOptions
                          .UseNpgsql(
                            builder.Configuration["ConnectionStrings:DefaultConnection"]
                          )
                        );

      builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ComicCompanionContext>()
                .AddDefaultTokenProviders();

      // builder.Services.Configure<IdentityOptions>(options =>
      // {
      //   options.Password.RequireDigit = false;
      //   options.Password.RequireLowercase = false;
      //   options.Password.RequireNonAlphanumeric = false;
      //   options.Password.RequireUppercase = false;
      //   options.Password.RequiredLength = 0;
      //   options.Password.RequiredUniqueChars = 0;
      // });

      builder.Services.AddAuthentication(options =>
{
  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
  options.SaveToken = true;
  options.RequireHttpsMetadata = false;
  options.TokenValidationParameters = new TokenValidationParameters()
  {
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidAudience = builder.Configuration["JWT:ValidAudience"],
    ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
  };
});
      builder.Services.AddCors(options =>
      {
        options.AddPolicy(name: "AppCorsPolicy", policy =>
        {
          policy.WithOrigins("http://localhost", "https://localhost", "capacitor://localhost", "https://comiccompanion.netlify.app/", "http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
        });

      });

      WebApplication app = builder.Build();
      AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

      // Configure the HTTP request pipeline.
      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }
      // app.UseDeveloperExceptionPage();
      app.UseHttpsRedirection();
      app.UseStaticFiles();

      app.UseRouting();

      app.UseCors();

      app.UseAuthentication();
      app.UseAuthorization();

      app.MapControllerRoute(
          name: "default",
          pattern: "{controller=Home}/{action=Index}/{id?}"
        );

      app.MapFallbackToFile("./dist/index.html");

      app.Run();
    }
  }
}