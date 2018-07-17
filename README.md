# LIRI Bot

This is a project for KU's coding bootcamp, using node.js, twitter, omdb, and spotify.

### Instructions

1. Clone the repo from github => https://github.com/DefiledSpec/liri-bot.git
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
```
4. You're ready to start using Liri by using any of the commands below!

### Commands 
---

* `node liri.js my-tweets <twitter username here>` - This will display this will display the last 20 tweets from Twitter for the user provided. If there is no user provided, it defaults to *'Defiled Spec'*.

* `node liri.js songify-this-song <song name here>` - This will return the provided songs information using an API call to Spotify. If no song name is provided, it defaults to *'The Sign'* - by Ace of Base.

* `node liri.js movie-this <movie name here>` - This command will return the provided movie's

* `node liri.js do-what-it-says` - This command looks at <i>random.txt</i> and runs the command in the file

### Features
---
In addition to displaying this information to the the console, Liri also logs each commands data to a file called log.md in the 'logging' directory.

The data is logged in markdown format for easier readability and access to the information Liri has retrieved for you so that it can be used at a later date!

### TO-DO
---

    - [x] `my-tweets`
    - [x] `songify-this-song`
    - [ ] `movie-this`
    - [ ] `do-what-it-says`


Please fill free to submit an issue [here](https://github.com/DefiledSpec/liri-bot/issues/new)