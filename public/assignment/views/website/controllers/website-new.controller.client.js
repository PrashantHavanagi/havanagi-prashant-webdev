
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        //event handlers
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId)
            .success(function (websites) {
                vm.websites=websites;
            });

        }
        init();

        function createWebsite (website) {
            WebsiteService
                .createWebsite(vm.userId, website)
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
                    .success(function(website){
                         $location.url("/user/"+vm.userId+"/website");
            });

        }
    }
})();



