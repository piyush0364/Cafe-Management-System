using WebApICafe.Dto;

namespace WebApICafe.Services.Interfaces;

public interface ICartItemService
{
    Task<List<CartItemDto>> GetForUserAsync(int userId, CancellationToken cancellationToken = default);
}
