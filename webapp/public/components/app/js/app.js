/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(7);
	module.exports = __webpack_require__(8);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	///<reference path="_all.ts"/>
	var App;
	(function (App) {
	    App.Module = "app";
	    angular.module(App.Module, [
	        'ngRoute',
	        'ngCookies',
	        'angular-jwt',
	        'environment',
	        'angularMoment'
	    ])
	        .constant('config', {
	        appTitle: 'MTR Design Projects'
	    })
	        .config([
	        '$routeProvider',
	        '$locationProvider',
	        'envServiceProvider',
	        function ($routeProvider, $locationProvider, envServiceProvider) {
	            'use strict';
	            envServiceProvider.config({
	                domains: {
	                    development: ['mtr-time-tracker.dev'],
	                    production: ['mtr-time-tracker.aws.mtrdev.com']
	                },
	                vars: {
	                    development: {
	                        apiUrl: '//127.0.0.1:8000/time-tracker/api'
	                    },
	                    production: {
	                        apiUrl: '//api.mtr-time-tracker.aws.mtrdev.com/time-tracker/api'
	                    }
	                }
	            });
	            envServiceProvider.check();
	            $routeProvider
	                .when('/account', {
	                controller: 'AccountController',
	                templateUrl: 'components/app/angular/views/account.html',
	                controllerAs: 'c'
	            })
	                .when('/projects/:id/time-reports', {
	                controller: 'ProjectController',
	                templateUrl: 'components/app/angular/views/project.html',
	                controllerAs: 'c'
	            })
	                .when('/projects/:id/time-reports/new', {
	                controller: 'TimeReportNewController',
	                templateUrl: 'components/app/angular/views/time-reports/new.html',
	                controllerAs: 'c'
	            })
	                .when('/projects/:project_id/time-reports/:id', {
	                controller: 'TimeReportEditController',
	                templateUrl: 'components/app/angular/views/time-reports/edit.html',
	                controllerAs: 'c'
	            })
	                .when('/projects/:project_id/time-reports/:id/view', {
	                controller: 'TimeReportViewController',
	                templateUrl: 'components/app/angular/views/time-reports/view.html',
	                controllerAs: 'c'
	            })
	                .when('/time-reports', {
	                controller: 'TimeReportListController',
	                templateUrl: 'components/app/angular/views/time-reports/list.html',
	                controllerAs: 'c'
	            })
	                .when('/time-reports?from&to', {
	                controller: 'TimeReportListController',
	                templateUrl: 'components/app/angular/views/time-reports/list.html',
	                controllerAs: 'c'
	            })
	                .when('/404', {
	                controller: 'NotFoundController',
	                templateUrl: 'components/app/angular/views/404.html',
	                controllerAs: 'c'
	            })
	                .when('/login', {
	                controller: 'LoginController',
	                templateUrl: 'components/app/angular/views/login.html',
	                controllerAs: 'c'
	            })
	                .otherwise({ redirectTo: '/404' });
	        }]).run([
	        '$location',
	        '$cookieStore',
	        '$http',
	        'config',
	        'envService',
	        // 'AuthenticationService',
	        // 'PageService',
	        function ($location, $cookieStore, $http) {
	            // globalScope.globals = $cookieStore.get('globals') || {};
	            // if (globalScope.globals.currentUser) {
	            //     AuthenticationService.SetCredentials(globalScope.globals.currentUser.token, function (response) {
	            //         if (typeof response.success != 'boolean' ||
	            //             typeof response.success == 'boolean' && response.success == false) {
	            //             $location.path('/login');
	            //         }
	            //     });
	            //     $http.defaults.headers.common.Authorization = 'JWT ' + globalScope.globals.currentUser.token;
	            // }
	            // globalScope.$on('$locationChangeStart', function (event, next, current) {
	            //     var restrictedPage = $.inArray($location.path(), ['/login', '/404']) === -1;
	            //     if (restrictedPage && !globalScope.globals.currentUser) {
	            //         $location.path('/login');
	            //     }
	            // });
	        }
	    ]);
	})(App || (App = {}));
	//# sourceMappingURL=init.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	///<reference path="../_all.ts"/>
	var App;
	(function (App) {
	    'use strict';
	    var PageService = (function () {
	        function PageService(config) {
	            this.config = config;
	        }
	        PageService.prototype.resetData = function () {
	            this.service.website_title = this.config.appTitle;
	            this.service.html_title = this.config.appTitle;
	            this.service.slug = '';
	        };
	        PageService.prototype.setHtmlTitle = function (html_title) {
	            this.service.html_title = html_title + ' | ' + this.service.html_title;
	        };
	        PageService.prototype.setSlug = function (slug) {
	            this.service.slug = slug;
	        };
	        PageService.id = "PageService";
	        PageService.$inject = [
	            "config",
	            "$http"
	        ];
	        return PageService;
	    }());
	    App.PageService = PageService;
	    angular.module(App.Module)
	        .factory(PageService.id, PageService);
	})(App || (App = {}));
	//# sourceMappingURL=page.js.map

/***/ }
/******/ ]);