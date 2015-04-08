var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

exports.addRecipe = function(req, res) {
	// Verify req.body is valid before sending it to the model
	console.log("Creating recipe: ", req.body);
	
	var recipe = new Recipe(req.body);
	recipe.newRecipe(function(err) {
		if(err) {
			console.log("error: ", err);
			return res.json("error creating recipe");
		}
		return res.json(recipe);
	});
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