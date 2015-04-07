(function(){
angular.module('mainModule', [])

.config([function () {
	console.log("Event Module:: config");
}])

.run([function () {
	console.log("Event Module::running");
}])

.controller('MainCtrl', ['$scope','$http', function ($scope,$http) {

	this.index = 0;
	this.recipeIndex = 0;

	this.setIndex=function(val)
	{
		this.index = val;
		if(val > 2 && val < 8){
			this.recipeIndex=1;
		}
		else{
			this.recipeIndex=0;
		}
		console.log("setIndex called")
	}

	this.getIndex=function(){
		return(this.index);
	}

	this.getData = function(){
		var scope = this;
		$http.get('app/data/recipes.json')
  		.success(function(data) {
   			scope.recipes = data;
  		});

        // Get 20 top recipes
        // $http.get('/topRecipes').success(function(data) {
        $http.get('/recipes').success(function(data) {
            console.log("Getting top 20 recipes");
            scope.myRecipes = data;
        });

        // Get 5 newest recipes
        $http.get('/newRecipes').success(function(data) {
            console.log("Getting 5 newest recipes");
            scope.newRecipes = data;
        });

        // Get 5 admin pick recipes
        $http.get('/adminRecipes').success(function(data) {
            console.log("Getting 5 admin pick recipes");
            scope.adminRecipes = data;
        });
	}

	this.getData();
}])


// directives
.directive('popularRecipeItem', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment   
        /*      
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'         },
            */
        templateUrl: 'app/views/popularRecipeItem.html',
       
        controller: function($scope){

        }, //Embed a custom controller in the directive

        link: function ($scope, element, attrs) { } //DOM manipulation
    }
})

.directive('newRecipeItem', function () {
    return {
        restrict: 'E', 
        
        templateUrl: 'app/views/newRecipeItem.html',
       
        controller: function($scope){

        }, //Embed a custom controller in the directive

        link: function ($scope, element, attrs) { } //DOM manipulation
    }
})

.directive('adminRecomendationItem', function () {
    return {
        restrict: 'E', 

        templateUrl: 'app/views/adminRecomendationItem.html',
       
        controller: function($scope){

        }, //Embed a custom controller in the directive

        link: function ($scope, element, attrs) { } //DOM manipulation
    }
})

.directive('viewRecipeItem', function () {
    return {
        restrict: 'E', 
        templateUrl: 'app/views/viewRecipeItem.html',
        link: function ($scope, element, attrs) { } //DOM manipulation
    }
})


})();