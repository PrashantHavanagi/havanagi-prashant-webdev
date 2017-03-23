module.exports = function (app,widgetModel) {
    app.get("/api/widget/:widgetId", findWidgetById);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/page/:pid/widget", updateWidgetOrder);

    var multer = require('multer'); // npm install multer --save
    var fs = require("fs");
    var uploadsDirectory = __dirname+"/../../public/uploads";
    var publicDirectory =__dirname+"/../../public";
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if(!fs.existsSync(uploadsDirectory)){

                console.log("Going to create directory "+uploadsDirectory);
                fs.mkdir(uploadsDirectory, function(err){
                    if (err) {
                        return console.error(err);
                    }
                    console.log("Directory created successfully!");
                });
            }
            cb(null, uploadsDirectory);
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now()+ '.' +extension)
        }
    });
    var upload = multer({storage: storage});
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res){
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var pageId = req.body.pageId;
        var imageWidget = {
            width: width,
            _id:widgetId
        };

        if(req.file){
            // Make sure file was uploaded
            var myFile = req.file;
            var originalname = myFile.originalname;
            var filename = myFile.filename;
            var path = myFile.path;
            var destination = myFile.destination;
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            if(imageWidget.url){

                deleteUploadedImage(imageWidget.url);
            }
            imageWidget.url = "/uploads/" + filename;

            widgetModel
                .updateWidget(widgetId, imageWidget)
                .then(function (response) {
                    if(response.ok === 1 && response.n === 1){

                        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                    }
                    else{
                        res.sendStatus(404);
                    }
                }, function (err) {
                    res.sendStatus(404);
                });

        }
        else{

            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(function (response) {
                if (response.result.n==1 && response.result.ok==1){
                    res.sendStatus(200);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;


        widgetModel
            .createWidget(pageId,widget)
            .then(function (widget) {
                res.json(widget);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUploadedImage(imageUrl) {
        // Local helper function
        if(imageUrl && imageUrl.search('http') == -1){

            fs.unlink(publicDirectory+imageUrl, function (err) {
                if(err){

                    return;
                }

            });
        }
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets)
            },function (err) {
                res.sendStatus(404);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget)
            },function (err) {
                res.sendStatus(404);
            });
    }

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pid;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);

        widgetModel
            .reorderWidget(pageId, startIndex, endIndex)
            .then(function (response) {

                res.sendStatus(response);
            }, function (err) {
                res.sendStatus(404);
            });
    }

};