using VideoChatingApp.WebRTC.Core.Interfaces;
using VideoChatingApp.WebRTC.Hubs;
using VideoChatingApp.WebRTC.Managers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddSignalR();

// Register application services
builder.Services.AddSingleton<IUserManager, UserManager>();
builder.Services.AddSingleton<IRoomManager, RoomManager>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Add logging
builder.Services.AddLogging(logging =>
{
    logging.AddConsole();
    logging.AddDebug();
});

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseCors("AllowAll");

app.UseDefaultFiles();
app.UseStaticFiles();

// Map SignalR hub
app.MapHub<VideoCallHub>("/videocallhub");

// Fallback to index.html for SPA routing (production)
app.MapFallbackToFile("dist/index.html");

app.Run();
