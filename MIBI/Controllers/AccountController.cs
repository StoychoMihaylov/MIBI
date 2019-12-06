﻿namespace MIBI.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using MIBI.Utilities;
    using MIBI.Services.Interfaces;
    using MIBI.Models.BindingModels.Account;

    [Route("api/account")]
    [ApiController]
    public class AccountController : Controller
    {
        private IAccountService service;

        public AccountController(IAccountService service)
        {
            this.service = service;
        }

        // api/account/register
        [HttpPost]
        [Route("register")]
        public IActionResult RegisterAndLogin([FromBody] RegisterUserBindingModel bm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (bm.Password != bm.ConfirmPassword)
            {
                return BadRequest("Invalid credentials!");
            }

            var userAlreadyExist = this.service.CheckIfUserExist(bm);
            if (userAlreadyExist)
            {
                return BadRequest("User with this email already exist!");
            }

            var userCredentials = this.service.CreateNewUserAccount(bm); // User created, will return token(loged-in automaticaly)

            if (userCredentials == null)
            {
                return new BadRequestResult();
            }

            // created!
            return Ok(userCredentials);
        }

        // api/account/login
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginUserBindingModel bm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userCredentials = this.service.LoginUser(bm);

            if (userCredentials == null)
            {
                return BadRequest("Wrong credentials!");
            }

            return Ok(userCredentials);
        }

        [HttpPost]
        [Authorize]
        [Route("logout")]
        public IActionResult Logout([FromBody] LogoutBindingModel bm)
        {
            try
            {
                this.service.DeleteUserToken(bm);
            }
            catch (Exception)
            {
                return NotFound();
            }
            
            return Ok();
        }
    }
}
