(function() {

  var myApp = angular.module('Purchase', []);

  // MANAGE VIEW
  myApp.controller('PurchaseController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
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
        NAME: "",
        PRICE: "",
        QUANTITY: "",
        TOTAL_PRICE: "",
        PURCHASE_TIME: false
      };
    };

    var refresh = function() {
      $http.get('/api/v1.1/purchase/' + $scope.username).success(function(response) {
        $scope.itemlist = response;
        console.log($scope.itemlist);
      });
    };

    refresh();
    clear();

    $scope.removeItem = function(name) {
      $http.post('/api/v1.1/purchase/delete', name).then(
        function successCallback(response) {
          console.log(response);
          refresh();
        },
        function errorCallback(response) {
          alert(response.data.message);
        }
      );
      clear();
    };
  }]);
})();
