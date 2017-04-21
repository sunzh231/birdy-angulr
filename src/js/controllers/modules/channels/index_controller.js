'use strict';

/* User Controller */
app.controller('UserCtrl', ['$scope', function($scope) {
  console.log($scope.feilds);
  $scope.table_options = {
      sAjaxSource: 'api/datatable.json',
      aoColumns: [
        { mData: 'engine' },
        { mData: 'browser' },
        { mData: 'platform' },
        { mData: 'version' },
        { mData: 'grade' }
      ]
    }
}]);
