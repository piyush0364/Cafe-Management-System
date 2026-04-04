using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApICafe.Models
{
    public class ProductEmbedding
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public string Embedding { get; set; }

        public string TextData { get; set; }

        public Product Product { get; set; }
    }
}