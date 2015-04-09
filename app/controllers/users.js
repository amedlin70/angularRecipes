var mongoose = require('mongoose');
var User = mongoose.model('User');
var Recipe = mongoose.model('Recipe');
var bcrypt = require('bcryptjs');

exports.createUser = function(req, res) {
	// Verify req.body is valid before sending it to the model
	var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	var user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		userName: req.body.name,
		email: req.body.email,
		password: hash
	});
	console.log("Creating user: ", user);

	user.newUser(function(err) {
		if(err) {
			console.log("error: ", err);
			return res.json("error creating user");
		}
		return res.json(user);
	});
}

exports.login = function(req, res) {
	var userName = req.body.name;
	var password = req.body.password;

	User.getUser(userName, function(err, user) {
		User.validatePassword(user, password, function(result) {
			if(result) {
				// Set session info
				req.session.user = user;

				// Return success message
				return res.json(200);
			}
			else {
				res.status(400);
				return res.send("Incorrect username or password.");
				// Send error message
			}
		});
	});
}

exports.getRecipeBox = function(req, res) {
	// Ensure user is logged in
	if(req.session && req.session.user) {
		User.getUser(req.session.user.name, function(err, user) {
			if(!user) {
				req.session.reset();
				res.status(400);
				return res.json("Please log in");
			}
			else {
				// Get favorite recipes for user
				res.locals.user = user;
				return res.json(200);
			}
		})
	}
	else {
		res.status(400);
		return res.json("Please log in");
	}	
}

exports.logout = function(req, res) {
	// Delete session information
	req.session.reset();
	return res.json(200);
}