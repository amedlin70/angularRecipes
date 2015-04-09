module.exports = function (app) {
	var recipes = require('../controllers/recipes');
	var users = require('../controllers/users');
	
	// Recipe routes
	app.post('/recipe/addRecipe', recipes.addRecipe);
	app.get('/recipe/:id', recipes.findRecipe);
	
	app.get('/recipes', recipes.findRecipes);
	app.get('/recipes/newest', recipes.findRecipesByDate);
	app.get('/recipes/topRated', recipes.findRecipesByRating);
	app.get('/recipes/adminRecipes', recipes.findAdminRecipes);
	app.get('/recipes/:mainCat', recipes.findRecipesByCategory);
	
	// Login routes
	app.post('/user/login', users.login);
	app.post('/user/register', users.createUser);
	app.get('/user/recipeBox', users.getRecipeBox);
	app.get('/user/logout', users.logout);
}