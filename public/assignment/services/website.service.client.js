(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
        ];
        // TODO: complete website crud functions
        this.createWebsite = createWebsite;
        this.findAllWebsites = findAllWebsites;
        this.findWebsiteById = findWebsiteById;
        this.findAllWebsitesForUser=findAllWebsitesForUser;
        this.deleteWebsite=deleteWebsite;
        this.updateWebsite=updateWebsite;

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websiteId === websites[w]._id) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function findAllWebsites(userId) {
            var sites = [];
            for(var w in websites) {
                if(userId === websites[w].developerId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                }
            }
        }

        function createWebsite(userId, website) {
            website.developerId = userId;
            website._id = (new Date()).getTime().toString();
            websites.push(website);
        }

        function findAllWebsitesForUser(userId) {
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function updateWebsite(websiteId, website){
            for(var w in websites) {
                if( websites[w]._id == websiteId ) {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return websites[w];
                }
            }
        }
    }
})();