'use strict';

(function() {

    class MainController {

        constructor($http, $scope, socket) {
            this.$http = $http;
            this.awesomeTwits = [];
            this.socket = socket;
            this.currentFirstTwit = null;
            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('thing');
            });

            // get first list of twits ~
            this.getTwits();
        }

        getTwits() {
            this.$http({
                url: '/api/twitss',
                method: 'GET',
                params: { currentFirstTwit: this.currentFirstTwit }
            }).then(response => {
                this.awesomeTwits = response.data;
            });
        }

        deleteThing(thing) {
            this.$http.delete('/api/things/' + thing._id);
        }
    }

    angular.module('websiteApp')
        .controller('MainController', MainController);

})();
