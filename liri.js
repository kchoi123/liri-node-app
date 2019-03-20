// fs is a core Node package for reading and writing files
var fs = require("fs");

// setting any variable to the dotenv package
var any = require("dotenv").config();

// import the keys.js file and store it in a variable
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");

// access keys information
var spotify = new Spotify(keys.spotify);

// define moment
var moment = require('moment');

// define inquirer
var inquirer = require("inquirer");

// define axios
var axios = require("axios");

// creating terminal links
const terminalLink = require('terminal-link');

// calling liriProject
liriProject();

// function to run the app
function liriProject() {
    inquirer.prompt([
        {
            name: "type",
            message: "What command?",
            type: "list",
            choices: ["Search-Concerts", "Spotify-This-Song", "Movie-This", "Do-What-It-Says"]
        }
    ]).then(function (result) {
        if (result.type === "Search-Concerts") {
            inquirer.prompt([
                {
                    name: "responseConcerts",
                    message: "Type an artist or band name here:",
                    type: "input",
                    validate: function (value1) {
                        if (value1 === "") {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                }
            ]).then(function (resultConcerts) {
                var joinConcerts = resultConcerts.responseConcerts.replace(" ", "");
                var queryUrlBand = "https://rest.bandsintown.com/artists/" + joinConcerts + "/events?app_id=codingbootcamp";
                axios.get(queryUrlBand).then(
                    function (band) {
                        console.log("\x1b[32m%s\x1b[0m", "<================================================>");
                        console.log('\x1b[33m%s\x1b[0m', "We are compiling: " + result.type + " with " + resultConcerts.responseConcerts);
                        console.log("\x1b[34m%s\x1b[0m", "--------------------------------------------------");
                        console.log("You're looking for venues that host: " + resultConcerts.responseConcerts.toUpperCase());
                        console.log("Venue Name: " + band.data[0].venue.name);
                        console.log("Location: " + band.data[0].venue.city + ", " + band.data[0].venue.region);
                        console.log("Event Date: " + moment().format("L", band.data[0].datetime));
                        // this is for the link
                        const linkConcerts = terminalLink('Click Here', band.data[0].url);
                        console.log("For more info: " + linkConcerts);
                        console.log("\x1b[32m%s\x1b[0m", "<================================================>");
                        // liriProject();
                    }
                )
            })
        }
        else if (result.type === "Spotify-This-Song") {
            inquirer.prompt([
                {
                    name: "responseSpotify",
                    message: "Enter a song name here:",
                    type: "input",
                    default: "The Sign"
                }
            ]).then(function (resultSpotify) {
                if (resultSpotify.responseSpotify === "The Sign") {
                    spotify.search({ type: 'track', query: "the sign ace of base" }, function (err, data) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        console.log("\x1b[32m%s\x1b[0m", "<================================================>");
                        console.log('\x1b[33m%s\x1b[0m', "We are compiling: " + result.type + " with " + resultSpotify.responseSpotify);
                        console.log("\x1b[34m%s\x1b[0m", "--------------------------------------------------");
                        console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
                        console.log("Album: " + data.tracks.items[0].album.name.toUpperCase());
                        const linkSpotify = terminalLink('Click Here', data.tracks.items[0].album.external_urls.spotify);
                        console.log("Spotify Link: " + linkSpotify);
                        console.log("Release Date: " + moment().format("L", data.tracks.items[0].album));
                        // console.log(data.tracks.items[0]);
                        console.log("\x1b[32m%s\x1b[0m", "<================================================>");
                        // liriProject();
                    });
                }
                else {
                    spotify.search({ type: 'track', query: resultSpotify.responseSpotify }, function (err, data) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        console.log("\x1b[32m%s\x1b[0m", "<================================================>");
                        console.log('\x1b[33m%s\x1b[0m', "We are compiling: " + result.type + " with " + resultSpotify.responseSpotify);
                        console.log("\x1b[34m%s\x1b[0m", "--------------------------------------------------");
                        console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
                        console.log("Song Title: " + data.tracks.items[0].album.name.toUpperCase());
                        const linkSpotify = terminalLink('Click Here', data.tracks.items[0].album.external_urls.spotify);
                        console.log("Spotify Link: " + linkSpotify);
                        console.log("Release Date: " + moment().format("L", data.tracks.items[0].album));
                        // console.log(data.tracks.items[0]);
                        console.log("\x1b[32m%s\x1b[0m", "<================================================>");
                        // liriProject();
                    });
                }
            })
        }
        else if (result.type === "Movie-This") {
            inquirer.prompt([
                {
                    name: "responseMovie",
                    message: "Enter Movie Name",
                    type: "input",
                    default: "Mr Nobody"
                }
            ]).then(function (resultMovie) {
                // this ways uses the plus symbol but no other symbols
                //var splitMovie = resultMovie.responseMovie.split(" ");
                //var plusMovie = splitMovie.join("+");
                // this uses the %20 which is different but it works in this case and it can intake symbols
                var plusMovie = encodeURIComponent(resultMovie.responseMovie);
                var queryUrlMovie = "https://www.omdbapi.com/?t=" + plusMovie + "&y=&plot=short&apikey=trilogy";
                axios.get(queryUrlMovie).then(
                    function (movie) {
                        console.log("\x1b[32m%s\x1b[0m", "<================================================>");
                        console.log('\x1b[33m%s\x1b[0m', "We are compiling: " + result.type + " with " + resultMovie.responseMovie);
                        console.log("\x1b[34m%s\x1b[0m", "--------------------------------------------------");
                        console.log("Movie Title: " + movie.data.Title);
                        console.log("Year: " + movie.data.Year);
                        console.log("IMDB Rating: " + movie.data.imdbRating);
                        console.log("Rotten Tomatoes Rating: " + movie.data.Ratings[1].Value);
                        console.log("Countries Filmed: " + movie.data.Country);
                        console.log("Language: " + movie.data.Language);
                        console.log("Plot: " + movie.data.Plot);
                        console.log("Actors: " + movie.data.Actors);
                        console.log("\x1b[32m%s\x1b[0m", "<================================================>");
                    }
                )
            })
        }
        else {
            fs.readFile("random.txt", "utf8", function (err, data) {
                if (err) {
                    return console.log(err);
                }
                var dataArr = data.split(",");

                spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    console.log("\x1b[32m%s\x1b[0m", "<================================================>");
                    console.log('\x1b[33m%s\x1b[0m', "We are compiling: " + dataArr[0] + " with " + dataArr[1]);
                    console.log("\x1b[34m%s\x1b[0m", "--------------------------------------------------");
                    console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
                    console.log("Song Title: " + data.tracks.items[0].album.name.toUpperCase());
                    const linkSpotify = terminalLink('Click Here', data.tracks.items[0].album.external_urls.spotify);
                    console.log("Spotify Link: " + linkSpotify);
                    console.log("Release Date: " + moment().format("L", data.tracks.items[0].album));
                    // console.log(data.tracks.items[0]);
                    console.log("\x1b[32m%s\x1b[0m", "<================================================>");
                    // liriProject();
                });
            })
        }
    })
}
