using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrderClient.Models
{
    public class Item_Info
    {
        public string Item_DCode { get; set; }
        public string Item_Name { get; set; }
        public int InStock { get; set; }
        public int CategoryId { get; set; }
        public string Item_Desc { get; set; }
        
    }
}