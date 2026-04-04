using WebApICafe.Models;

namespace WebApICafe.Services;

public interface IJwtTokenService
{
    string CreateToken(User user);
}
