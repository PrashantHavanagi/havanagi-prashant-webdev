(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebSiteListController);

    function WebSiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            var userId = $routeParams.uid;
            vm.userId = userId;
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites
                });
        }
        init();
    }
})();
