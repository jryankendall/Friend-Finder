
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
        arr.push((Math.floor(Math.random()*5)) + 1);
    }
    return arr;
}

var sampleFriend = new Friend("Tane", "stockimage.jpg", randomScoreArray(questionAmount));

friendsArray.push(sampleFriend);


var questionArray = [
    "I prefer watching TV or playing video games to reading or writing.",
    "I like to talk with people with text communication rather than through voice.",
    "When a problem surfaces, I prefer to pause and examine the whole picture instead of dividing it into smaller issues.",
    "I get angry quite quickly and easily.",
    "Whether I get angry quickly or not, I tend to calm down very quickly after being upset.",
    "In conversation I prefer to wait and respond after gathering my thoughts, rather than engage in back-and-forth discussion.",
    "When it comes to leadership, I prefer to choose to lead, instead of being selected as a leader by somebody else.",
    "I can easily tell if somebody else is upset, whether they try to hide it or not.",
    "Even when upset or angry, I try to stop it from affecting those around me.",
    "I only seek help with a problem when I have exhausted all possible solutions I can think of."
];



module.exports = {
    friendsArray,
    questionArray
}