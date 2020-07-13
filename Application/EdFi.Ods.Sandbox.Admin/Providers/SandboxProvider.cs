// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EdFi.Admin.DataAccess;
using EdFi.Admin.DataAccess.Models;
using EdFi.Admin.DataAccess.Utils;
using EdFi.Ods.Common.Configuration;
using EdFi.Ods.Common.Extensions;
using EdFi.Ods.Sandbox.Admin.Models;
using EdFi.Ods.Sandbox.Provisioners;
using EdFi.Ods.Sandbox.Repositories;

namespace EdFi.Ods.Sandbox.Admin.Providers
{
    public interface ISandboxProvider
    {
        Task<HashSet<SandboxDetail>> GetInstalledSandboxes();
    }

    public class SandboxProvider : ISandboxProvider
    {
        private readonly IClientAppRepo _clientAppRepo;
        private readonly ISandboxProvisioner _sandboxProvisioner;

        public SandboxProvider(IClientAppRepo clientAppRepo, ISandboxProvisioner sandboxProvisioner)
        {
            _clientAppRepo = clientAppRepo;
            _sandboxProvisioner = sandboxProvisioner;
        }

        public async Task<HashSet<SandboxDetail>> GetInstalledSandboxes()
        {
            var users = await _clientAppRepo.GetUsersAsync();

            var knownSandboxes = new HashSet<UserClientSandbox>();

            foreach (var user in users)
            {
                foreach (var client in user.ApiClients)
                {
                    knownSandboxes.Add(
                        new UserClientSandbox
                        {
                            User = user,
                            ApiClient = client,
                            DatabaseName =  DatabaseNameBuilder.SandboxNameForKey(client.Key),
                            SandboxType = client.SandboxType,
                            Name = client.Name
                        });
                }
            }

            var sandboxDatabases = await _sandboxProvisioner.GetSandboxDatabasesAsync();

            var sandboxDetails = new HashSet<SandboxDetail>();

            foreach (string sandboxDatabase in sandboxDatabases)
            {
                var knownSandbox = knownSandboxes.FirstOrDefault(x => x.DatabaseName.EqualsIgnoreCase(sandboxDatabase));

                if (knownSandbox != null)
                {
                    sandboxDetails.Add(
                        new SandboxDetail
                        {
                            ApiKey = knownSandbox.ApiClient.Key,
                            Owner = knownSandbox.User.Email,
                            DatabaseName = sandboxDatabase,
                            Name = knownSandbox.Name,
                            SandboxType = knownSandbox.SandboxType.ToString()
                        });
                }
                else
                {
                    sandboxDetails.Add(
                        new SandboxDetail
                        {
                            DatabaseName = sandboxDatabase,
                            IsOrphaned = true
                        });
                }
            }

            return sandboxDetails;
        }

        private class UserClientSandbox
        {
            public ApiClient ApiClient { get; set; }

            public string DatabaseName { get; set; }

            public User User { get; set; }

            public SandboxType SandboxType { get; set; }

            public string Name { get; set; }
        }
    }
}

