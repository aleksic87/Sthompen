/**
 * Created by Aleksic on 2017-01-06.
 */

var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.jimale = "JIMMIE";

    $scope.test = function() {
        if($scope.jimale === "JIMMIE")
            $scope.jimale = "ALEKSIC";
        else
            $scope.jimale = "JIMMIE";
    }

});

