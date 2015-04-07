(function(){
angular.module('recipesModule', [])

.config([function () {
	console.log("Recipes Module:: config");
}])

.run([function () {
	console.log("Recipes Module::running");
}])

.controller('RecipesCtrl', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
    if($stateParams.mainCat){
     	$scope.mainCat = $stateParams.mainCat;
    }
    else{
      	$scope.mainCat = '';
    }
    if($stateParams.subCat){
      	$scope.subCat = $stateParams.subCat;  
    }
    else{
      	$scope.subCat = '';
    }

    //Query mongodb
    $http.get('/recipes/' + $scope.mainCat).success(function(response){
    	console.log("Received get response: ", response);
    	$scope.recipes = response;
  	});
}])


})();