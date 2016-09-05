(function () {

    var app = angular.module("mainApp", ["ngRoute", "OrderManager", 'ui.grid', 'ui.grid.edit']);

    app.directive('calendar', function () {
        return {
            require: 'ngModel',
            link: function (scope, el, attr, ngModel) {
                $(el).datepicker({
                    dateFormat: 'yy-mm-dd',
                    onSelect: function (dateText) {
                        scope.$apply(function () {
                            ngModel.$setViewValue(dateText);
                        });
                    }
                });
            }
        };
    })

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/Task", {
                templateUrl: "App/Modules/OrderManager/Views/AddTask.html",
                controller: "AddTaskController"
            })
            .when("/", {
                templateUrl: "App/Modules/OrderManager/Views/Display.html",
                controller: "OrderController"
            })
            .when("/EditTask/:oInfo", {
                templateUrl: "App/Modules/OrderManager/Views/AddTask.html",
                controller: "AddTaskController"
            })
            .otherwise({ redirectTo: "/" });

    });
}());