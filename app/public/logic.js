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

    $("#show-survey-btn").on("click", function(event) {
        event.preventDefault();
        fetchQuestions(printData);
        $("#show-survey-btn").addClass("d-none");
        $("#send-survey-btn").removeClass("d-none");
    })

    $("#send-survey-btn").on("click", function(event) {
        event.preventDefault();
        hideSurvey();

        fetchUsers(pickUsers);
    })

    console.log("Logic.js loaded.");
    
})

var pulledArray = [];

function fetchUsers(cb) {
    $.get("/api/friends").then(function(data) {
        pulledArray = [];
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            pulledArray.push(data[i]);
        }
        return cb(pulledArray);
    })
}

function addNewUser(friendObject) {
    $.post("/api/friends", friendObject)
        .then(function(dat) {
            console.log("home.html", dat);
            console.log("New user added.");            
        })
}

function pickUsers(data) {

}

function hideSurvey() {

};

function totalUserScores(data) {
    var scoreArray = [];
    for (var i = 0; i < data.length; i++) {
        
    }
}

function deleteUser(friendObject) {
    $.ajax({
        type: "DELETE",
        url: "/api/friends",
        data: friendObject
    }).then(function(dat) {
        console.log("home.html", dat);
        console.log("User deleted.");
        
    })
}

function fetchQuestions(func) {
    $.get("/api/questions").then(function(data) {
        console.log(data);
        func(data);
    })
}

function printData(data) {
    for (var i = 0; i < data.length; i++) {
        var questionBox = $("<div>");
        questionBox.append("<h4>" + data[i] + "</h4>")
                    .addClass("col-12");
        var choicesLabelsBox = $("<div>");
        choicesLabelsBox.append("<p>Strongly Disagree</p> <p>Strongly Agree</p>")
                        .addClass("col-12 d-flex justify-content-between");
        $(".survey-body").append(questionBox)
                        .append(choicesLabelsBox);
        var checkBoxes = $("<div>");
        checkBoxes.addClass("col-12 d-flex justify-content-around");
        for (var j = 1; j <= 5; j++) {
            var checkDiv = $("<div>");
            var newInput = $("<input>");
            checkDiv.addClass("form-check form-check-inline");
            newInput.addClass("form-check-input")
                    .attr("type", "radio")
                    .attr("name", "q" + i + "radio")
                    .attr("value", j);
            checkDiv.append(newInput);
            checkBoxes.append(checkDiv);
        }
        var newHr = $("<h2>------</h2>");
        $(".survey-body").append(checkBoxes);
        $(".survey-body").append(newHr);
    }
}