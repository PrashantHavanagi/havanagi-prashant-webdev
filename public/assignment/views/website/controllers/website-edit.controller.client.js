
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
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            //vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");

        };

        function updateWebsite (website) {
           // console.log("ho first");
            vm.website = WebsiteService.updateWebsite(vm.websiteId, website);
            $location.url("/user/"+vm.userId+"/website");
            console.log("hello");
        };
    }
})();

