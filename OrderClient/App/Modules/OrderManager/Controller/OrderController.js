
(function () {
    var module = angular.module("OrderManager");

    var OrderController = function ($scope, TaskOperations, $location) {

        $scope.message = "Order Client";


        var GetAllTasks = function (response) {
            $scope.Orders = JSON.parse(response.data);
        };

        $scope.gridOptions = {
            enableSorting: true,
            columnDefs: [
              { name: 'Order Id', field: 'OrderId', enableCellEdit: false },
              { name: 'First Name', field: 'Name', enableCellEdit: false },
              { name: 'Rent Amount', field: 'RentAmt', enableCellEdit: false },
              { name: 'Security Deposit', field: 'SecurityDeposit', enableCellEdit: false },
              { name: 'OrderDate', field: 'OrderDate', enableCellEdit: false, cellTemplate: '<span> {{row.entity.OrderDate | date:\'dd-MMM-yyyy\'}}</span>' },
              { name: 'ContactNo', field: 'ContactNo', enableCellEdit: false },
              { name: 'Address', field: 'Address', enableCellEdit: false },
              {
                  name: 'Edit', field: 'OrderId',
                  cellEditableCondition: false,
                  cellTemplate: '<button ng-click="grid.appScope.editTask(row.entity)"> Edit Order </button>'
              },
              {
                  name: 'Delete', field: 'OrderId',
                  cellEditableCondition: false,
                  cellTemplate: '<button class="btn primary" ng-click="grid.appScope.deleteTask(row.entity)"> Delete Order </button>'
              }
            ],
            data: 'Orders'
        };


        var GetTasks = function (response) {
            $scope.Tasks = response.data;
        };

        var onError = function (response) {
            $scope.error = "Could not find Orders";
        };

        $scope.addTaskView = function () {
            $scope.Action = "Add";
            $location.path("/Task");
        }

        $scope.editTask = function (OrderInfo) {
            $scope.Action = "Update";
            var oInfo = OrderInfo.OrderId;
            $location.path("/EditTask/" + oInfo);
        }

        $scope.deleteTask = function (TaskInfo) {
            TaskOperations.deleteTask(TaskInfo).then(GetAllTasks, onError);
        }

        $scope.search = function (GeneratedBy) {
            TaskOperations.searchTask(GeneratedBy)
                           .then(GetTasks, onError);
        };

        $scope.GetDuePaymentOrders = function () {
            TaskOperations.GetDuePaymentOrders().then(GetAllTasks, onError);
        }

        TaskOperations.showAllTask().then(GetAllTasks, onError);
    };

    module.controller("OrderController", OrderController);
}());
