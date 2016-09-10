
(function () {

    var TaskOperations = function ($http) {

        var TaskDetails;

        var searchTask = function (GeneratedBy) {
            return $http({
                url: "Task/",
                method: 'GET',
                params: { taskCreator: GeneratedBy }
            });
        };

        var showAllTask = function () {
            return $http.get('Order/GetAllOrders');
        };

        var GetDuePaymentOrders = function () {
            return $http.get('Order/GetDuePaymentOrders');
        };


        var AddOrderDetail = function (OrderInfo) {
            return $http.post("/Order/AddOrderDetail", OrderInfo);
        };


        var editTask = function (TaskInfo) {
            return $http.post("http://localhost/AngularPOCServices/api/Task/UpdateTask", TaskInfo);
        };

        var GetOrderDetail = function (order) {
            return $http({
                url: "Order/Get",
                method: 'GET',
                params: { order: order }
            });
        };

        var GetItems = function (OrderId) {
            return $http({
                url: "/Order/GetOrderedItems",
                method: 'GET',
                params: { OrderId: OrderId }
            });
        };


        var onError = function (response) {
            alert("hello error");
        };

        return {
            searchTask: searchTask,
            showAllTask: showAllTask,
            AddOrderDetail: AddOrderDetail,
            GetOrderDetail: GetOrderDetail,
            editTask: editTask,
            GetItems: GetItems,
            GetDuePaymentOrders: GetDuePaymentOrders
        };
    };


    var module = angular.module("OrderManager");
    module.factory("TaskOperations", TaskOperations);

}());