var questionAmount = 10;

var Friend = function(name, photo, scores) {
    this.name = name;
    this.photo = photo;
    this.scores = scores;
    this.total = scores.reduce(getSum);
}

$(document).ready(function() {
    $("#submit-survey").on("click", function(event) {
        event.preventDefault();
        var enteredName = $("#name-entry").val().trim();
        var photoUrl = $("#photo-entry").val().trim();
        var scoreArray = [];
        for (var i = 0; i < 10; i++) {
            var answer = parseInt($("input[name=q" + i + "radio]:checked").val())
            scoreArray.push(parseInt(answer));
        }
        var friendSubmission = new Friend(enteredName, photoUrl, scoreArray);
        
        hideSurvey();
        $.get("/api/friends").then(function(data) {
            pulledArray = [];
            console.log(data);
            
            for (var i = 0; i < data.length; i++) {
                pulledArray.push(data[i]);
            }
            totalUserScores(pulledArray, friendSubmission);
        });
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
        $("#submit-survey").removeClass("d-none");
    })

    $("#friends-empty").on("click", function(event) {
        event.preventDefault();
        emptyFriends();

    })


    console.log("Logic.js loaded.");
    
})

var pulledArray = [];

function getSum(total, num) {
    return parseInt(total) + parseInt(num);
}

function returnFunc(vari) {
    return vari;
}

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


function hideSurvey() {
    $(".survey-top").addClass("d-none");
    $(".survey-body").addClass("d-none");
    $("#submit-survey").addClass("d-none");
    $("#return-button").removeClass("d-none");

};

function totalUserScores(data, newUser) {
    
    var userScore = parseInt(newUser.total);
    var closestUser = data[0];
    for (var i = 0; i < data.length; i++) {
        data[i].difference = Math.abs(userScore - parseInt(data[i].total));
    }
    for (var j = 1; j < data.length; j++) {
        if (data[j].difference < data[j-1].difference) {
            if (data[j-1].name != data[j].name) {
                closestUser = data[j];
            }
        }
    }
    return matchUser(closestUser);
}

function matchUser(object) {
    var newHeader = $("<h2>");
    newHeader.text(object.name);
    var newImage = $("<img>");
    newImage.css("width", "300");
    newImage.css("height", "300");
    newImage.attr("src", object.photo);
    $("#modal-display").append(newHeader)
                        .append(newImage);
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

function emptyFriends() {
    $.ajax({
        type: "DELETE",
        url: "api/friends/clear"
    }).then(function(data) {
        console.log(data);
        
        console.log("Friends array reset.");
        
    })
}

