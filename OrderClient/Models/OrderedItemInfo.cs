using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrderClient.Models
{
    public class OrderedItemInfo
    {
        public string OrderId { get; set; }
        public string ItemName { get; set; }
        public string Item_DCode { get; set; }
        public List<Item_Info> Item_Details { get; set; } = new List<Item_Info>();
        public int RentAmt { get; set; }
        public int SecurityDeposit { get; set; }
        public string DealerName { get; set; }
        public int Quantity  { get; set; }
        public int Tenure { get; set; }
        public int TotalRent { get; set; }
    }
}