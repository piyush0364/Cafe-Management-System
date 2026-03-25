using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApICafe.Helpers;
using WebApICafe.Models;
using WebApICafe.Repositories;

namespace WebAPI_cafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _users;

        public AuthController(IUserRepository users)
        {
            _users = users;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Authenticate userObj)
        {
            if (userObj == null)
            {
                return BadRequest(new { Message = "Request body is null" });
            }

            var user = await _users.GetByUsernameAsync(userObj.Username);

            if (user == null)
            {
                Console.WriteLine("User not found");
                return NotFound(new { Message = "User Not Found!" });
            }

            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }

            Console.WriteLine("Login Success");

            var t = CreateJwt(user);

            return Ok(new
            {
                Token = t,
                id = user.UserId,
                Message = "Login Success!"
            });
        }

        [HttpPost("register")]

        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            if (await _users.UsernameExistsAsync(userObj.Username))
            {
                return BadRequest(new { Message = "Username Already Exist" });
            }

            if (await _users.EmailExistsAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email Already Exist" });
            }

            userObj.Password = PasswordHasher.HashPassword(userObj.Password);

            await _users.AddAsync(userObj);

            return Ok(new
            {
                Message = "User Registered!"
            });
        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Username)

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
