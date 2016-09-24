(function() {

  var myApp = angular.module('Category', []);

  myApp.controller('CategoryController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.now = new Date();
    $scope.username = $rootScope.globals.currentUser.username;

    var validate = function() {
      if ($scope.item.NAME === "")
        return false;
      return true;
    };

    var getStoreInfo = function() {
      $http.get('/api/v1.1/user/store/' + $scope.username).success(function(response) {
        $scope.store = response;
      });
    };
    getStoreInfo();

    var clear = function() {
      $scope.item = {
        name: ""
      };
    };

    var refresh = function() {
      $http.get('/api/v1.1/category').success(function(response) {
        $scope.itemlist = response;
      });
    };

    refresh();
    clear();

    $scope.addItem = function() {
      if (!validate()) return;

      $http.post('/api/v1.1/category/insert', $scope.item).then(
        function successCallback(response) {
          console.log(response);
          refresh();
        },
        function errorCallback(response) {
          console.log(response);
          alert(response.data.message);
        }
      );
      clear();
    };

    $scope.removeItem = function(name) {
      $http.post('/api/v1.1/category/delete', name).success(function(response) {
        if (response) console.log(response);
        refresh();
      });
    };
    
  }]);
})();
