(function () {
    angular
        .module("e-commerce")
        .factory("webservice", webservice);

    function webservice() {
        var species = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ]; //TODO : code to get data from DB.

        var api = {

            "searchSpecies":searchSpecies
        };
        return api;


        function searchSpecies(species, countryCode2) {
            for (var s in species) {
                if (species[s] == species) { //TODO : use search function ? if(search(species[s],species,countrycode2)
                    return species[s];
                }
            }
            return null;
        }
    }
})();
