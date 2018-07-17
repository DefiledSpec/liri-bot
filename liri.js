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
        time = Date.now() - startTime
        let message = `Twitter search for '${user}' ${error ? 'failed' : 'succeeded'} and took ${(time / 1000).toFixed(1)}s to complete.`
        if(!error) {
            let tweetsArr = [];

            for(let i = 0; i < tweets.length; i++) {
                const tweet = {
                    Tweet: tweets[i].text,
                    Date: tweets[i].created_at.substring(0, 19),
                    Result: message,
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
    let query = q ? q : 'The Sign'
    spotify.search({ type: 'track', query: query, limit: 1}, function(error, data){
        time = Date.now() - startTime
        let message = `Spotify search for '${query}' ${error ? 'failed' : 'succeeded'} and took ${(time / 1000).toFixed(1)}s to complete.`
        if(!error) {
            let songs = data.tracks.items[0]
            let songData = [
                {
                    Artists: songs.artists[0].name,
                    Song: songs.name,
                    URL: songs.preview_url,
                    Album: songs.album.name,
                    Result: message
                }
            ]
            
            let log = new Log(songData, 'Spotify', false)
            myLogger.logData(log)
        } else {
            const errLog = new Log([{msg: error}], 'Spotify Error', true)
            myLogger.logData(errLog)
        }
        console.log(`\n${message}`)
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