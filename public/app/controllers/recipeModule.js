(function(){
angular.module('recipeModule', [])

.config([function () {
	console.log("Recipe Module:: config");
}])

.run([function () {
	console.log("Recipe Module::running");
}])

.controller('RecipeCtrl', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
	$scope.recipeID = $stateParams.recipeID;

	this.getData = function(){
		var scope = this;
		$http.get('/recipe/' + $scope.recipeID)
		.success(function(response) {
	    	scope.recipe = response;

	  
			// Map rating to star form
			$('span.stars').stars(scope.recipe.rating);

			// Create path
			scope.recipePath = [
				{"link" : "recipes", "name" : "recipes"},
				{"link" : "recipes({mainCat: '" + scope.recipe.mainCat + "', subCat: 'all'})", "name" : scope.recipe.mainCat}
			];


			console.log("scope.recipePath", scope.recipePath);
  		});


	}

	this.getData();

	
}])


})();