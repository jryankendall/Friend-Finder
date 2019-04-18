var path = require("path");


module.exports = function(app) {
    var surveyPath = "../public/survey.html";
    var homePath = "../public/home.html";

    function servePage(response, dir) {
        response.sendFile(path.join(__dirname, dir));
    };

    app.get("/survey", function(req, res) {
        servePage(res, surveyPath);
    });

    app.get("/", function(req, res) {
        servePage(res, homePath);
    });
}