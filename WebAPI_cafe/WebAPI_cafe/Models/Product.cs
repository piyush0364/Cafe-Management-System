using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WebAPI_cafe.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public string? ImageUrl { get; set; }

    public int? CategoryId { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<Cart>? Carts { get; set; } = new List<Cart>();

    public virtual Category? Category { get; set; }

    [JsonIgnore]
    public virtual ICollection<Order>? Orders { get; set; } = new List<Order>();
}
