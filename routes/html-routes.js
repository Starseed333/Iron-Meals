const path = require('path');

const isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
	    return next();
	}
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(server){

	server.get('/', function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/home.html"));
	});

	server.get('/dashboard', isAuthenticated, function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/dashboard.html"));
	});

	server.get('/myplan', isAuthenticated, function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/app.html"));
	});

	// Admin use only for now
	server.get('/recipe', function(request, response){
		// response.sendFile(path.resolve(__dirname + "/../public/recipe.html"));
		response.sendFile(path.resolve(__dirname + "/../public/add-recipe.html"));
	});

    /* Handle Logout */
    server.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}
