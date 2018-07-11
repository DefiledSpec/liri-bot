require('dotenv').config();
let keys = require('./keys');
let Spotify = require('node-spotify-api');
let Twitter = require('twitter');
const spotifyClient = new Spotify(keys.spotify);
const twitterClient = new Twitter(keys.twitter);
var fs = require('fs');

console.log('starting')
let consoleArgs = process.argv;
let command = process.argv[2];
let args = process.argv[3];

if(command) {
    if(args) {
        const query = concatArgs(consoleArgs);
        switch(command) {
            case 'my-tweets':
                getTweets()       
                break;
            case 'spotify-this-song':
                getSong(query)
                break;
            case 'movie-this':
                getMovie(query)
                break;
            case 'do-what-it-says':
                doRandom();
                break;
            default:
                console.log('Please use a correct command!')
        }
    }
}

function getTweets(q) {
    const user = 'defiled spec'
    console.log(`Getting Tweets for ${user}`)
    twitterClient.get('statuses/user_timeline', user, (error, tweets) => {
        if(!error) {
            for(let i = 0; i < tweets.length; i++) {
                const date = tweets[i].created_at.substring(0, 19);
                const tweetInfo = `@Defiled Spec - ${tweets[i].text} Created At: ${date}\n`;
                console.log(`${i}: ${tweetInfo}`)
                fs.appendFile('log.txt', 'Command: "my-tweets" => ' + tweetInfo, (err) => {
                    if(err) {console.error(`Error writing to file 'log.txt': ${err}`)}
                })
            }
        } else { console.error(error) }
    });
}

function getSong(q) {
    console.log('Getting Song for ' + q)

}

function getMovie(q) {
    console.log('Getting Movie for ' + q)

}

function doRandom() {
    console.log('Doing Random Stuff')

}

function concatArgs(args) {
    if(args[3]) {
        let query = '';
        for(let i = 3; i < args.length; i++) {
            if(i === 3) {
                query = args[i]
            } else {
                query += `+${args[i]}`
            }
        }
        return query;
    }
}