// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

using System.Collections.Generic;
using System.Threading.Tasks;
using EdFi.Ods.Sandbox.Admin.Models;
using EdFi.Ods.Sandbox.Admin.Providers;
using EdFi.Ods.Sandbox.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EdFi.Ods.Sandbox.Admin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SandboxController : ControllerBase
    {
        private readonly ISandboxProvider _sandboxProvider;

        public SandboxController(ISandboxProvider sandboxProvider)
        {
            _sandboxProvider = sandboxProvider;
        }

        [HttpGet]
        public async Task<IActionResult> GetDetails()
        {
            return Ok(await _sandboxProvider.GetInstalledSandboxes());
        }

    }
}
