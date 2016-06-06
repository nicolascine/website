'use strict';

var _env = require('../config/local.env.js');
var _ = require('lodash');
var path = require('path');
var Twit = require('twit');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

// Connect to MongoDB
mongoose.connect(_env.TWITTER_MONGO_STORAGE);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

var fs = require('fs');

var T = new Twit({
    consumer_key: _env.TWITTER_CONSUMER_KEY,
    consumer_secret: _env.TWITTER_CONSUMER_SECRET,
    access_token: _env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: _env.TWITTER_ACCESS_TOKEN_SECRET,
    //timeout_ms: 60 * 1000,
});

//Mongoose Model
var TwitSchema = new mongoose.Schema({
    text: String,
    created_at: Date,
    twit_id: String,
    user_id: String,
    user_screen_name: String,
    user_lang: String,
    user_followers_count: String
});

var Twits = mongoose.model('Twits', TwitSchema);

//Save relevant tweet data
function saveTwit(tweet) {

    var twiit = new Twits({
        text: tweet.text,
        created_at: tweet.created_at,
        twit_id: tweet.id,
        user_id: tweet.user.id,
        user_screen_name: tweet.user.screen_name,
        user_lang: tweet.user.lang,
        user_followers_count: tweet.user.followers_count
    });

    twiit.saveAsync()
        .spread(function(savedTwit, numAffected) {
            console.log(JSON.stringify(savedTwit));
        })
        .catch(function(err) {
            console.log("There was an error");
        })
}

var stream = T.stream('statuses/filter', {
    track: [
        '#dataviz', 
        'datavis', 
        'data visualization', 
        'visualizacion de datos', 
        '#datavis'
    ]
})

stream.on('tweet', function(tweet) {
    saveTwit(tweet);
})
