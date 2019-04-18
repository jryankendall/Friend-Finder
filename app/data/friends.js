
var friendsArray = [];
var questionAmount = 10;

var Friend = function(name, photo, scores) {
    this.name = name;
    this.photo = photo;
    this.scores = scores;
}

function randomScoreArray(number) {
    var arr = [];
    for (var i = 0; i < number; i++) {
        arr.push(Math.floor(Math.random()*6));
    }
    return arr;
}

var sampleFriend = new Friend("Tane", "stockimage.jpg", randomScoreArray(questionAmount));

friendsArray.push(sampleFriend);

module.exports = {
    friendsArray
}