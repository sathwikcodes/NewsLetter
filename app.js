const express = require("express");
const bodyParser = require("body-parser");
const request  = require("request");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/919acefa9c"

    const options = {
        method: "POST",
        auth: "sathwik:0e3740f00693bc0f27b808b78475500f-us10"

    }

    
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});

app.use(bodyParser.urlencoded({extended:true}));


app.post("/failure.html",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 300,function(){
    console.log("Server Started on port 300");
});



// API key
//0e3740f00693bc0f27b808b78475500f-us10

//id
// 919acefa9c