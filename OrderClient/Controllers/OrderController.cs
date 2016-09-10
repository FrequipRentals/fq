using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OrderClient.Models;
using OrderClient.OrderEntityEF;
using Newtonsoft.Json;
using System.Data.Entity;

namespace OrderClient.Controllers
{
    public class OrderController : Controller
    {

        // GET api/task
        public JsonResult GetAllOrders()
        {
            var orderList = new List<OrderInfo>();
            try
            {
                using (var context = new OrderListEntities())
                {
                    var result = context.Users.Select(x => x).ToList();

                    foreach (var order in result)
                    {
                        OrderInfo orderInfo = new OrderInfo();
                        orderInfo.Name = order.Name;
                        orderInfo.RentAmt = order.RentAmt;
                        orderInfo.SecurityDeposit = order.SecurityDeposit;
                        orderInfo.OrderDate = order.OrderDate;
                        orderInfo.ContactNo = order.ContactNo;
                        orderInfo.Address = order.Address;
                        orderInfo.OrderId = order.OrderId;

                        orderList.Add(orderInfo);
                    }

                    //orderList = AutoMapper.Mapper.Map <IEnumerable<User>, List<OrderInfo>>(result).ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Json(JsonConvert.SerializeObject(orderList), JsonRequestBehavior.AllowGet);
        }

        //// GET api/task/5
        //public List<TaskModel> Get(string taskCreator)
        //{
        //    List<TaskModel> taskList = new List<TaskModel>();
        //    taskList = TaskList.Where(t => t.GeneratedBy.Contains(taskCreator)).ToList();
        //    return taskList;
        //}

        // GET api/task/5
        //[HttpPost]
        //[Route("api/Task/GetOrderDetail")]
        public JsonResult Get(string order)
        {
            OrderInfo orderInfo = new OrderInfo();
            try
            {
                using (var context = new OrderListEntities())
                {
                    var orderDetail = context.Users.Where(x => x.OrderId == order).FirstOrDefault();

                    orderInfo.Name = orderDetail.Name;
                    orderInfo.RentAmt = orderDetail.RentAmt;
                    orderInfo.SecurityDeposit = orderDetail.SecurityDeposit;
                    orderInfo.OrderDate = orderDetail.OrderDate;
                    orderInfo.ContactNo = orderDetail.ContactNo;
                    orderInfo.Address = orderDetail.Address;
                    orderInfo.OrderId = orderDetail.OrderId;
                    orderInfo.LastName = orderDetail.LastName;
                    orderInfo.SectorNo = orderDetail.SectorNumber;
                    orderInfo.EmailId = orderDetail.EmailId;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return Json(orderInfo, JsonRequestBehavior.AllowGet);
        }

        // GET api/task/5
        //[HttpGet]
        //[Route("api/Task/GetOrderedItems")]
        public JsonResult GetOrderedItems(string OrderId)
        {
            List<OrderedItemInfo> itemList = new List<OrderedItemInfo>();
            using (var context = new OrderListEntities())
            {
                var items = context.Items.Where(x => x.OrderId == OrderId).ToList();

                foreach (var item in items)
                {
                    OrderedItemInfo itemInfo = new OrderedItemInfo();
                    Item_Info info = new Item_Info();
                    //itemInfo.Item_Details = new List<Item_Info>();
                    var items_Desc = context.Item_Catalog.Where(x => x.Item_DCode == item.Item_DCode).ToList();
                    foreach (var item_Desc in items_Desc)
                    {
                        info.Item_Name= item_Desc.Item_Name;
                        info.Item_Desc = item_Desc.Item_Desc;
                        info.InStock = item_Desc.InStock;
                        info.CategoryId = item_Desc.CategoryId;
                        info.Item_DCode = item_Desc.Item_DCode;

                        itemInfo.Item_Details.Add(info);
                    }
                    itemInfo.RentAmt = item.RentAmt;
                    itemInfo.SecurityDeposit = item.SecurityDeposit;
                    itemInfo.Item_DCode = item.Item_DCode;
                    itemInfo.Quantity = item.Quantity;
                    itemInfo.Tenure = item.Tenure;
                    itemInfo.DealerName = item.DealerName;
                    itemInfo.TotalRent = item.TotalRent;

                    itemList.Add(itemInfo);
                }
            }
            return Json(itemList, JsonRequestBehavior.AllowGet);
        }

        //// POST api/task
        //[HttpPost]
        //[Route("api/Task/UpdateTask")]
        //public List<TaskModel> UpdateTask(TaskModel task)
        //{
        //    TaskModel newTask = new TaskModel();
        //    newTask = TaskList.Where(x => x.TaskId == task.TaskId).FirstOrDefault();
        //    newTask.TaskName = task.TaskName;
        //    newTask.TaskPriority = task.TaskPriority;
        //    newTask.GeneratedBy = task.GeneratedBy;
        //    newTask.Status = "In Process";

        //    for (int t = 0; TaskList.Count > t; t++)
        //    {
        //        if (TaskList[t].TaskId == task.TaskId)
        //        {
        //            TaskList[t] = newTask;
        //            break;
        //        }
        //    }
        //    return TaskList;
        //}

        // POST api/task
        //[HttpPost]
        //[Route("api/Task/AddOrderDetail")]
        public void AddOrderDetail(OrderInfo info)
        {
            User user = new User();
            user.Name = info.Name;
            user.RentAmt = info.RentAmt;
            user.SecurityDeposit = user.SecurityDeposit;
            user.OrderDate = DateTime.Now;
            user.OrderId = DateTime.Today.ToString() + '/';
            user.ContactNo = info.ContactNo;
            user.Address = info.Address;


            using (var context = new OrderListEntities())
            {
                context.Users.Add(user);
                context.SaveChanges();
            }
        }


        public JsonResult GetDuePaymentOrders()
        {
            var orderList = new List<OrderInfo>();
            try
            {
                using (var context = new OrderListEntities())
                {
                    var result = (from it in context.Items
                                  join ur in context.Users on it.OrderId equals ur.OrderId
                                  where DbFunctions.AddMonths(ur.OrderDate, it.Tenure - 1) < DateTime.Now
                                  && DbFunctions.DiffDays(DbFunctions.AddMonths(ur.OrderDate, it.Tenure), DateTime.Now) < 30
                                  select new { it.Tenure, ur.Name, ur.RentAmt, ur.SecurityDeposit, ur.OrderDate, ur.ContactNo, ur.Address, ur.OrderId }

                                      ).ToList();

                    foreach (var order in result)
                    {
                        OrderInfo orderInfo = new OrderInfo();
                        orderInfo.Name = order.Name;
                        orderInfo.RentAmt = order.RentAmt;
                        orderInfo.SecurityDeposit = order.SecurityDeposit;
                        orderInfo.OrderDate = order.OrderDate;
                        orderInfo.ContactNo = order.ContactNo;
                        orderInfo.Address = order.Address;
                        orderInfo.OrderId = order.OrderId;

                        orderList.Add(orderInfo);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Json(JsonConvert.SerializeObject(orderList), JsonRequestBehavior.AllowGet);
        }
    }
}