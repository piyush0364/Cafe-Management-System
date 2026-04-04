using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebApICafe.Models;

namespace WebApICafe.AI_ChatBotService
{
    public class ChatbotService
    {
        private readonly IAIService _aiService;
        private readonly CafeMgm2Context _context;
        public ChatbotService(IAIService aiService, CafeMgm2Context context)
        {
            _aiService = aiService;
            _context = context;
        }
        private string ConvertProductToText(Product p, string categoryName)
        {
            return $"{p.Name} costs ₹{p.Price}. " +
           $"{p.Description}. " +
           $"Category: {categoryName}. " +
           $"Spice Level: {p.SpiceLevel}. " +
           $"{(p.IsVeg ? "Vegetarian" : "Non Vegetarian")}.";
        }

        public async Task SaveEmbeddingsForProduct(Product product)
        {
            var text = ConvertProductToText(product, product.Category!.Name);

            var embedding = await _aiService.CreateEmbedding(text);

            await SaveEmbedding(product.ProductId, embedding, text);

        }

        private async Task SaveEmbedding(int productId, float[] embedding, string text)
        {
            var existing = _context.ProductEmbeddings
                .FirstOrDefault(x => x.ProductId == productId);

            if (existing != null)
            {
                // UPDATE
                existing.Embedding = JsonConvert.SerializeObject(embedding);
                existing.TextData = text;

                _context.ProductEmbeddings.Update(existing);
            }
            else
            {
                // INSERT
                var entity = new ProductEmbedding
                {
                    ProductId = productId,
                    Embedding = JsonConvert.SerializeObject(embedding),
                    TextData = text
                };

                _context.ProductEmbeddings.Add(entity);
            }

            await _context.SaveChangesAsync();
        }

        public async Task GenerateAllEmbeddings()
        {
            var products = _context.Products
                .Include(x => x.Category)
                .Where(x => x.IsAvailable)
                .ToList();

            foreach (var product in products)
            {
                await SaveEmbeddingsForProduct(product);
            }
        }

        public async Task<string> Ask(string message)
        {
            var queryEmbedding = await _aiService.CreateEmbedding(message);

            var products = GetRelevantProducts(queryEmbedding);

            var context = string.Join("\n", products.Select(x => x.TextData));

            string prompt = $@"
You are a cafe assistant.

User Question:
{message}

Relevant Products:
{context}

Suggest food properly with price.
";

            var response = await _aiService.GetChatResponse(prompt);

            return response;
        }


        public List<ProductEmbedding> GetRelevantProducts(float[] queryEmbedding)
        {
            var all = _context.ProductEmbeddings.ToList();

            return all
                .Select(x => new
                {
                    Data = x,
                    Score = CosineSimilarity(
                        JsonConvert.DeserializeObject<float[]>(x.Embedding)!,
                        queryEmbedding)
                })
                .OrderByDescending(x => x.Score)
                .Take(5)
                .Select(x => x.Data)
                .ToList();
        }

        private double CosineSimilarity(float[] v1, float[] v2)
        {
            double dot = 0;
            double mag1 = 0;
            double mag2 = 0;

            for (int i = 0; i < v1.Length; i++)
            {
                dot += v1[i] * v2[i];
                mag1 += Math.Pow(v1[i], 2);
                mag2 += Math.Pow(v2[i], 2);
            }

            return dot / (Math.Sqrt(mag1) * Math.Sqrt(mag2));
        }
    }
}