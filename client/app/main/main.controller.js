'use strict';

(function() {

    class MainController {

        constructor($http, $scope, socket, $mdSidenav) {
            this.$http = $http;
            this.awesomeTwits = [];
            this.socket = socket;
            this.twitLimit = 100;
            this.lastTwit = 0;
            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('thing');
            });

            // get first list of twits ~
            this.getTwits();

            $scope.getTwits = () => {
                this.getTwits();
            }

            $scope.toggleSidenav = (menuId) => {
                $mdSidenav(menuId).toggle();
            }


        }

        getTwits() {
            this.$http({
                url: '/api/twitss',
                method: 'GET',
                params: {
                    twitLimit: this.twitLimit,
                    lastTwit: this.lastTwit
                }
            }).then(response => {
                this.awesomeTwits = response.data;
                this.lastTwit = _.last(this.awesomeTwits)._id;
            });
        }

        deleteThing(thing) {
            this.$http.delete('/api/things/' + thing._id);
        }


    }

    angular.module('websiteApp')
        .controller('MainController', MainController);

})();
