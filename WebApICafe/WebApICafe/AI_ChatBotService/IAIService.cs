using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApICafe.AI_ChatBotService
{
    public interface IAIService
    {
        Task<float[]> CreateEmbedding(string text);
        Task<string> GetChatResponse(string prompt);
    }
}
