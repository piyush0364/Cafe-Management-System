using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApICafe.AI_ChatBotService;
using WebApICafe.Models;
using WebApICafe.Repositories;

namespace WebApICafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IRepository<Product> _products;
        private readonly ChatbotService _chatbotService;
        public ProductsController(IRepository<Product> products, ChatbotService chatbotService)
        {
            _products = products;
            _chatbotService = chatbotService;
        }

        // GET: api/Products
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return Ok(await _products.GetAllAsync());
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _products.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            try
            {
                await _products.UpdateAsync(product);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _products.ExistsAsync(e => e.ProductId == id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin1256")]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            await _products.AddAsync(product);

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _products.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            await _products.DeleteAsync(product);

            return NoContent();
        }

        [HttpPost("generate-embeddings")]
        public async Task<IActionResult> Generate()
        {
            await _chatbotService.GenerateAllEmbeddings();
            return Ok("Embeddings Generated");
        }

        [HttpPost("ask")]
        public async Task<IActionResult> Ask(ChatRequest req)
        {
            var result = await _chatbotService.Ask(req.Message);
            return Ok(result);
        }

        public class ChatRequest
        {
            public string Message { get; set; }
        }
    }
}

