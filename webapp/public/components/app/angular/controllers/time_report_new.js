///<reference path="../_all.ts"/>
"use strict";
var init_1 = require("../init");
var TimeReportNewController = (function () {
    function TimeReportNewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
        this.$scope = $scope;
        this.$location = $location;
        this.PageService = PageService;
        this.FlashService = FlashService;
        this.ProjectsService = ProjectsService;
        this.TimeReportsService = TimeReportsService;
        this.$routeParams = $routeParams;
        this.c = this;
        this.filterData = {};
        this.timeReportData = {};
        this.readableKeys = {
            name: 'Name',
            seconds: 'Hours',
            description: 'Name',
            date: 'Date',
        };
        PageService.resetData();
        PageService.setHtmlTitle('Projects');
        PageService.setSlug('projects');
        this.c.timeReportData.name = '';
        this.c.timeReportData.seconds = '';
        this.c.timeReportData.description = '';
        this.c.timeReportData.date = moment().format('YYYY-MM-DD');
        this.c.timeReportData.profile = $scope.globals.currentUser.profile.id;
        this.c.timeReportData.project = $routeParams.id;
        this.loadProject($routeParams.id);
        initUI();
    }
    TimeReportNewController.prototype.loadProject = function (id) {
        var _this = this;
        this.ProjectsService.GetProject(id)
            .then(function (project) {
            if (typeof project.id == 'number' && project.id > 0) {
                _this.c.getProject = project;
                _this.PageService.setHtmlTitle(project.name);
            }
            else {
                _this.$location.path('/404');
            }
        });
    };
    TimeReportNewController.prototype.create = function () {
        var _this = this;
        var messages = [];
        this.TimeReportsService.Create(this.c.timeReportData, function (response) {
            if (typeof response.id == 'number' && response.id > 0) {
                _this.FlashService.Success(['Time report has been successfully created.'], false);
                _this.$location.path('/projects/' + _this.$routeParams.id + '/time-reports');
            }
            else {
                var self_1 = _this;
                angular.forEach(response, function (value, key) {
                    messages.push(self_1.c.readableKeys[key] + ': ' + value);
                });
                _this.FlashService.Error(messages, false);
            }
        });
    };
    ;
    return TimeReportNewController;
}());
exports.TimeReportNewController = TimeReportNewController;
angular.module(init_1.Module).controller("TimeReportNewController", ['$rootScope',
    '$location',
    'PageService',
    'FlashService',
    'ProjectsService',
    'TimeReportsService',
    '$routeParams', NewTimeReportNewController]);
function NewTimeReportNewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
    return new TimeReportNewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams);
}
