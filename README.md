# LIRI Bot

This is a project for KU's coding bootcamp, using node.js, twitter, omdb, and spotify.

### Instructions

1. Clone the repo from github
    * https://github.com/DefiledSpec/liri-bot.git

2. Open bash and run 
``` bash
    npm install
```
3. Create a `.env` file.
```
SPOTIFY_ID = <KEY_HERE>
SPOTIFY_SECRET = <KEY_HERE>

TWITTER_CONSUMER_KEY = <KEY_HERE>
TWITTER_CONSUMER_SECRET = <KEY_HERE>
TWITTER_ACCESS_TOKEN_KEY = <KEY_HERE>
TWITTER_ACCESS_TOKEN_SECRET = <KEY_HERE>

OMDB_KEY = <KEY_HERE>
```
4. You're ready to start using Liri by using any of the commands below!

### Commands 
---

* `node liri.js my-tweets <twitter username here>` - This will display this will display the last 20 tweets from Twitter for the user provided. If there is no user provided, it defaults to *'Defiled Spec'*.

* `node liri.js songify-this-song <song name here>` - This will return the provided songs information using an API call to Spotify. If no song name is provided, it defaults to *'All The Small Things'* - by Blink-182.

* `node liri.js movie-this <movie name here>` - This command will return the following information for the movie provided. If no movie is provided, it defaults to *'Mr Nobody'*.

    * Title
    * Year
    * Country
    * Language
    * Plot
    * Actors
    * IMDB Rating
    * Rotten Tomatoes Rating

* `node liri.js do-what-it-says` - This command looks at *random.txt* and runs the command in the file. This command can run any of the commands above, just replace the text in the file with the command you would like to run. Arguments are seperated by a *','* and no spaces, Song, Movie, and Twitter names may contain spaces. This command is defaulted to *'spotify-this-song,i want it that way'*

### Features
---
In addition to displaying this information to the the console, Liri also logs each commands data to a file called log.md in the 'logging' directory.

The data is logged in markdown format for easier readability and access to the information Liri has retrieved for you so that it can be used at a later date!

### TO-DO
---
- [x] `my-tweets`
- [x] `songify-this-song`
- [x] `movie-this`
- [x] `do-what-it-says`

- [x] Logging
- [x] Error Logging
---

Please fill free to submit an issue [here](https://github.com/DefiledSpec/liri-bot/issues/new)