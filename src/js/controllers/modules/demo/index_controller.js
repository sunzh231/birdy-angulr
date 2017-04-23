'use strict';

/* User Controller */
app.controller('IndexCtrl', ['$scope','dialogs', function($scope, $dialogs) {
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
  $scope.launch = function(which){
    var dlg = null;
    switch(which){
      case 'error':
        dlg = $dialogs.error('This is my error message');
        break;
      case 'wait':
        dlg = $dialogs.wait(msgs[i++],progress);
        fakeProgress();
        break;
      case 'notify':
        dlg = $dialogs.notify('Something Happened!','Something happened that I need to tell you.');
        break;
      case 'confirm':
        dlg = $dialogs.confirm('Please Confirm','Is this awesome or what?');
        dlg.result.then(function(btn){
          $scope.confirmed = 'You thought this quite awesome!';
        },function(btn){
          $scope.confirmed = 'Shame on you for not thinking this is awesome!';
        });
        break;
      case 'create':
        dlg = $dialogs.create('/dialogs/whatsyourname.html','whatsYourNameCtrl',{},{key: false,back: 'static'});
        dlg.result.then(function(name){
          $scope.name = name;
        },function(){
          $scope.name = 'You decided not to enter in your name, that makes me sad.';
        });
        break;
    };
  };
}]);
