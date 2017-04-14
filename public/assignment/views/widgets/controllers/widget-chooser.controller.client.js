(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        //Event Handler
        vm.createWidget = createWidget;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
        }
        init();

        function createWidget(widgetType) {
            newWidget = {};
            //newWidget._id = (new Date()).getTime().toString();
            newWidget.type = widgetType;
            newWidget.pageId = vm.pageId;
            switch (widgetType) {
                case "HEADER":
                    newWidget.text = "Default Text";
                    newWidget.size = 3;
                    break;
                case "IMAGE":
                    newWidget.url = "https://i.ytimg.com/vi/fFi4BhD_DUw/maxresdefault.jpg";
                    newWidget.width = "100%";
                    break;
                case "YOUTUBE":
                    newWidget.url = "https://youtu.be/AM2Ivdi9c4E";
                    newWidget.width = "100%";
                    break;
                case "HTML":
                    newWidget.text = "Default Text";
                    break;
                case "TEXT":
                    newWidget.text = "Default Text";
                    newWidget.rows = 1;
                    newWidget.placeholder = "enter some text";
                    newWidget.formatted = false;
                    break;
            }
            WidgetService.createWidget(vm.pageId, newWidget).success(function (widget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
            });
        }

        function uploadImage(){
            //console.log("HAHAHA");
            return $http.post("/api/upload");
        }

    }
})();