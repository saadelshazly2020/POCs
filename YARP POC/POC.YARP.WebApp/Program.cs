
using POC.YARP.WebApp;

public class Program
{
    public static void Main(string[] args)
    {
        //var logger = NLogBuilder.ConfigureNLog("NLog.config").GetCurrentClassLogger();
        //logger.Debug("Application Starting Up");
        CreateHostBuilder(args).Build().Run();  
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            }).ConfigureLogging((hostingContext, logging) => {
                //logging.AddNLog(hostingContext.Configuration.GetSection("Logging"));
            });



}