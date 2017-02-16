(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, UserService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        var userId = $routeParams['uid'];

        function init() {
            var user = UserService.findUserById(userId);
            vm.user = user;
        }
        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user != null) {
                vm.message = "User Successfully Updated!"
            } else {
                vm.error = "Unable to update user";
            }
        }

        function deleteUser(userId) {
            var users = UserService.deleteUser(userId);
            vm.users = users;
            if (users != null) {
                vm.message = "User Successfully Deleted!"
            } else {
                vm.error = "Unable to delete user";
            }
        }

        }
})();