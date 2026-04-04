using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OpenAI;
using OpenAI.Chat;
using OpenAI.Embeddings;

namespace WebApICafe.AI_ChatBotService
{
    public class AIService : IAIService
    {
        private readonly OpenAIClient _client;
        private readonly string _apiKey;
        public AIService(IConfiguration config)
        {
            _apiKey = config["OpenAI:ApiKey"];
            _client = new OpenAIClient(_apiKey);
        }

        public async Task<float[]> CreateEmbedding(string text)
        {
            var client = _client.GetEmbeddingClient("text-embedding-3-small");

            // Generate the embedding
            OpenAIEmbedding embedding = await client.GenerateEmbeddingAsync(text);

            // Use ToFloats() to access the vector and convert to array
            return embedding.ToFloats().ToArray();
        }

        public async Task<string> GetChatResponse(string prompt)
        {
            var chatClient = new ChatClient(
                model: "gpt-4.1-mini",
                apiKey: _apiKey);

            var response = await chatClient.CompleteChatAsync(prompt);

            return response.Value.Content[0].Text;
        }
    }
}