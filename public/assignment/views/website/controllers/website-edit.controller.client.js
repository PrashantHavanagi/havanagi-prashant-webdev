(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        //event handlers
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId)
            .success(function (websites) {
                vm.websites=websites;
            })
            var promise = WebsiteService.findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website=website;
                })
            //vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }

        init();

        function deleteWebsite() {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if (answer) {
                WebsiteService
                    .deleteWebsite(vm.websiteId)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });

            }
        }
            function updateWebsite(website) {
                // console.log("ho first");
                WebsiteService
                    .updateWebsite(vm.websiteId, website)
                    .success(function (website) {
                        $location.url("/user/" + vm.userId + "/website");
                        })
                    .error(function (err) {
                        vm.error = "unable to update user";
                    });
            };
        }

})();

