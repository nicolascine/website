'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TwitsSchema = new mongoose.Schema({
    text: String,
    created_at: Date,
    twit_id: String,
    user_id: String,
    user_screen_name: String,
    user_lang: String,
    user_followers_count: String
});

export default mongoose.model('Twits', TwitsSchema);