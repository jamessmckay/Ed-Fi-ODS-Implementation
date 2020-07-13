// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

using Autofac;
using Autofac.Extensions.DependencyInjection;
using EdFi.Admin.DataAccess.Contexts;
using EdFi.Ods.Common.Configuration;
using EdFi.Ods.Common.Database;
using EdFi.Ods.Sandbox.Admin.Providers;
using EdFi.Ods.Sandbox.Provisioners;
using EdFi.Ods.Sandbox.Repositories;
using log4net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace EdFi.Ods.Sandbox.Admin
{
    public class Startup
    {
        private const string CorsPolicyName = "_development_";
        private readonly ILog _logger = LogManager.GetLogger(typeof(Startup));

        public Startup(IWebHostEnvironment env)
        {
            _logger.Debug("Loading configuration files");

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public ILifetimeScope Container { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(Configuration);

            services.AddCors(
                options =>
                {
                    options.AddPolicy(
                        CorsPolicyName,
                        builder => builder
                            .WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod());
                });

            services.AddControllers()
                .AddControllersAsServices();
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            _logger.Debug("Configuring Autofac container");

            builder.RegisterType<ClientAppRepo>().As<IClientAppRepo>();
            builder.RegisterType<UsersContextFactory>().As<IUsersContextFactory>();
            builder.RegisterType<SqlSandboxProvisioner>().As<ISandboxProvisioner>();
            builder.RegisterType<AdminDatabaseConnectionStringProvider>().As<IAdminDatabaseConnectionStringProvider>();
            builder.Register(c => DatabaseEngine.SqlServer);
            builder.RegisterType<ConfigConnectionStringsProvider>().As<IConfigConnectionStringsProvider>();
            builder.RegisterType<SandboxProvider>().As<ISandboxProvider>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddLog4Net();

            Container = app.ApplicationServices.GetAutofacRoot();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(CorsPolicyName);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
