module.exports = function (app) {
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
    ];

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        for(var w in websites) {
            if(websiteId === websites[w]._id) {
                //return angular.copy(websites[w]);
                res.send(websites[w]);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createWebsite(req, res) {
        var website = req.body;
        website.developerId = req.params['userId'];
        website._id = (new Date()).getTime().toString();
        websites.push(website);
        res.json(website);
    }


    function updateWebsite(req, res){
        var websiteId = req.params['websiteId'];
       // var website = req.params['website'];
        for(var w in websites) {
            if( websites[w]._id == websiteId ) {

                var newWebsite = req.body; //or req.website
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.json(newWebsite);
                return;
            }
        }
        res.sendStatus(404);
    }
};