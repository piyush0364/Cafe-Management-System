using Microsoft.EntityFrameworkCore;
using WebApICafe.Dto;
using WebApICafe.Models;

namespace WebApICafe.Repositories;

public class CartRepository : Repository<Cart>, ICartRepository
{
    public CartRepository(CafeMgm2Context context)
        : base(context)
    {
    }

    public async Task<IReadOnlyList<CartItemDto>> GetCartItemsForUserAsync(int userId, CancellationToken cancellationToken = default)
    {
        var cartItems = await (from cart in Context.Carts
                               join product in Context.Products on cart.ProductId equals product.ProductId
                               where cart.UserId == userId
                               select new CartItemDto
                               {
                                   ProductId = product.ProductId,
                                   CartId = cart.CartId,
                                   ProductName = product.Name,
                                   Price = product.Price,
                                   ImageUrl = product.ImageUrl ?? string.Empty,
                                   Quantity = cart.Quantity
                               }).ToListAsync(cancellationToken);

        return cartItems;
    }
}
