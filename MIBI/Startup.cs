namespace MIBI
{
    using System.IO;
    using AutoMapper;
    using System.Buffers;
    using Newtonsoft.Json;
    using global::AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;
    using Newtonsoft.Json.Serialization;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.FileProviders;
    using Microsoft.AspNetCore.Mvc.Formatters;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
    using MIBI.Data;
    using MIBI.Data.Context;
    using MIBI.Data.Interfaces;
    using MIBI.Data.DBInitilizer;
    using MIBI.Services.Services;
    using MIBI.Services.Interfaces;
    using LoggerAPI.Interfaces;
    using LoggerAPI.Logger;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; // Configuring CROSS-ORIGIN

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // DB Connection init
            var connection = @"Server=.\SQLEXPRESS;Database=MIBI;Integrated Security=True;Trusted_Connection=True;MultipleActiveResultSets=true";
            services.AddDbContext<MIBIContext>(options => 
                options.UseSqlServer(connection));

            // AutoMapper config
            services.AddAutoMapper(typeof(MapperInitializer));

            // Prevent JSON reference loop handling
            services.AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.SuppressConsumesConstraintForFormFileParameters = true;
                    options.SuppressInferBindingSourcesForParameters = true;
                    options.SuppressModelStateInvalidFilter = true;
                    options.SuppressMapClientErrors = true;
                    options.SuppressUseValidationProblemDetailsForInvalidModelStateResponses = true;
                });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            // Cors
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins(
                        "https://localhost:5000",
                        "https://localhost:5001"
                        );
                });
            });

            // Service Injection
            services.AddTransient<IMIBIContext, MIBIContext>();
            services.AddTransient<ISampleService, SampleService>();
            services.AddTransient<IAutocompleteService, FilterService>();
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<ILogger, Logger>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, MIBIContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            DBInitializer.SeedDb(context);

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");

                routes.MapRoute(name: "api", template: "api/{controller=Admin}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            // Enable static files
            app.UseStaticFiles();
        }
    }
}
