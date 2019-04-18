var Friend = function(name, photo, scores) {
    this.name = name;
    this.photo = photo;
    this.scores = scores;
}

$(document).ready(function() {
    $("#submit-survey").on("click", function(event) {
        event.preventDefault();
        var enteredName = $("#name-entry").val().trim();
        var photoUrl = $("#photo-entry").val().trim();
        var scoreArray = [];
        for (var i = 0; i < 10; i++) {
            var answer = parseInt($("#survey-answer-" + i).val());
            scoreArray.push(answer);
        }
        var friendSubmission = new Friend(enteredName, photoUrl, scoreArray);
        addNewUser(friendSubmission);
        
    })
})

function addNewUser(friendObject) {
    $.post("/api/friends", friendObject)
        .then(function(dat) {
            console.log("home.html", data);
            console.log("New user added.");            
        })
}