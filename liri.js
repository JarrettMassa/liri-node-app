require("dotenv").config();
var twitter = require('twitter');
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var song = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

var action = process.argv[2];
var searchTerm = process.argv[3];

var processData = function(){
	if (action == 'my-tweets'){
		var params = {screen_name: 'JMJunk213'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < 20; i++)
				console.log(tweets[i].created_at + " - " + tweets[i].text);
	   		}
		});
	}
	else if (action == 'spotify-this-song'){

		if (process.argv.length == 3){
			searchTerm = "The Sign";
		}

		song.search({ type: 'track', query: searchTerm , limit: '1'}, function(err, data) {
	 	
			console.log(data.tracks.items[0].name);
			console.log(data.tracks.items[0].album.name);
			console.log(data.tracks.items[0].external_urls.spotify); 
		});
	}
	else if (action == 'movie-this'){

		if (process.argv.length == 3){
			searchTerm = 'Mr Nobody';
		}

		request('http://www.omdbapi.com/?apikey=6352298e&t=' + searchTerm, function (error, response, body) {
			var obj = JSON.parse(body);
	  		console.log(obj.Title);
	  		console.log(obj.Year);
	  		console.log(obj.Ratings[0]);
	  		console.log(obj.Ratings[1]);
	  		console.log(obj.Country);
	  		console.log(obj.Language);
	  		console.log(obj.Plot);
	  		console.log(obj.Actors);
		});
	}

}; // End processData


if (action == 'do-what-it-says'){
	fs.readFile("random.txt", "utf8", function(err, data) {
  		var output = data.split(",");
  		action = output[0];
  		searchTerm = output[1];
  		processData();
	});
}
else{
	processData();		
}




