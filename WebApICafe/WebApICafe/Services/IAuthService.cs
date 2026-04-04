using Microsoft.AspNetCore.Http;
using WebApICafe.Models;

namespace WebApICafe.Services;

public interface IAuthService
{
    Task<AuthOperationResult> AuthenticateAsync(Authenticate request, CancellationToken cancellationToken = default);

    Task<AuthOperationResult> RegisterAsync(User user, CancellationToken cancellationToken = default);
}

public sealed class AuthOperationResult
{
    public bool Success { get; init; }
    public int StatusCode { get; init; }
    public object? Body { get; init; }

    public static AuthOperationResult Ok(object body) =>
        new() { Success = true, StatusCode = StatusCodes.Status200OK, Body = body };

    public static AuthOperationResult Fail(int statusCode, string message) =>
        new() { Success = false, StatusCode = statusCode, Body = new { Message = message } };
}
