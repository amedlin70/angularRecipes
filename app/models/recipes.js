var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
	name: String,
	description: String,
	mainCat: String,
	author: String,			// Will point to an user Id eventually
	ingredients: {},
	directions: {},
	dateCreated:  {type: Date, default: Date.now},
	subCat: {},
	rating: {type: Number, default: 5},
	numRatings: {type: Number, default: 1},
	totalRating: {type: Number, default: 5}
});

recipeSchema.methods = {
	newRecipe: function(cb) {
		this.save(cb);
	}
};

recipeSchema.statics = {
	findRecipe: function(query, cb) {
		this.findOne({"_id": mongoose.Types.ObjectId(query)})
			.exec(cb);
	},

	findRecipes: function(cb) {
		this.find()
			.limit(20)
			.exec(cb);
	},

	findRecipesByCategory: function(query, cb) {
		this.find({"mainCat": query}, {_id:0, __v:0})
			.exec(cb);
	},

	findRecipesByDate: function(cb) {
		this.find()
			.sort({"dateCreated": -1})
			.limit(5)
			.exec(cb);
	},

	findRecipesByRating: function(cb) {
		this.find()
			.sort({"rating": -1})
			.limit(20)
			.exec(cb);
	},

	// Will eventually search newest recipes tagged by admin
	findAdminRecipes: function(cb) {
		this.find()
			.limit(5)
			.exec(cb);
	}
};

mongoose.model('Recipe', recipeSchema);