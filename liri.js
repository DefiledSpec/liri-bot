require('dotenv').config();
let keys = require('./keys');
let Spotify = require('node-spotify-api');
let Twitter = require('twitter');
const fs = require('fs');
// const moment = require('moment');



const seperator = '-----------------------\n';

const spotifyClient = new Spotify(keys.spotify);
const twitterClient = new Twitter(keys.twitter);

console.log('starting')
let consoleArgs = process.argv;
let command = process.argv[2];

if(command) {
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

function logger(type, data, err) {
    const logFile = 'log.txt'
    const debugFile = 'errLog.txt'
    switch(type) {
        case 'tweets': 
            
            break;
        case 'songify':

            break;
        case 'omdb':

            break;
        case 'random':

            break;
        default:
            type = 'random'
            console.log('Incorrect logger type specified!')
    }
    const startMsg = `----- ${type} File Starting -----\n`
    if(!err) {
        fs.appendFile(logFile, startMsg, err => {
            if(err) {
                console.log(err)
            }else{
                for (let i = 0; i < data.length; i++) {
                    const res = data[i]
                    for (const key in res) {
                        let msg = `${key}: ${res[key]}\n`
                        fs.appendFile(logFile, msg, err => {
                            if(err) {
                                console.log(err)
                            }else{
                                console.log('good')
                            }
                        })
                    }
                }
                fs.appendFile(logFile, seperator, err => {
                    if(err) console.log(err)
                })
            }
        })
    }else{
        fs.appendFile(debugFile, data + '\n', err => {
            if(err) {
                conosle.log(err)
            }else{
                console.log(`Wrote Err ${str} to ${debugFile}`)
            }
        })
    }
}


function getTweets(q) {
    const user = 'Defiled Spec'
    console.log(`Getting Tweets for ${user}`)
    twitterClient.get('statuses/user_timeline', user, (error, tweets) => {
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
            logger('tweets', tweetsArr)
        } else {
            logger(error, true);
        }
    });
}

function getSong(q) {
    // console.log('Getting Song for ' + q?q:'monsters')
    spotifyClient.search({ type: 'track', query: q?q:'monsters', limit: 1}, function(error, data){
        if(!error) {
            console.log(data.tracks.items[0].artists[0].name)
        }
    });
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