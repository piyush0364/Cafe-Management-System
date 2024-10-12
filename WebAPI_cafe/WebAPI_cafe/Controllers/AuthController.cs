using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI_cafe.Models;

namespace WebAPI_cafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CafeMgmContext _authcontext;
        public AuthController(CafeMgmContext cafeMgmContext)
        {
            _authcontext = cafeMgmContext;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest(new { Message = "Request body is null" });
            }

            var user = await _authcontext.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password == userObj.Password);

            if (user == null)
            {
                Console.WriteLine("User not found");
                return NotFound(new { Message = "User Not Found!" });
            }

            Console.WriteLine("Login Success");

            var t = CreateJwt(user);

            return Ok(new {
                Token = t,
                id=user.UserId,
                Message = "Login Success!" 
            });

        }
        [HttpPost("register")]

        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if(userObj == null) 
                return BadRequest();
            //Check username
            if(await CheckUserNameExistAsync(userObj.Username))
            {
                return BadRequest(new { Message = "Username Already Exist" });
            }
            //check Email
            if (await CheckEmailExistAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email Already Exist" });
            }

            //check the password strength


            await _authcontext.Users.AddAsync(userObj);
            await _authcontext.SaveChangesAsync();

            return Ok(new
            { 
            Message = "User Registered!"
            });
        }

        private Task<bool> CheckUserNameExistAsync(string userName) =>
            _authcontext.Users.AnyAsync(x => x.Username == userName);

        private Task<bool> CheckEmailExistAsync(string email) =>
      _authcontext.Users.AnyAsync(x => x.Email == email);

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "User")

            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
