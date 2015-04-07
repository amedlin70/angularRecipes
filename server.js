//client-sessions for session info
//bcryptjs for hashing passwords
//csurf for anti csrf attacks
//
//var sessions = require('client-sessions');
//var bcrypt = require('bcryptjs');
//var csrf = require('csurf');

var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('angularRecipesDB', ['recipes','users']);
var bodyParser = require('body-parser');
var ObjectId = require("mongojs").ObjectId;

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
//app.use(session({
//	cookieName: 'session',
//	secret: 'lakaos1631nlknhi2340hidvniea',
//	duration: 30 * 60 * 1000,
//	activeDuration: 5 * 60 * 1000
//}));

app.post('/addRecipe', function(req, res) {
	console.log("Recieved Post: ", req.body);
	db.recipes.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.get('/recipes', function(req, res) {
	db.recipes.find().limit(20, function(err, docs) {
		res.json(docs);
	});
});

app.get('/recipes/:mainCat', function(req, res) {
	var mainCat = req.params.mainCat;
	console.log("mainCat: ", mainCat);
	db.recipes.find({mainCat: mainCat}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/recipe/:id', function(req, res) {
	var myId = req.params.id;
	console.log("Searching for id: ", myId);
	db.recipes.findOne({"_id" : ObjectId(myId)}, function(err, doc) {
		console.log("recipe at server: ", doc);
		res.json(doc);
	});
});

app.get('/newRecipes', function(req, res) {
	db.recipes.find().sort({dateCreated: -1}).limit(5, function(err, doc) {
		res.json(doc);
	});
});

app.get('/topRecipes', function(req, res) {
	db.recipes.find().sort({rating: -1}).limit(20, function(err, doc) {
		res.json(doc);
	});
});

app.get('/adminRecipes', function(req, res) {
	db.recipes.find().limit(5, function(err, docs) {
		res.json(docs);
	});
});

//app.post('register', function(req, res) {
//	var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//	var user = new User({
//		firstName: req.body.firstName,
	//	lastName: req.body.lastName,
	//	email: req.body.email,
	//	password: hash
//	});
//	// save user to db.
//});

// app.post('/login', function(req, res) {
// 	User.findOne({ email: req.body.email }, function(err, user) {
// 		if(!user) {
// 			// Send error message
// 		}
// 		else {
// 			if(bcrypt.compareSync(req.body.password, user.password)) {
// 				req.session.user = user; // set-cookie: session={ email: "...", password: '...', ...}
// 				res.redirect('/home');
// 			}
// 			else {
// 				// Send error message
// 			}
// 		}
// 	});
// });

app.listen(3000);