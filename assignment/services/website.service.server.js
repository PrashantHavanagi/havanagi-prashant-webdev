module.exports = function (app,websiteModel) {
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.sendStatus(404);

            });

    }

    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.sendStatus(404);

            });
}

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (response) {
                if (response.result.n == 1 && response.result.ok == 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);

            });
    }


    function createWebsite(req, res) {
        var website = req.body;
        var developerId = req.params['userId'];
       // website._id = (new Date()).getTime().toString();

        websiteModel
            .createWebsiteForUser(developerId,website)
            .then(function (nwebsite) {
                res.json(nwebsite);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var update = req.body;
        websiteModel
            .updateWebsite(websiteId, update)
            .then(function (response) {
                if (response.ok == 1 && response.n == 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }

            }, function (err) {
                res.sendStatus(404);
            });
    }

};