module.exports = function (app,pageModel) {
    app.get("/api/page/:pageId", findPageById);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (response) {
                if(response.result.n==1 && response.result.ok==1){
                    res.sendStatus(200);
                }
                else
                {
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });

    }

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params['websiteId'];
        pageModel
            .createPage(websiteId,page)
            .then(function (page) {
                res.json(page);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var update = req.body;
        pageModel
            .updatePage(pageId,update)
            .then(function (response) {
                if (response.ok == 1 && response.n == 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });

    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['websiteId'];

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);

            },function (err) {
                res.sendStatus(404);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }

};