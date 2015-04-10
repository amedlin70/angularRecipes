var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');
var User = mongoose.model('User');

exports.addRecipe = function(req, res) {
	// Ensure user is logged in
	if(req.session && req.session.user) {
		User.getUser(req.session.user.name, function(err, user) {
			if(!user) {
				req.session.reset();
				res.status(400);
				return res.json("Please log in");
			}
			else {
				var recipe = new Recipe(req.body);
				recipe.newRecipe(function(err) {
					if(err) {
						console.log("error: ", err);
						return res.json("error creating recipe");
					}
					else {
						return res.json(recipe);
					}
				});
			}	
		});
	}
	else {
		res.status(400);
		return res.json("Please log in");	
	}
}

exports.findRecipe = function(req, res) {
	var query = req.params.id;
	Recipe.findRecipe(query, function(err, doc) {
		if(err) {
			console.log("error: ", err);
			return res.json("error");
		}
		return res.json(doc);
	});
}

exports.findRecipes = function(req, res) {
	Recipe.findRecipes(function(err, docs) {
		if(err) {
			console.log("error: ", err);
			return res.json("error");
		}
		return res.json(docs);
	});
}

exports.findRecipesByCategory = function(req, res) {
	mainCat = req.params.mainCat;
	Recipe.findRecipesByCategory(mainCat, function(err, docs) {
		return res.json(docs)
	});
}

exports.findRecipesByDate = function(req, res) {
	Recipe.findRecipesByDate(function(err, docs) {
		return res.json(docs);
	});
}

exports.findRecipesByRating = function(req, res) {
	Recipe.findRecipesByRating(function(err, docs) {
		return res.json(docs);
	})
}

exports.findAdminRecipes = function(req, res) {
	Recipe.findAdminRecipes(function(err, docs) {
		return res.json(docs);
	});
}