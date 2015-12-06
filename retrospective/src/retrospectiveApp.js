var retrospectiveApp = angular.module('retrospectiveApp', ['ngRoute']);

retrospectiveApp.controller('retrospectivePostFeedbackController', function($scope, $http, $sce) {
  $scope.submitFeedback = function(pos) {
    if (angular.isDefined($scope.feedbackInput)) {
      $http({
        method: 'POST',
        data: {
          positive: pos,
          comment: $scope.feedbackInput
        },
        url: 'http://127.0.0.1:13371/feedback'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously when the response is available
        $scope.alert = $sce.trustAsHtml('<div class="alert alert-success" role="alert">Successfully saved!</div>');
        $scope.feedbackInput = undefined;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs or server returns response with an error status.
        $scope.alert = $sce.trustAsHtml('<div class="alert alert-danger" role="alert">Error saving data! Try again.</div>');
      });
    }
  };
});

retrospectiveApp.controller('retrospectiveGetFeedbackController', function($scope, $http, $sce) {
  $http({
    method: 'GET',
    url: 'http://127.0.0.1:13371/feedback'
  }).then(function successCallback(response) {
    var tableHtml = '';
    var arrayLength = response.data.length;
    for (var i = 0; i < arrayLength; i++) {
      var mood = 'Positive';
      if (response.data[i].positive === 0) {
        mood = 'Negative';
      }
      tableHtml += '<tr>';
      tableHtml += '<td>' + mood + '</td>';
      tableHtml += '<td>' + response.data[i].comment + '</td>';
      tableHtml += '</tr>';
    }
    $scope.feedbackTable = $sce.trustAsHtml(tableHtml);
  }, function errorCallback(response) {});
});

retrospectiveApp.config(function($routeProvider) {
  $routeProvider
    .when('/viewHome', {
      templateUrl: 'views/home.html',
      controller: 'retrospectivePostFeedbackController'
    })
    .when('/viewFeedback', {
      templateUrl: 'views/feedback.html',
      controller: 'retrospectiveGetFeedbackController'
    })
    .otherwise({
      redirectTo: '/viewHome'
    });
});
