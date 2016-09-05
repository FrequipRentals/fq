
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

        //var showAllTask = function () {
        //    $http({
        //        url: "Order/GetAllOrders",
        //        method: 'JSONP'
        //    }).then(function (response) {
        //        return response;
        //    });
        //};

        //var showAllTask = function () {
        //    var url = "http://localhost/AngularPOCServices/api/Task";
        //    $http({
        //        method: 'JSONP',
        //        url: url
        //    }).
        //success(function (status) {
        //    //your code when success
        //}).
        //error(function (status) {
        //    //your code when fails
        //});


        //    //return $http.get('http://localhost/AngularPOCServices/api/Test');
        //   //return $http.get('http://localhost/AngularPOCServices/api/Task');
        //};
        var AddOrderDetail = function (OrderInfo) {
            return $http.post("/Order/AddOrderDetail", OrderInfo);
        };

        //var editTask = function (TaskInfo) {
        //    $http({
        //        url: "http://localhost/AngularPOCServices/api/Task/UpdateTask",
        //        method: 'POST',
        //        data: { task: JSON.stringify(TaskInfo) }
        //    }).success(function (response) {
        //        $scope.value = response.d;
        //    })
        //   .error(function (error) {
        //       alert(error);
        //   });
        //}

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

        //var getTasksList = function () {
        //    var data = showAllTask();
        //    data.success(function (response) { response }).
        //    error(function () { onError() });

        //};

        return {
            searchTask: searchTask,
            showAllTask: showAllTask,
            AddOrderDetail: AddOrderDetail,
            GetOrderDetail: GetOrderDetail,
            editTask: editTask,
            GetItems: GetItems
        };
    };


    var module = angular.module("OrderManager");
    module.factory("TaskOperations", TaskOperations);

}());