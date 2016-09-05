using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrderClient.Models
{
    public class OrderInfo
    {
        public string OrderId { get; set; }
        public string Name { get; set; }
        public int RentAmt { get; set; }
        public DateTime OrderDate { get; set; }
        public int SecurityDeposit { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string LastName { get; set; }
        public string SectorNo { get; set; }
        public string EmailId { get; set; }
    }
}