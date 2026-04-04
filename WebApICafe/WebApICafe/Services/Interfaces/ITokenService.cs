using WebApICafe.Models;

namespace WebApICafe.Services.Interfaces;

public interface ITokenService
{
    string CreateJwt(User user);
}
