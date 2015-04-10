exports.requireLogin = function(req, res, next) {
	console.log("Checking if user is logged in.");
	if(!req.user) {
		// res.redirect('/#/login'); 
		res.status(400);
		return res.send("Authentication required.");
	}
	else {
		next();
	}
}
