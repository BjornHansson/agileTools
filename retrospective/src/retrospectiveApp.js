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
        url: 'http://127.0.0.1:8585/feedback'
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
    url: 'http://127.0.0.1:8585/feedback'
  }).then(function successCallback(response) {}, function errorCallback(response) {});
});

retrospectiveApp.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'retrospectivePostFeedbackController'
    })
    .when('/feedback', {
      templateUrl: 'views/feedback.html',
      controller: 'retrospectiveGetFeedbackController'
    })
    .otherwise({
      redirectTo: '/home'
    });
});
