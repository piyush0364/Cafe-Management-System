using Microsoft.AspNetCore.Mvc;
using WebApICafe.Models;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;

        public AuthController(IAuthService authService, ITokenService tokenService)
        {
            _authService = authService;
            _tokenService = tokenService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Authenticate userObj)
        {
            if (userObj == null)
            {
                return BadRequest(new { Message = "Request body is null" });
            }

            var user = await _authService.ValidateCredentialsAsync(userObj);
            if (user is null)
            {
                return BadRequest(new { Message = "Invalid Username or Password" });
            }

            var token = _tokenService.CreateJwt(user);

            return Ok(new
            {
                Token = token,
                id = user.UserId,
                Message = "Login Success!"
            });

        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            var registerResult = await _authService.RegisterUserAsync(userObj);
            if (!registerResult.IsSuccess)
            {
                return BadRequest(new { Message = registerResult.Message });
            }

            return Ok(new
            {
                Message = registerResult.Message
            });
        }
    }
}
