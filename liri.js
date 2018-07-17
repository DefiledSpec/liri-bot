'use strict'

require('dotenv').config();
const keys = require('./keys');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const fs = require('fs');
const MyLogger = require('./logging/MyLogger')
const Log = require('./logging/Log')

const myLogger = new MyLogger()

const spotify = new Spotify(keys.spotify);
const twitter = new Twitter(keys.twitter);

const consoleArgs = process.argv;
const command = process.argv[2];

console.log(`Starting ${command}\n`)
const startTime = Date.now()
let time = 0;

if(command) {
    let query
    switch(command) {
        case 'my-tweets':
            getTweets(concatArgs(consoleArgs))       
            break;
        case 'spotify-this-song':
            query = concatArgs(consoleArgs)
            getSong(query)
            break;
        case 'movie-this':
            query = concatArgs(consoleArgs, '+')
            getMovie(query)
            break;
        case 'do-what-it-says':
            doRandom();
            break;
        default:
            console.log('Please use a correct command!')
    }
}
// my-tweets
function getTweets(q) {
    const user = 'Defiled Spec'
    console.log(`Getting Tweets for ${user}`)
    twitter.get('statuses/user_timeline', user, (error, tweets) => {
        if(!error) {
            let tweetsArr = [];
            for(let i = 0; i < tweets.length; i++) {
                const date = tweets[i].created_at;
                // const tweetInfo = `${i}. @Defiled Spec - ${tweets[i].text} Created At: ${date}\n`;
                const tweetInfo = `tweets[i].text`;
                const tweet = {
                    text: tweets[i].text,
                    date: tweets[i].created_at.substring(0, 19),
                }
                tweetsArr.push(tweet)
            }
            const log = new Log(tweetsArr, 'Tweets', false)
            myLogger.logData(log)
        } else {
            const errLog = new Log([{msg: error}], 'Twitter Error', true)
            myLogger.logData(errLog)
        }
    });
}
// spotify-this-song <song> || 'monsters'
function getSong(q) {
    spotify.search({ type: 'track', query: q ? q: 'monsters', limit: 1}, function(error, data){
        if(!error) {
            console.log('\t' + data.tracks.items[0].artists[0].name)
        } else {
            console.log(error)
        }
        time = Date.now() - startTime
        console.log(`\nSpotify search for ${q} ${error ? 'failed' : 'succeeded'} and took ${(time / 1000).toFixed(1)}s to complete.`)
    });
}
// movie-this
function getMovie(q) {
    console.log('Getting Movie for ' + q)

}
// do-what-it-says
function doRandom() {
    console.log('Doing Random Stuff')

}

function concatArgs(args, char) {
    char = char ? char : ' '
    if(args[3]) {
        let query = '';
        for(let i = 3; i < args.length; i++) {
            if(i === 3) {
                query = args[i]
            } else {
                query += `${char}${args[i]}`
            }
        }
        return query;
    }
}