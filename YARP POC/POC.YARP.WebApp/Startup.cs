using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace POC.YARP.WebApp
{
    public class Startup
    {
        public static string _clientAppPath = "clientapp/dist";
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        {

            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
            //The HTTPS Redirection Middleware(UseHttpsRedirection) to redirect all HTTP requests to HTTPS
            app.UseHttpsRedirection();

            //serve static files such as images, js, css, etc...
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            //Matches request to an endpoint.


            // use authorization middleware
            app.UseAuthentication();
            app.UseAuthorization();
            //Execute the matched endpoint.
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapReverseProxy();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = _clientAppPath;
            });


        }
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddAuthentication();

            services.AddControllersWithViews();
            services.AddMvc();
            //services.AddControllers();

            services.AddSpaStaticFiles(configuration =>
            {

                configuration.RootPath = _clientAppPath;


            });

            // Add the reverse proxy capability to the server
            var proxyBuilder = services.AddReverseProxy();
            // Initialize the reverse proxy from the "ReverseProxy" section of configuration
            proxyBuilder.LoadFromConfig(Configuration.GetSection("ReverseProxy"));

        }


    }
}
