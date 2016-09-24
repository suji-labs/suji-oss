(function() {

  var myApp = angular.module('Manage', []);

  // MANAGE VIEW
  myApp.controller('ManageController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.now = new Date();
    $scope.username = $rootScope.globals.currentUser.username;

    var validate = function() {
      if (($scope.item.NAME === "") || ($scope.item.PRICE === "") || ($scope.item.PRIME_COST === ""))
        return false;
      if ($scope.item.CATEGOTY_NAME === "") $scope.item.category = "None";

      return true;
    };

    var getStoreInfo = function() {
      $http.get('/api/v1.1/user/store/' + $scope.username).success(function(response) {
        $scope.store = response;
      });
    };
    getStoreInfo();

    var getCategories = function() {
      $http.get('/api/v1.1/category').success(function(response) {
        $scope.categories = response;
      });
    };
    getCategories();

    var clear = function() {
      $scope.item = {
        NAME: "",
        PRICE: "",
        PRIME_COST: "",
        CATEGOTY_NAME: "",
        TAX_MODE: false
      };
    };

    var refresh = function() {
      $http.get('/api/v1.1/menu').success(function(response) {
        $scope.itemlist = response;
      });
    };

    refresh();
    clear();

    $scope.addItem = function() {
      if (!validate()) return;

      $http.post('/api/v1.1/menu/insert', $scope.item).then(
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

    $scope.removeItem = function(name) {
      $http.post('/api/v1.1/menu/delete', name).then(
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
