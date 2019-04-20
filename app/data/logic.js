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

    $("#delete-user-btn").on("click", function(event) {
        event.preventDefault();
        var userTane = new Friend("Tane", null, null);
        deleteUser(userTane);
    })
})

var pulledArray = [];

function fetchUsers() {
    $.get("/api/friends").then(function(data) {
        pulledArray = [];
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            pulledArray.push(data[i]);
        }
    })
}

function addNewUser(friendObject) {
    $.post("/api/friends", friendObject)
        .then(function(dat) {
            console.log("home.html", dat);
            console.log("New user added.");            
        })
}

function findMatches(friendObject) {

}

function deleteUser(friendObject) {
    $.ajax({
        method: "DELETE",
        url: "/api/friends",
        data: friendObject
    }).then(function(dat) {
        console.log("home.html", dat);
        console.log("User deleted.");
        
    })
}
