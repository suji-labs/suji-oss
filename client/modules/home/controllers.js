'use strict';

angular.module('Home')

.controller('HomeController', ['$scope', '$rootScope',
  function($scope, $rootScope) {
    $scope.username = $rootScope.globals.currentUser.username;
  }
]);
