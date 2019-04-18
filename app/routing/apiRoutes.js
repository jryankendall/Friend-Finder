var friendsData = require("../data/friends");
console.log(friendsData.friendsArray);
console.log("Friends Data loaded successfully.");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData.friendsArray);
    })

    app.post("/api/friends", function(req, res) {
        friendsData.friendsArray.push(req.body);
        res.json(true);
    })
}