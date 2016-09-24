(function() {
  var myApp = angular.module('Employee', []);

  myApp.controller('EmployeeController', ['$scope', '$http', '$rootScope', 'fileUpload', function($scope, $http, $rootScope, fileUpload) {
    $scope.now = new Date();
    $scope.username = $rootScope.globals.currentUser.username;

    var validate = function() {
      
      console.log($scope.myFile);
      if (($scope.newEmployee.id === "") || ($scope.newEmployee.title === "") || ($scope.newEmployee.name === "") || ($scope.myFile == undefined))
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
      $scope.newEmployee = {
        id: "",
        title: "",
        name: "",
        employer: $scope.username
      };
    };

    // Initialize values for table sorting
    $scope.orderByField = 'id';
    $scope.reverseSort = false;
    $scope.titles = [
      'Manager',
      'Part-timer'
    ];

    $scope.model = {
      employees: [],
      selected: {},
    };

    var refresh = function() {
      $http.get('/api/v1.2/employee').success(function(response) {
        $scope.model.employees = response;
      });
    };
    refresh();
    clear();


    $scope.addEmployee = function(newEmployee) {
      
      if (!validate()) return;
      console.log(newEmployee);


      $http.post('/api/v1.2/employee/insert', newEmployee).then(
        function successCallback(response) {
          console.log(response);
          //upload profile
          var file = $scope.myFile;
          var uploadUrl = "/api/v1.2/employee/profile/" + newEmployee.id;
          fileUpload.uploadFileToUrl(file, uploadUrl, function(isSuccess){
            if(isSuccess == 'success'){
              refresh();
            }
          });

        },
        function errorCallback(response) {
          console.log(response);
          alert(response.data.message);
        }
      );
    };

    $scope.deleteEmployee = function(employee) {
      $http.post('/api/v1.2/employee/delete', employee).then(
        function successCallback(response) {
          console.log(response);
          refresh();
        },
        function errorCallback(response) {
          console.log(response);
          alert(response.data.message);
        }
      );
    };

    $scope.setOrderBy = function(value) {
      $scope.orderByField = value;
      $scope.reverseSort = !$scope.reverseSort;
    };

    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function(employee) {
      if (employee.ID === $scope.model.selected.ID) {
        return 'edit';
      }
      else {
        return 'display';
      }
    };

    $scope.editContact = function(employee) {
      $scope.model.selected = angular.copy(employee);
    };

    $scope.saveContact = function(idx, ID) {
      console.log($scope.model.selected);
      $http.post('/api/v1.2/employee/update', $scope.model.selected).then(
        function successCallback(response) {
          console.log(response);
          refresh();
        },
        function errorCallback(response) {
          console.log(response);
          alert(response.data.message);
        }
      );
      $scope.reset();
      clear();
    };

    $scope.reset = function() {
      $scope.model.selected = {};
    };

    // Build in search inside the scope
    $scope.search = function(value, index) {
      if (!$scope.searchText) {
        return true;
      }
      return value.lname.indexOf($scope.searchText) > -1;
    };


    //Employee Profile
    var $dropzone = $('.image_picker');
    var $droptarget = $('.drop_target');
    var $dropinput = $('#inputFile');
    var $dropimg = $('.image_preview');
    var $remover = $('[data-action="remove_current_image"]');

    $dropzone.on('dragover', function() {
      $droptarget.addClass('dropping');
      return false;
    });

    $dropzone.on('dragend dragleave', function() {
      $droptarget.removeClass('dropping');
      return false;
    });

    $dropzone.on('drop', function(e) {
      $droptarget.removeClass('dropping');
      $droptarget.addClass('dropped');
      $remover.removeClass('disabled');
      e.preventDefault();

      var file = e.originalEvent.dataTransfer.files[0],
        reader = new FileReader();

      reader.onload = function(event) {
        $dropimg.css('background-image', 'url(' + event.target.result + ')');
      };

      console.log(file);
      reader.readAsDataURL(file);

      return false;
    });

    $dropinput.change(function(e) {
      $droptarget.addClass('dropped');
      $remover.removeClass('disabled');
      $('.image_title input').val('');

      var file = $dropinput.get(0).files[0],
        reader = new FileReader();

      reader.onload = function(event) {
        $dropimg.css('background-image', 'url(' + event.target.result + ')');
      }
      reader.readAsDataURL(file);
    });

    $remover.on('click', function() {
      $dropimg.css('background-image', '');
      $droptarget.removeClass('dropped');
      $remover.addClass('disabled');
      $('.image_title input').val('');
    });

    $('.image_title input').blur(function() {
      if ($(this).val() != '') {
        $droptarget.removeClass('dropped');
      }
    });
    ////

  }]);
  // Custom search func
  myApp.filter('searchBy', [function() {
    return function(arr, searchText, prop) {
      if (!searchText) {
        return arr;
      }
      return arr.filter(function(item) {
        return item[prop].indexOf(searchText) > -1;
      });
    };
  }]);

  myApp.service('fileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl, callback) {
      var fd = new FormData();
      fd.append('file', file);
      console.log(uploadUrl);
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }).then(
        function successCallback(response) {
          console.log(response);
          callback('success');
        },
        function errorCallback(response) {
          console.log(response);
          callback('fail');
          alert(response.data.message);
        }
      );
    }
  }]);

  myApp.directive('fileModel', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function() {
          scope.$apply(function() {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);

})();
