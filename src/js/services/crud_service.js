'use strict';

angular.module('app', []).service('CrudService',
  ['$resource', '$document', '$q', '$timeout', function ($resource, $document, $q, $timeout) {
    var service = {
    getAll: function(url){
      $rootScope.entities = [];
      $http.post(url).success(function(data){
        if(data){
          $rootScope.$broadcast('data.list',data);
          $rootScope.entities = data;
        }
      });
    },
    get : function(url){
      $http.get(url).success(function(data){
        if(data && data.success){
          $rootScope.$broadcast('entity.got', data.data);
        }else{
          alert(data.data);
        }
      });
    },
    delete : function(url, callback) {
      $http.get(url).success(function(data){
          if(data && data.success){
            callback();
            alert('删除成功!');
          }
        });
    },
    batchDelete : function(url){
      $http.get(url).success(function(data){
          if(data && data.success){
            $rootScope.$broadcast('data.batchRemove');
              alert('批量删除成功！');
          }
        });
    },
    create : function(url, entity){
      $http.post(url, entity).success(function(data){
          if(data && data.success){
            alert("数据添加成功！");
            entity=null;
            $rootScope.$broadcast('data.saveSuccess',data);
          }else{
            alert("数据添加出错,错误原因为：" + data && data.data ? data.data : "未知");
          }
        });
    },
    update:function(url){
      $http.post(url).success(function(data){
        if(data && data.success){
          alert("数据编辑成功！");
          $rootScope.$broadcast('data.saveSuccess');
        }else{
          alert("数据编辑出错,错误原因为：" + data && data.data ? data.data : "未知");
        }
      });
    }
  };

  return service;
}]);
