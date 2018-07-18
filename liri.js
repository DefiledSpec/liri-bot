'use strict'

require('dotenv').config()
const keys = require('./keys')
const Spotify = require('node-spotify-api')
const Twitter = require('twitter')
const fs = require('fs')
const Log = require('./logging/Log')

const spotify = new Spotify(keys.spotify)
const twitter = new Twitter(keys.twitter)

let consoleArgs = process.argv
let command = process.argv[2]

new Log([{Log: `Starting ${command}\n`}], `LIRI Command`)
const startTime = Date.now()
let time = 0;
let err = {}
run()
function run(query) {
    if(command) {
        query ? query : ''
        switch(command) {
            case 'my-tweets':
                getTweets(query)       
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
                err.Error = `Please use a correct command! => '${command}'`
                new Log([err], 'Error', true)
        }
    }else{
        err.Error = `No command specified`
        new Log([err], 'Error', true)
    }
}

// my-tweets
function getTweets(q) {
    const user = 'Defiled Spec'
    console.log(`Getting Tweets for ${user}`)
    twitter.get('statuses/user_timeline', user, (error, tweets) => {
        time = Date.now() - startTime
        let message = `Tweets search for '${user}' ${error ? 'failed' : 'succeeded'} and took ${(time / 1000).toFixed(1)}s to complete. ${tweets.length} / 20 result(s).`
        if(!error) {
            let tweetsArr = []
            for(let i = 0; i < tweets.length; i++) {
                let tweet = {
                    Tweet: tweets[i].text,
                    Date: tweets[i].created_at.substring(0, 19),
                }
                tweetsArr.push(tweet)
            }
            tweetsArr.push({Results: message})
            new Log(tweetsArr, 'Tweets')
        } else {
            new Log([{msg: error}], 'Twitter Error', true)
        }
    })
}
// spotify-this-song <song> || 'monsters'
function getSong(q) {
    let query = q ? new RegExp(`${q}`, 'i') : /All The Small Things/
    spotify.search({ type: 'track', query: query, limit: 1}).then(res => {
        time = Date.now() - startTime
        let message = `Spotify search for '${query}' succeeded and took ${(time / 1000).toFixed(1)}s to complete. ${res.tracks.items.length} result(s).`
        let songs = res.tracks.items
        songs.forEach(song => {
            let url = song.preview_url ? song.preview_url : 'None :('
        let songData = {
            Artists: song.artists[0].name,
            Song: song.name,
            URL: url,
            Album: song.album.name
        }
        let results = {Results: message}
        new Log([songData, results], 'Spotify')
        })
    }).catch(err => {
        new Log([{err: err}], `Spotify Error`, true)})
}
// movie-this
function getMovie(q) {
    console.log('Getting Movie for ' + q)

}
// do-what-it-says
function doRandom() {
    console.log('Doing Random Stuff')
    fs.readFile('./random.txt', 'utf-8', (err, data) => {
        if(!err) {
            let randArgs = [...data.split(',')]
            command = randArgs[0]
            let params = randArgs[1] ? [...randArgs[1].split(' ')] : [null]
            consoleArgs = [null, null, command, ...params] 
            console.log(consoleArgs)
            run(consoleArgs)
        }else{
            new Log([err], 'Error', true)
        }
    })
}

function concatArgs(args, char) {
    char = char ? char : ' '
    if(args[3]) {
        let query = ''
        for(let i = 3; i < args.length; i++) {
            if(i === 3) {
                query = args[i]
            } else {
                query += `${char}${args[i]}`
            }
        }
        console.log(query)
        return query
    }
}