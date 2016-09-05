
(function () {
    var module = angular.module("OrderManager");

    var OrderController = function ($scope, TaskOperations, $location) {

        $scope.message = "Angular POC";
       

        var GetAllTasks = function (response) {
            $scope.Orders = JSON.parse(response.data);
        };

        //function GetAllBooks() {
        //    debugger;
        //    var getBookData = crudAJService.getBooks();
        //    getBookData.then(function (book) {
        //        $scope.books = book.data;
        //    }, function () {
        //        alert('Error in getting book records');
        //    });
        //}

        
        //$scope.myData = [{ userid: 1, username: "suresh dasari", branch: "B.tech" },
        //    { userid: 2, username: "Rohini Dasari", branch: "Msc" },
        //    { userid: 3, username: "Praveen Aalvala", branch: "B.Tech" },
        //    { userid: 4, username: "Madhav Sai", branch: "MBA" },
        //    { userid: 5, username: "Sateesh Alavala", branch: "MD" },
        //    { userid: 6, username: "Mahendra Dasari", branch: "CA" }];
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
            //$scope.Action = "Delete";

            TaskOperations.deleteTask(TaskInfo).then(GetAllTasks, onError);
        }

        TaskOperations.showAllTask().then(GetAllTasks, onError);


        $scope.search = function (GeneratedBy) {
            TaskOperations.searchTask(GeneratedBy)
                           .then(GetTasks, onError);
        };

        //    $scope.myData = [
        //{
        //    "firstName": "Cox",
        //    "lastName": "Carney",
        //    "company": "Enormo",
        //    "employed": true
        //},
        //{
        //    "firstName": "Lorraine",
        //    "lastName": "Wise",
        //    "company": "Comveyer",
        //    "employed": false
        //},
        //{
        //    "firstName": "Nancy",
        //    "lastName": "Waters",
        //    "company": "Fuelton",
        //    "employed": false
        //}
        //    ];

        // Another way to call parameterized function in web api. 
        // $http.get("http://localhost/AngularPOCServices/api/Task?taskCreator=" + GeneratedBy)
        //         .then(GetTasks, onError);
    };

    module.controller("OrderController", OrderController);
}());
