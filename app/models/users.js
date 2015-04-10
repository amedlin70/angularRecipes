var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	userName: {type: String, unique: true},
	password: String
});

userSchema.methods = {
	newUser: function(cb) {
		this.save(cb);
	}
};

userSchema.statics = {
	validatePassword: function(user, password, cb) {
		if(user === null) {
			cb(false);
		}
		else if(bcrypt.compareSync(password, user.password)) {
			cb(true);
		}
		else {
			cb(false);
		}
	},

	getUser: function(userName, cb) {
		this.findOne({"userName": userName})
			.exec(cb);
	}
};

mongoose.model('User', userSchema);