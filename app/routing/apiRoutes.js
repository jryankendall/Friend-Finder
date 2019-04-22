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
}