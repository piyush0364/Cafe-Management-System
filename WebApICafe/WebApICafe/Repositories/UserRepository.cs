using Microsoft.EntityFrameworkCore;
using WebApICafe.Models;

namespace WebApICafe.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(CafeMgm2Context context)
        : base(context)
    {
    }

    public async Task<User?> GetByUsernameAsync(string username, CancellationToken cancellationToken = default)
        => await Context.Users.FirstOrDefaultAsync(u => u.Username == username, cancellationToken);

    public Task<bool> UsernameExistsAsync(string username, CancellationToken cancellationToken = default)
        => Context.Users.AnyAsync(u => u.Username == username, cancellationToken);

    public Task<bool> EmailExistsAsync(string email, CancellationToken cancellationToken = default)
        => Context.Users.AnyAsync(u => u.Email == email, cancellationToken);
}
