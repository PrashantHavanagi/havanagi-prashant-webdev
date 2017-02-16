(function () {
    angular
        .module("WebAppMaker")
        .controller("myController", myController);

    function myController() {
        var vm = this;
        vm.hello = "hello there";
    }
})();