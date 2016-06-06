'use strict';

(function() {

    class MainController {

        constructor($http, $scope, socket) {
            this.$http = $http;
            this.awesomeThings = [];

            $http.get('/api/tweets').then(response => {
                console.log(response.data);
            }, (responseError) => {
                console.log(responseError);
            });

            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('thing');
            });
        }

        addThing() {
            if (this.newThing) {
                this.$http.post('/api/things', { name: this.newThing });
                this.newThing = '';
            }
        }

        deleteThing(thing) {
            this.$http.delete('/api/things/' + thing._id);
        }
    }

    angular.module('websiteApp')
        .controller('MainController', MainController);

})();