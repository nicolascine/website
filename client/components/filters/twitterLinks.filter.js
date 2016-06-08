'use strict';

angular.module('twitterLinks', []).filter('twitterLinks', function() {
    return function(input) {
        var base_url = 'http://twitter.com/';
        var hashtag_part = 'search?q=#';
        var output = input;
        // convert URLs into links
        output = output.replace(
            /(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi,
            function($0, $1, $2) {
                return ($1 ? $0 : '<a href="' + $2 + '" target="_blank">' + $2 + '</a>');
            });
        // convert protocol-less URLs into links        
        output = output.replace(
            /(:\/\/|>)?\b(([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.]*[^ !#?().,])?)/gi,
            function($0, $1, $2) {
                return ($1 ? $0 : '<a href="http://' + $2 + '">' + $2 + '</a>');
            });
        // convert @mentions into follow links
        output = output.replace(
            /(:\/\/|>)?(@([_a-z0-9\-]+))/gi,
            function($0, $1, $2, $3) {
                return ($1 ? $0 : '<a href="' + base_url + $3 + '" title="Follow ' + $3 + '" target="_blank">@' + $3 + '</a>');
            });
        // convert #hashtags into tag search links
        output = output.replace(
            /(:\/\/[^ <]*|>)?(\#([_a-z0-9\-]+))/gi,
            function($0, $1, $2, $3) {
                return ($1 ? $0 : '<a href="' + base_url + hashtag_part + $3 + '" title="Search tag: ' + $3 + '" target="_blank">#' + $3 + '</a>');
            });
        return output;
    }
});
