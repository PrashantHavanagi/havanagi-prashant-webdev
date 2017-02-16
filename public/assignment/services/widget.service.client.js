(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ]
            ;

        var api = {
            "findAllWidgets" : findAllWidgets,
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function findAllWidgets(pageId) {
            return widgets;
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function updateWidget(widgetId, newWidget){
            for(w in widgets){
                widget = widgets[w];
                if(widget._id === widgetId){
                    switch(widget.widgetType){
                        case "HEADER":
                            widget.text = newWidget.text;
                            widget.size = newWidget.size;
                            break;
                        case "IMAGE":
                            widget.width = newWidget.width;
                            widget.url = newWidget.url;
                            break;
                        case "YOUTUBE":
                            widget.width = newWidget.width;
                            widget.url = newWidget.url;
                            break;
                        case "HTML":
                            widget.text = newWidget.text;
                            break;
                    }
                }
            }
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function findWidgetsByPageId(pageId) {
            var widgetsforPage = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    widgetsforPage.push(widgets[w]);
                }
            }
            return widgetsforPage;
        }

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            switch(widget.widgetType){
                case "HEADER":
                    widget.text = "Default Text";
                    widget.size = 3;
                    break;
                case "IMAGE":
                    widget.width = "100%";
                    widget.url = "http://lorempixel.com/";
                    break;
                case "YOUTUBE":
                    widget.width = "100%";
                    widget.url = "http://lorempixel.com/";
                    break;
                case "HTML":
                    widget.text = "Default Text";
                    break;
            }
            widgets.push(widget);
        }
    }
})();