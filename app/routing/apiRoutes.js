var friendsData = require("../data/friends");
console.log(friendsData.friendsArray);
console.log("Friends Data loaded successfully.");

var findIndex = function(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] == value) {
            return i;
        }
    }
}

var Friend = function(name, photo, scores) {
    this.name = name;
    this.photo = photo;
    this.scores = scores;
    this.total = scores.reduce(getSum);
}

function getSum(total, num) {
    return parseInt(total) + parseInt(num);
}

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData.friendsArray);
    })

    app.get("/api/questions", function(req, res) {
        res.json(friendsData.questionArray);
    })

    app.post("/api/friends", function(req, res) {
        friendsData.friendsArray.push(req.body);
        res.json(true);
    })

    app.delete("/api/friends", function(req, res) {
        var friendName = req.body.name;
        var existingFriend = friendsData.friendsArray[findIndex(friendsData.friendsArray, "name", friendName)];
        console.log(existingFriend);
        
    })

    app.delete("/api/friends/clear", function(req,res) {
        var questionAmount = 10;
        friendsData.friendsArray = [];
        function randomScoreArray(number) {
            var arr = [];
            for (var i = 0; i < number; i++) {
                arr.push((Math.floor(Math.random()*5)) + 1);
            }
            return arr;
        }
        
        var sampleFriend = new Friend("Tayne", "https://media2.giphy.com/media/Oelzcbu0deOsg/giphy.gif", randomScoreArray(questionAmount));
        
        friendsData.friendsArray.push(sampleFriend);
    })
}