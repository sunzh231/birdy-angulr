'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
        var layout = "tpl/app.html";
        $urlRouterProvider.otherwise('/app/users/index');

        $stateProvider.state('app', {
              abstract: true,
              url: '/app',
              templateUrl: layout
          }).state('app.custom_module', {
              url: '/custom_module',
              templateUrl: 'tpl/modules/custom_module.html',
              resolve: load(['js/controllers/chart.js'])
          }).state('app.index', {
              url: '/:target/index',
              templateUrl: function ($stateParams){
                return 'tpl/modules/'+ $stateParams.target +'/index.html';
              },
              resolve: {
                loadMyCtrl: ['$ocLazyLoad', '$stateParams', function($ocLazyLoad, $stateParams) {
                  return $ocLazyLoad.load('js/controllers/modules/'+ $stateParams.target +'/index_controller.js');
                }]
              }
          }).state('app.edit', {
              url: '/:target/edit',
              templateUrl: function ($stateParams){
                return 'tpl/modules/'+ $stateParams.target +'/edit.html';
              },
              resolve: {
                loadMyCtrl: ['$ocLazyLoad', '$stateParams', function($ocLazyLoad, $stateParams) {
                  return $ocLazyLoad.load('js/controllers/modules/'+ $stateParams.target +'/edit_controller.js');
                }]
              }
          }).state('app.detail', {
              url: '/:target/detail',
              templateUrl: function ($stateParams){
                return 'tpl/modules/'+ $stateParams.target +'/detail.html';
              },
              resolve: {
                loadMyCtrl: ['$ocLazyLoad', '$stateParams', function($ocLazyLoad, $stateParams) {
                  return $ocLazyLoad.load('js/controllers/modules/'+ $stateParams.target +'/detail_controller.js');
                }]
              }
          });

        function load(srcs, callback) {
          return {
            deps: ['$ocLazyLoad', '$q',
              function( $ocLazyLoad, $q ){
                var deferred = $q.defer();
                var promise  = false;
                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                if(!promise){
                  promise = deferred.promise;
                }
                angular.forEach(srcs, function(src) {
                  promise = promise.then( function(){
                    if(JQ_CONFIG[src]){
                      return $ocLazyLoad.load(JQ_CONFIG[src]);
                    }
                    angular.forEach(MODULE_CONFIG, function(module) {
                      if( module.name == src){
                        name = module.name;
                      }else{
                        name = src;
                      }
                    });
                    return $ocLazyLoad.load(name);
                  } );
                });
                deferred.resolve();
                return callback ? promise.then(function(){ return callback(); }) : promise;
            }]
          }
        }
      }
    ]
  );
