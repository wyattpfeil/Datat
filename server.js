const express = require("express");
var cors = require('cors')
var bodyParser = require("body-parser");
const app = express();
const fs = require('fs')

app.use(cors())
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.json("I'm alive!")
});

function getUserData(userToken) {
    var userFilePath = userToken + ".json"
    var userData
    if (fs.existsSync(userFilePath)) {
        //User is in the system
        userData = JSON.parse(fs.readFileSync(userFilePath))
    } else {
        //User is not in the system
        var createStream = fs.createWriteStream(userFilePath);
        createStream.write(JSON.stringify({}))
        createStream.end();
        userData = {}
    }
    return userData
}

app.get("/getData", function(req, res) {
    var userToken = req.query.token
    var userData = getUserData(userToken)
    res.json(userData)
});

app.post("/writeData", function(req, res){
    var userToken = req.body.token
    var category = req.body.category
    var time = req.body.time
    var value = req.body.value
    console.log("User: " + userToken + "\nCategory: " + category + "\nTime: " + time + "\nValue: " + value)
    var currentData = getUserData(userToken)
    if(currentData[category]) {
        //category exists
        currentData[category][time] = value
    } else {
        //category doesn't exist
        currentData[category] = {}
        currentData[category][time] = value
    }
    
    fs.writeFileSync(userToken + ".json", JSON.stringify(currentData))
    console.log(currentData)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

