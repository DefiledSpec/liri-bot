'use strict'

require('dotenv').config()
const keys = require('./keys')
const Spotify = require('node-spotify-api')
const Twitter = require('twitter')
const fs = require('fs')
const Log = require('./logging/Log')
const request = require('request')

const spotify = new Spotify(keys.spotify)
const twitter = new Twitter(keys.twitter)

let consoleArgs = process.argv
let command = process.argv[2]

const startTime = Date.now()
let time = 0;
let err = {}

run()

function run(query) {
    new Log([{Log: `Running ${command}\n`}], `LIRI Command`)
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
                err.Error = `Please use a correct command! : '${command}'`
                new Log([err], 'Error', true)
        }
    }else{
        err.Error = `No command specified`
        new Log([err], 'Error', true)
    }
}
// my-tweets
function getTweets(q) {
    const user = q ? q : 'Defiled Spec'
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
    }).catch(error => {
        new Log([{msg: error}], `Spotify Error`, true)})
}

// movie-this
function getMovie(q) {
    let query = q ? q : 'Mr. Nobody'
    let queryUrl = `http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=${keys.omdb}`
    request(queryUrl, function(error, response, body) {
        let message = `OMDB search for '${q}' ${error ? 'failed' : 'succeeded'} and took ${(time / 1000).toFixed(1)}s to complete.`
        if(!error && response.statusCode === 200) {
            let data = JSON.parse(body)
            let actors = [...data.Actors.split(', ')].map(actor => actor = `\n\t\t* ${actor}`).join('')
            console.log(actors)
            let movie = {
                Title: data.Title,
                Year: data.Year,
                'IMDB Rating': data.imdbRating,
                'Rotten Tomatoes Rating': data.Ratings[1].Value,
                Country: data.Country,
                Language: data.Language,
                Plot: data.Plot,
                Actors: actors
            }
            let results = {Results: message}
            new Log([movie, results], 'OMDB')
        }else{
            new Log([{msg: error}], 'Error', true)
        }
    })
}
// do-what-it-says
function doRandom() {
    fs.readFile('./random.txt', 'utf-8', (err, data) => {
        if(!err) {
            let randArgs = [...data.split(',')]
            command = randArgs[0]
            let params = randArgs[1] ? [...randArgs[1].split(' ')] : [null]
            consoleArgs = [null, null, command, ...params] 
            console.log(consoleArgs)
            run(consoleArgs)
        }else{
            new Log([{msg: err}], 'Error', true)
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
        return query
    }
}