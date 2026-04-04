using Microsoft.EntityFrameworkCore;
using WebApICafe.Dto;
using WebApICafe.Models;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Services;

public class CartItemService : ICartItemService
{
    private readonly CafeMgm2Context _context;

    public CartItemService(CafeMgm2Context context)
    {
        _context = context;
    }

    public Task<List<CartItemDto>> GetForUserAsync(int userId, CancellationToken cancellationToken = default)
        => (
            from cart in _context.Carts
            join product in _context.Products on cart.ProductId equals product.ProductId
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
}
