using WebApICafe.Models;

namespace WebApICafe.Services.Interfaces;

public interface IAuthService
{
    Task<User?> ValidateCredentialsAsync(Authenticate request, CancellationToken cancellationToken = default);
    Task<(bool IsSuccess, string Message)> RegisterUserAsync(User user, CancellationToken cancellationToken = default);
}
