using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WebApICafe.Models;

namespace WebApICafe.Helpers
{
    public class ChatbotHelper
    {
        private CafeMgm2Context _context;

        public ChatbotHelper(CafeMgm2Context context)
        {
            _context = context;
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

        
    }
}