using VideoChatingApp.WebRTC.Core.Interfaces;
using VideoChatingApp.WebRTC.Hubs;
using VideoChatingApp.WebRTC.Managers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddSignalR();

// Register application services
builder.Services.AddSingleton<IUserManager, UserManager>();
builder.Services.AddSingleton<IRoomManager, RoomManager>();

// Add CORS for development
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000", 
            "https://localhost:3000",
             "https://4e97-194-238-97-224.ngrok-free.app",
            "http://localhost:5274",
            "https://localhost:5274"
        )
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Add SPA static files
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "client-app/dist";
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

// Serve static files from wwwroot
app.UseStaticFiles();
app.UseSpaStaticFiles();
// Map SignalR hub
app.MapHub<VideoCallHub>("/videocallhub");

// Configure SPA
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "client-app/dist";

    //if (app.Environment.IsDevelopment())
    //{
    //    // In development, proxy requests to the Vite dev server
    //    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
    //}
});

// Fallback to index.html for SPA routing (when proxy is not used)
//app.MapFallbackToFile("index.html");

app.Run();
