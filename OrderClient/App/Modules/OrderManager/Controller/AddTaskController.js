
(function () {
    var module = angular.module("OrderManager");

    // var AddTaskController = function ($scope, TaskOperations, $location) {
    module.controller("AddTaskController", ['$scope', 'TaskOperations', '$location', '$routeParams',
                        function ($scope, TaskOperations, $location, $routeParams) {

                            var GetAllTasks = function (response) {
                                $scope.$parent.Orders = response.data;
                                $location.path("/");
                            };

                            var onError = function (response) {
                                $scope.error = "Could not find Tasks";
                            };

                            $scope.AddOrderDetail = function () {
                                var OrderInfo =
                                    {
                                        Name: $scope.AddTaskForm.CustomerName,
                                        RentAmt: $scope.AddTaskForm.RentAmount,
                                        OrderDate: $scope.AddTaskForm.OrderDate,
                                        SecurityDeposit: $scope.AddTaskForm.SecurityDeposit,
                                        Address: $scope.AddTaskForm.Address,
                                        ContactNo: $scope.AddTaskForm.ContactNumber
                                    };

                                //$http({
                                //    url: "http://localhost/AngularPOCServices/api/Task",
                                //    method: 'POST',
                                //    params: { task: TaskInfo }
                                //}).then(getTasksList,onError);

                                TaskOperations.AddOrderDetail(OrderInfo).then(GetAllTasks, onError);
                            };

                            $scope.UpdateTask = function () {
                                var TaskInfo =
                                    {
                                        TaskId: $scope.AddTaskForm.TaskId,
                                        TaskName: $scope.AddTaskForm.TaskName,
                                        TaskPriority: $scope.AddTaskForm.Priority,
                                        GeneratedBy: $scope.AddTaskForm.CreatorName
                                    };

                                //$http({
                                //    url: "http://localhost/AngularPOCServices/api/Task",
                                //    method: 'POST',
                                //    params: { task: TaskInfo }
                                //}).then(getTasksList,onError);

                                TaskOperations.editTask(TaskInfo).then(GetAllTasks, onError);
                            };

                            $scope.ClearForm = function () {
                                $scope.AddTaskForm = angular.copy({
                                    TaskName: '',
                                    Priority: '',
                                    CreatorName: ''
                                });
                            };

                            var showTaskDetail = function (response) {
                                TaskOperations.GetItems($scope.order).then(GetAllItems, onError);
                                $scope.orderDetail = response.data;
                                $scope.orderDetail.OrderDate = new Date(parseInt($scope.orderDetail.OrderDate.substr(6)));
                                //$scope.orderDetail.OrderDate = $scope.orderDetail.OrderDate.format("dd/mm/yyyy");
                                $scope.AddTaskForm = {
                                    FirstName: $scope.orderDetail.Name,
                                    LastName: $scope.orderDetail.LastName,
                                    EmailId: $scope.orderDetail.EmailId,
                                    Phone: $scope.orderDetail.ContactNo,
                                    DeliveryDate: $scope.orderDetail.OrderDate,
                                    Address: $scope.orderDetail.Address,
                                    SectorNo: $scope.orderDetail.SectorNo,
                                    OrderId: $scope.orderDetail.OrderId
                                };
                            };

                            $scope.TotalQuantity = 0;
                            $scope.TotalRent = 0;
                            $scope.TotalSecurityDeposit = 0;
                            var GetAllItems = function (response) {
                                $scope.items = response.data;
                                for (var i = 0; i < $scope.items.length; i++) {
                                    $scope.TotalQuantity = $scope.TotalQuantity + $scope.items[i].Quantity;
                                    $scope.TotalRent = $scope.TotalRent + $scope.items[i].RentAmt * $scope.items[i].Quantity;
                                    //$scope.TotalSecurityDeposit = $scope.TotalSecurityDeposit + $scope.items[i].SecurityDeposit * $scope.items[i].Quantity;
                                }
                                $scope.TotalSecurityDeposit = $scope.TotalRent * 2;
                            };

                            $scope.removeRow = function (idx) {
                                $scope.items.splice(idx, 1);
                            }

                            if ($routeParams.oInfo != undefined) {
                                $scope.order = $routeParams.oInfo;
                                if ($scope.order != null) $scope.Action = "Update";
                                TaskOperations.GetOrderDetail($scope.order).then(showTaskDetail, onError);
                            }
                            else {
                                $scope.Action = "Add";
                                //$scope.itemName = '';
                                //$scope.items.push({ 'name': $scope.itemName });
                                $scope.items = [];
                                $scope.itemDetail = [];
                                $scope.itemDetail.Item_Details = [];
                                $scope.itemDetail.Item_Details.Item_Name = "";
                                $scope.itemDetail.Item_Details.push($scope.itemDetail.Item_Details.Item_Name);
                                $scope.itemDetail.Item_DCode = "";
                                $scope.itemDetail.RentAmount = "";
                                $scope.itemDetail.Quantity = "";
                                $scope.itemDetail.SecurityDeposit = "";
                                $scope.itemDetail.Tenure = "";
                                $scope.itemDetail.DealerName = "";
                                $scope.items.push($scope.itemDetail);
                                $scope.myDate = new Date();
                            }
                        }]);
    // module.controller("AddTaskController", AddTaskController);
}());