var express = require('express');
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');

var port = process.env.PORT || 3000;

var app = express();

var db = require('./models');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);

 db.sequelize.sync({force: true}).then(function() {
   app.listen(port, function() {
     console.log("App listening on port: "+port);
   });
 });
