using Microsoft.EntityFrameworkCore;
using WebApICafe.Helpers;
using WebApICafe.Models;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Services;

public class AuthService : IAuthService
{
    private readonly CafeMgm2Context _dbContext;

    public AuthService(CafeMgm2Context dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<User?> ValidateCredentialsAsync(Authenticate request, CancellationToken cancellationToken = default)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(
            x => x.Username == request.Username,
            cancellationToken);

        if (user is null || !PasswordHasher.VerifyPassword(request.Password, user.Password))
        {
            return null;
        }

        return user;
    }

    public async Task<(bool IsSuccess, string Message)> RegisterUserAsync(
        User user,
        CancellationToken cancellationToken = default)
    {
        var usernameExists = await _dbContext.Users.AnyAsync(x => x.Username == user.Username, cancellationToken);
        if (usernameExists)
        {
            return (false, "Username Already Exist");
        }

        var emailExists = await _dbContext.Users.AnyAsync(x => x.Email == user.Email, cancellationToken);
        if (emailExists)
        {
            return (false, "Email Already Exist");
        }

        user.Password = PasswordHasher.HashPassword(user.Password);
        await _dbContext.Users.AddAsync(user, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return (true, "User Registered!");
    }
}
