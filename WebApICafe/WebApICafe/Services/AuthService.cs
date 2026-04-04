using Microsoft.AspNetCore.Http;
using WebApICafe.Helpers;
using WebApICafe.Models;
using WebApICafe.Repositories;

namespace WebApICafe.Services;

public sealed class AuthService : IAuthService
{
    private readonly IUserRepository _users;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        IUserRepository users,
        IJwtTokenService jwtTokenService,
        ILogger<AuthService> logger)
    {
        _users = users;
        _jwtTokenService = jwtTokenService;
        _logger = logger;
    }

    public async Task<AuthOperationResult> AuthenticateAsync(Authenticate request, CancellationToken cancellationToken = default)
    {
        if (request is null)
            return AuthOperationResult.Fail(StatusCodes.Status400BadRequest, "Request body is null");

        var user = await _users.GetByUsernameAsync(request.Username, cancellationToken);

        if (user is null)
        {
            _logger.LogWarning("Login failed: user not found for username {Username}", request.Username);
            return AuthOperationResult.Fail(StatusCodes.Status404NotFound, "User Not Found!");
        }

        if (!PasswordHasher.VerifyPassword(request.Password, user.Password))
        {
            _logger.LogWarning("Login failed: invalid password for user {Username}", request.Username);
            return AuthOperationResult.Fail(StatusCodes.Status400BadRequest, "Password is Incorrect");
        }

        var token = _jwtTokenService.CreateToken(user);
        _logger.LogInformation("User {Username} authenticated successfully", user.Username);

        return AuthOperationResult.Ok(new
        {
            Token = token,
            id = user.UserId,
            Message = "Login Success!"
        });
    }

    public async Task<AuthOperationResult> RegisterAsync(User user, CancellationToken cancellationToken = default)
    {
        if (user is null)
            return AuthOperationResult.Fail(StatusCodes.Status400BadRequest, "Request body is null");

        if (await _users.UsernameExistsAsync(user.Username, cancellationToken))
            return AuthOperationResult.Fail(StatusCodes.Status400BadRequest, "Username Already Exist");

        if (await _users.EmailExistsAsync(user.Email, cancellationToken))
            return AuthOperationResult.Fail(StatusCodes.Status400BadRequest, "Email Already Exist");

        user.Password = PasswordHasher.HashPassword(user.Password);
        await _users.AddAsync(user, cancellationToken);

        return AuthOperationResult.Ok(new { Message = "User Registered!" });
    }
}
