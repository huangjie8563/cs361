var express = require("express");
const request = require('request');
const {exec} = require("child_process");


var app = express();

var web_scrapper = 'http://127.0.0.1:5000'

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("*", (req, res, next) => {
  
  console.log(req.url);
  var req_str = req.url.substring(1);
  exec(`echo ${req_str} > file.txt; python3 HT_microservice.py; cat export.txt`, (err,stdout,stderr) => {
    if(err) {console.log(err);}
    
    //console.log(`${stdout}`)

    b = JSON.stringify(stdout);
    const images = JSON.parse(JSON.parse(b));
    const images_ = [];
    
    for(var i = 0;i <images.length; i++)
    {
      var ext = images[i].split(".").pop().toLowerCase();
      if(ext == "jpg" || ext == "jpeg"){
        images_.push(images[i]);
      }
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(JSON.stringify(images_));
  });

});

