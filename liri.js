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

liriProject();

function liriProject() {
    inquirer.prompt([
        {
            name: "type",
            message: "What command?",
            type: "list",
            choices: ["Search Concerts", "spotify-this-song", "movie-this", "do-what-it-says"]
        },
        {
            name: "response",
            message: "what do you want to search",
            type: "input",
        }
    ]).then(function (result) {
        if (result.type === "Search Concerts") {
            var queryUrlBand = "https://rest.bandsintown.com/artists/" + result.response + "/events?app_id=codingbootcamp";
            axios.get(queryUrlBand).then(
                function (band) {
                    console.log("<====================>");
                    console.log(band.data[0].venue);
                    console.log("<====================>");
                    liriProject();
                }
            )
        }
        else if (result.type === "spotify-this-song") {
            spotify.search({ type: 'track', query: result.response }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("<====================>");
                console.log(data.tracks.items[0].album.artists[0].name);
                console.log("<====================>");
                liriProject();
            });
        }
        else if (result.type === "movie-this") {
            
        }
    })
}
