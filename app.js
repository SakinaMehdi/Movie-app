const express = require("express");

const https = require("https");

const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


app.get("/" , function(req, res){
    res.sendFile(__dirname + "/search.html");
});


app.post("/", function(req, res){
    const query = req.body.movieName;
    const apiKey = "e2ad3b34";
    const url= "https://www.omdbapi.com/?t=" + query + "&apikey=" + apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){

         const movieData = JSON.parse(data);

         const name = movieData.Title;
         const releaseDate = movieData.Released;
         const director = movieData.Director;
         const imdb = movieData.imdbRating;
         const genre = movieData.Genre;
         const posterUrl= movieData.Poster;

         res.write("<h1> The name of your favourite movie is:" + name +"</h1>");
         res.write ("<p> Release Date: " + releaseDate +"<p>");
         res.write("<p> Directed By: " + director + "<p>");
         res.write("<p> Rating: " + imdb + "<p>");
         res.write("<p> Genre: " + genre + "<p>");
         res.write("<img src=" +posterUrl + ">");
            
         res.send();
        });
        
    });
});


app.listen(3000, function(){
    console.log("Server is running on port  3000");
});
