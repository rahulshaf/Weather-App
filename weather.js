const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
   
});
app.post("/",function(req,res){
    const cityName=req.body.cityName;
    const apiKey="";
    const units="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units="+units;
    https.get(url,function(response){
        console.log('STATUS: ' + res.statusCode);
        response.setEncoding('utf8');
        //____________
        response.on('data', function (data) {
             const weatherData=JSON.parse(data);
             const cod=Number(weatherData.cod);
             if(cod===200){
        
                const temp=weatherData.main.temp;
                const description=weatherData.weather[0].description;
                 const icon=weatherData.weather[0].icon;
                 const imageUrl= "https://openweathermap.org/img/wn/"+icon+"@2x.png";
                 res.write("<p>The Weather is Currently "+description+"</p>")
                 res.write("<h1>The Temperatue in "+cityName+" is "+temp+" Degree Celcius.</h1>");
                 res.write("<img src="+imageUrl+">");
                 
        }
        else{
            const errMessage=weatherData.message;
            res.write("Error Code: "+cod+"|| Err_Message: "+errMessage);
        }
        res.send();
        });
        //__________
      
      
});

});



app.listen(3000,function(){
    console.log("Weather server is listen at Port 3000");
});
