using WebApICafe.Dto;
using WebApICafe.Models;

namespace WebApICafe.Repositories;

public interface ICartRepository : IRepository<Cart>
{
    Task<IReadOnlyList<CartItemDto>> GetCartItemsForUserAsync(int userId, CancellationToken cancellationToken = default);
}
