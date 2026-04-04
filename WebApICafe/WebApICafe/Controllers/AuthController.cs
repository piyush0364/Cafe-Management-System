using Microsoft.AspNetCore.Mvc;
using WebApICafe.Models;
using WebApICafe.Services;

namespace WebApICafe.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate(
        [FromBody] Authenticate userObj,
        CancellationToken cancellationToken)
    {
        var result = await _authService.AuthenticateAsync(userObj, cancellationToken);
        return ToActionResult(result);
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser(
        [FromBody] User userObj,
        CancellationToken cancellationToken)
    {
        var result = await _authService.RegisterAsync(userObj, cancellationToken);
        return ToActionResult(result);
    }

    private static IActionResult ToActionResult(AuthOperationResult result) =>
        new ObjectResult(result.Body) { StatusCode = result.StatusCode };
}
