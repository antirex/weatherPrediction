const express = require("express");
const https = require("https");
const bodyParser =require("body-parser");
const ejs = require("ejs");
var port =3000;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"))
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,res){
    var query = req.body.city;
    const appId = "d7a2a3b570f8a30e2bdba92b6cc1f700";
    const unit ="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appId+"&units="+unit;
    https.get(url,function(response){
            console.log(response.statusCode); //to get the status code of our request sent to the server
            
            response.on("data",function(data){
                var weatherData = JSON.parse(data); // to convert he given data to a JS object.
                var temp = weatherData.main.temp;
                var desp = weatherData.weather[0].description;
                var pic = weatherData.weather[0].icon;
                res.write("<h1>The weather is currently" + desp +"</h1>"); //we can have multiple res.write() in our .get method
                res.write("<h2>The temperature in "+query+" is"+ temp +" degrees celcius.</h2>");
                res.write("<img src='http://openweathermap.org/img/wn/"+pic+"@2x"+".png'>");
                res.send();// you can have only single res.send() in a .get method
            })      
    })
})

app.listen(port,function(){
    console.log("Server is running on port 3000");
});