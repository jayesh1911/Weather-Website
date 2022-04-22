const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
  const city = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=1742fe8efe0fdfe505103097829b935b&units=metric";
  https.get(url, function(response){
    console.log(response.statusCode +" " + response.statusMessage);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const image = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

      res.write("<h1>Temprature in "+ city +" is " + temp + " degree celcius</h1>");
      res.write("<h3>It is " + desc + " in "+ city +"</h3>");
      res.write("<img src="+image+">");
      res.send();
    });
  });
});


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
