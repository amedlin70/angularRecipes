//csurf for anti csrf attacks
//var csrf = require('csurf');
//
//look into passport for session info

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var sessions = require('client-sessions');

// Connect to mongodb
mongoose.connect('mongodb://localhost/recipe');

// Load all models
var models_path = __dirname+'/app/models';
fs.readdirSync(models_path).forEach(function (filename) {
  if(~filename.indexOf('.js')) require(models_path+'/'+filename);
});


var User = mongoose.model('User');
var app = express();

// Set up middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(sessions({
	cookieName: 'session',
	secret: 'lakaos1631nlknhi2340hidvniea',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
}));
// Load user information based on the session information
app.use(function(req, res, next) {
	if(req.session && req.session.user) {
		User.getUser(req.session.user.name, function(err, user) {
			if(user) {
				req.user = user;
				delete req.user.password
				req.session.user = req.user;
				res.locals.user = req.user;
			}
			next();
		});
	}
	else {
		next();
	}
});

require('./app/config/routes')(app);

console.log("Server starting on port 3000");
app.listen(3000);