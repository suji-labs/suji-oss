/**
 * Created by dk on 16. 1. 21.
 */
(function() {

  var myApp = angular.module('Statistics', []);

  // MANAGE VIEW
  myApp.controller('StatisticsController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.now = new Date();
    $scope.username = $rootScope.globals.currentUser.username;

    var getStoreInfo = function() {
      $http.get('/api/v1.1/user/store/' + $scope.username).success(function(response) {
        $scope.store = response;
      });
    };
    getStoreInfo();

    var clear = function() {
      $scope.item = {
        DATE: "",
        TOTAL: ""
      };
    };

    var refresh = function() {
      $http.get('/api/v1.2/stats/daily').success(function(response) {
        $scope.itemlist = response.results;
        console.log($scope.itemlist);
      });
    };

    refresh();
    clear();
  }]);
})();
