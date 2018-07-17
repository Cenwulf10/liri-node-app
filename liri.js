// Add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

var keys = require("./keys.js");
 
var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require("request");

var fs = require("fs");

var userAction = process.argv[2];

// Title of the song or movie
var userTitle = process.argv[3];

var getTweets = function () {

    var client = new Twitter(keys.twitter);

    // NPM package for Twitter
    var params = { screen_name: 'JoseGavilanes4' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {

                // Console log tweets
                console.log(tweets[i].created_at);
                console.log(" ");
                console.log(tweets[i].text);
            }
        }
    });
}

var getSpotify = function (songName) {

    var spotify = new Spotify(keys.spotify);

    // NPM package node-spotify-API
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items[0];

        // Console log Spotify
        console.log("artist(s): " + songs.artists[0].name);
        console.log("Song Name: " + songs.name);
        console.log("Preview Song: " + songs.preview_url);
        console.log("Album: " + songs.album.name);
        console.log("=========================================");

    });
}

var getMovies = function (movieName) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body);

            // The movie title
            console.log("Title: " + movie.Title);

            // Release year of the movie
            console.log("Release Year: " + movie.Year);

            // IMDB rating
            console.log("IMDB Rating: " + movie.imdbRating);

            // Rotten Tomatoes rating
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);

            // the country it was produced in
            console.log("Country Produced: " + movie.Country);

            // Languages
            console.log("Language(s) Available: " + movie.Language);

            // The plot
            console.log("Plot Synopsis: " + movie.Plot);

            // The cast
            console.log("Actors: " + movie.Actors);
        }
    });

}

// Switch statement
var pick = function (caseData, functionData) {
    switch (caseData) {
        case "my-tweets":
            getTweets();
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "movie-this":
            getMovies(functionData);
            break;
        case "do-what-it-says":
            doThat();
            break;
        default:
            console.log("LIRI does not know that");
    }
}

pick(userAction, userTitle);