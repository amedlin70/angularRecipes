/*Angular Modules take a name, best practice is lowerCamelCase, and a list of dependancies*/
/*added the second module as a dependancy */
angular.module('app', ['mainModule','recipeModule','addRecipeModule','recipesModule','loginModule','recipeBoxModule','ngRoute','ui.router'])
.config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {

    $stateProvider
        .state("home", {
          // Use a url of "/" to set a states as the "index".
          url: "/home",
          templateUrl: 'app/views/home.html'
        })
        .state("recipe", {
          url: "/recipe/:recipeID",
          controller: 'RecipeCtrl as recipeCtrl',
          templateUrl: 'app/views/recipe.html'
        })
        .state("recipes", {
          url: "/recipes/:mainCat/:subCat",
          controller: 'RecipesCtrl as recipesCtrl',
          templateUrl: 'app/views/recipes.html'
        })
        .state("addRecipe", {
          url: "/addRecipe",
          controller: 'AddRecipeCtrl as addRecipeCtrl',
          templateUrl: 'app/views/addRecipe.html'
        })
        .state("login", {
          url: "/login",
          controller: 'LoginCtrl as loginCtrl',
          templateUrl: 'app/views/login.html'
        })
        .state("createAccount", {
          url: "/createAccount",
          controller: 'LoginCtrl as loginCtrl',
          templateUrl: 'app/views/createAccount.html'
        })
        .state("recipeBox", {
          url: "/recipeBox",
          controller: 'RecipeBoxCtrl as recipeBoxCtrl',
          templateUrl: 'app/views/recipeBox.html'
        })
        $urlRouterProvider.otherwise('/home');
        $urlRouterProvider.when('', '/home');
   
  }])

.run([function () {
	/* Run is when the app gets kicked off*/
}])