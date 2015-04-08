module.exports = function (app) {
	var recipes = require('../controllers/recipes');
	
	// Recipe routes
	app.post('/recipe/addRecipe', recipes.addRecipe);
	app.get('/recipe/:id', recipes.findRecipe);
	
	app.get('/recipes', recipes.findRecipes);
	app.get('/recipes/newest', recipes.findRecipesByDate);
	app.get('/recipes/topRated', recipes.findRecipesByRating);
	app.get('/recipes/adminRecipes', recipes.findAdminRecipes);
	app.get('/recipes/:mainCat', recipes.findRecipesByCategory);
	
	// Login routes
	// //app.post('/register', function(req, res));
	// // app.post('/login', function(req, res));

}