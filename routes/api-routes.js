console.log('inside api-routes.js');

var passport = require('passport');

// Set up and connect to database
const mongoose = require('mongoose');
//require from calorie calculation @ utils
var caloriesUtil = require('./caloriesUtil');
var calculateFFF = caloriesUtil.calculateFFF;
var calculatePFC = caloriesUtil.calculatePFC;

// Require all models
var User = require('../models/User.js');
var Mealplan = require('../models/Mealplan.js');
var Recipe = require('../models/Recipe.js');

// For scraping
var urlrequest = require('request');
var cheerio = require('cheerio');

var measurements = ['teaspoon', 'teaspoons', 'tablespoon', 'tablespoons', 'cup', 'cups', 'pound', 'pounds', 'whole',
'clove', 'cloves', 'head', 'can', 'cans', 'stalk', 'stalks', 'pinch', 'container', 'jar', 'jars',
 'pint', 'pints', 'ounce', 'ounces', 'gallon', 'gallons', 'small', 'medium', 'large'];

function isMeasurement(word){
	if(measurements.indexOf(word.toLowerCase()) !== -1){
		return true;
	}
	return false;
}

module.exports = function(server){

		/* Handle Login POST */
	server.post('/login', passport.authenticate('login',
		{
            successRedirect: '/dashboard',
            failureRedirect: '/',
		})
	);

    /* Handle Registration POST */
    server.post('/signup', passport.authenticate('signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup',
    }));

    // Route for getting some data about our user to be used client side
     server.get("/api/user_data", function(req, res) {
       if (!req.user) {
         // The user is not logged in, send back an empty object
         res.json({});
       }
       else {
        // Otherwise send back the user's email, first name, and id
           res.send(req.user)
       }
     });

    // Route to update user's fitness profile
    server.post("/api/user_data", function(req, res) {
        var newUser = Object.assign({}, req.user.toJSON(), req.body);
        var cals = calculateFFF(newUser);
        User.findOneAndUpdate({"_id": req.user.id},
            {
            height: newUser.height,
            startWeight: newUser.startWeight,
            targetWeight: newUser.targetWeight,
            currentWeight: newUser.currentWeight,
            age: newUser.age,
            gender: newUser.gender,
            activityLevel: newUser.activityLevel,
            rateOfChange: newUser.rateOfChange,
            calories: cals[0],
            protein: cals[1],
            fat: cals[2],
            carbs: cals[3]
            }
        ).exec(function(err, doc) {
             // Log any errors
             if (err) {
               console.log(err);
             }
             else {
               // Or send the document to the browser
               res.send(doc);
             }
           });
    });

    // Route to update user's nutrition info
    server.post("/api/user_data/nutrition", function(req, res) {
        var newUser = Object.assign({}, req.user.toJSON(), req.body);
        var cals = calculatePFC(newUser);
        User.findOneAndUpdate({"_id": req.user.id},
            {
            diet: req.body.diet,
            proPct: req.body.proPct,
            fatPct: req.body.fatPct,
            carbPct: req.body.carbPct,
            protein: cals[0],
            fat: cals[1],
            carbs: cals[2]
            }
            ).exec(function(err, doc) {
             // Log any errors
                 if (err) {
                   console.log(err);
                 }
                 else {
                 doc.diet = req.body.diet;
                   // Or send the document to the browser
                   res.send(doc);
                 }
           });
    })

	// Create a new recipe
	server.post('/api/recipe', function(request, response){
		Recipe.create(request.body, function(error, recipe){
			if(error) throw error;
			response.json(recipe);
		});
	});

	// Create a new meal plan
	server.post('/api/mealplan/:userId/:date', function(request, response){
		var date = parseInt(request.params.date);
		var userId = request.params.userId;

		var arr = { meals: [[],[],[],[],[],[],[]] };

		Mealplan.create({startDate: date, mealplan: arr}, function(error, mealplan){
			if(error) throw error;
			
			User.findOneAndUpdate({_id: userId}, {$push: {'mealplans': mealplan._id} },
			{new: true}, function(error, article){
				response.json(mealplan);
			});
		});
	});

	// Get user info (populate with meal plans)
	server.get('/api/user/:id', function(request, response){
		User.findOne({ _id: request.params.id }).populate('mealplans').exec(function(error, user){
			if(error) throw error;
			response.json(user);
		});
	});

	// Get meal plan info (populate with recipes)
	server.get('/api/mealplan/:id', function(request, response){
		Mealplan.findOne({ _id: request.params.id })
			.populate({
				path: 'meals',
				model: 'Recipe'
			}).exec(function(error, mealplan){
			if(error) throw error;

			response.json(mealplan);
		});
	});

	server.get('/api/shoppinglist/:userId', function(request, response){
		// First get the user ID
		User.findOne({ _id: request.params.userId }).populate('mealplans').exec(function(error, user){
			if(error) throw error;
			
			// Get latest meal plan ID
			var planId = user.mealplans[user.mealplans.length - 1]._id;

			// Get recipes for that meal plan
			Mealplan.findOne({ _id: planId })
				.populate({
					path: 'meals',
					model: 'Recipe'
				}).exec(function(error, mealplan){
				if(error) throw error;

				var shoppingList = [];
				// Go through each meal and add ingredients to list

				for(var i = 0; i < 7; i++){
					if(mealplan.meals[i].length){
						for(var j = 0; j < mealplan.meals[i].length; j++){
							for(k = 0; k < mealplan.meals[i][j].ingredients.length; k++){
								shoppingList.push(mealplan.meals[i][j].ingredients[k].ingredient);
							}
						}
					}
				}

				var minList = [];
				var minAmount = [];
				for(var i = 0; i < shoppingList.length; i++){
					var index = minList.indexOf(shoppingList[i]);
					if(index === -1){
						minList.push(shoppingList[i]);
						minAmount.push(1);
					} else {
						minAmount[index]++;
					}
				}

				var finalList = [];
				for(var i = 0; i < minList.length; i++){
					finalList[i] = {
						ingredient: minList[i],
						amount: minAmount[i]
					}
				}

				if(finalList.length > 0){
					response.json(finalList);
				} else {
					response.json([]);
				}
			});
		});
	});

	server.put('/api/mealplan/:id', function(request, response){
		var arr = { meals: [[],[],[],[],[],[],[]] }
		var data = request.body;
		var planId = request.params.id;

		for(var i = 0; i < 7; i ++){
			key = i.toString();
			if(key in data){
				data[key].map(function(id){
					arr.meals[i].push(id);
				})
			}
		}

		Mealplan.findOneAndUpdate({_id: planId}, {$set: {meals: arr.meals}}, function(error, mealplan){
			if(error) throw error;
		});
	});

	// Search for all recipes based on search term
	server.get('/api/recipes/:search', function(request, response){

		var search = request.params.search.toLowerCase().trim();
		var searchArray = search.split(' ');
		var resultsItems = [];
		var resultsRank = [];

		// This is the no-time-left search algirithm. Needs to be worked on.

		// First get all recipes
		Recipe.find({}, function(error, recipes){
			if(error) throw error;
			
			// Go through each recipe
			for(var i = 0; i < recipes.length; i++){
				var recipeName = recipes[i].name.toLowerCase();
				var recipeMeal = recipes[i].meal.toLowerCase();
				var recipeTags = recipes[i].tags;
				var recipeRank = 0;
				var addRecipe = false;

				// Add if search term is a meal
				if(searchArray.indexOf(recipeMeal) !== -1){
					addRecipe = true;
					recipeRank += 4;
				}

				// Make each tag lower case
				for(var j = 0; j < recipeTags.length; j++){
					recipeTags[j] = recipeTags[j].toLowerCase();
				}

				// Go through each word in the search array
				for(var j = 0; j < searchArray.length; j++){
					// If the word is in the title, add to resultsItems and add points for ranking
					var testWord = searchArray[j];
					if(recipeName.indexOf(testWord) !== -1){
						addRecipe = true;
						recipeRank += 2 + (testWord.length);
					}

					if(recipeTags.indexOf(testWord) !== -1){
						addRecipe = true;
						recipeRank += (testWord.length);
					}
				}

				if(addRecipe){
					resultsItems.push(recipes[i]);
					resultsRank.push(recipeRank);
				}
			}

			// Now order the arrays based on the results ranking
			for(var i = 0; i < resultsRank.length - 1; i++){
				for(var j = i + 1; j < resultsRank.length; j++){
					if(resultsRank[j] > resultsRank[i]){
						var rankTemp = resultsRank[i];
						resultsRank[i] = resultsRank[j]
						resultsRank[j] = rankTemp;

						var itemTemp = resultsItems[i];
						resultsItems[i] = resultsItems[j]
						resultsItems[j] = itemTemp;
					}
				}
			}

			response.json(resultsItems);
		});

	});

// Scrape recipe from food site///////////////////////////////////
	server.post('/api/scrape/', function(request, response){
		
		var url = request.body.url;
		var meal = request.body.meal;
		var tags = request.body.tags;
		var vegetarian = request.body.vegetarian;
		var vegan = request.body.vegan;

		Recipe.findOne({url: url}, function(error, recipe){
			console.log(error || recipe);
			// Only add if the recipe is not yet in the database
			if(!recipe){

				//Scrape Allrecipes
				if(url.toLowerCase().indexOf('allrecipes.com') !== -1){

					// Get url data
					urlrequest(url, function(err, rsp, html){

						console.log("error:", err);
						console.log("rsp:", rsp)
						var $ = cheerio.load(html);

						// Get recipe title
						var recipeName = $('h1.recipe-summary__h1').text();
						console.log(recipeName || "test");
						var recipeImage = $('.rec-photo').attr('src');
						var recipeCreator = 'Allrecipes.com';
						var recipeServings = parseInt($('#servings').attr('data-original'));

						// Nutrients
						var recipeCarbs = parseFloat($('[itemProp=carbohydrateContent]').children().first().text());
						var recipeProtein = parseFloat($('[itemProp=proteinContent]').children().first().text());
						var recipeFat = parseFloat($('[itemProp=fatContent]').children().first().text());
						var recipeCalories = parseInt($('[itemProp=calories]').children().first().text());

						// Get ingredients list
						var ingredients = [];
						$('.recipe-ingred_txt').each(function(i, element){
							var ingd = $(this).text();
							if(ingd != '' && ingd != 'Add all ingredients to list'){
								ingredients.push(ingd);
							}
						});

						// Parse list into readable format
						var ingredientsFormatted = [];
						for(var i = 0; i < ingredients.length; i++){

							var amount = '';
							var measurement = '';
							var ingredient = '';

							var tmplist = ingredients[i].split(' ');

							var measureFound = false;
							// Find the measurement
							for(var j = 0; j < tmplist.length; j++){
								if(isMeasurement(tmplist[j])){
									measureFound = true;
									amount = tmplist.slice(0, j).join(' ');
									measurement = tmplist[j];
									ingredient = tmplist.slice(j + 1).join(' ');
								}
							}

							// If there isn't a measurement, add all numbers to amount and everything else to ingredient
							if(!measureFound){
								var j = 0;
								while(j < tmplist.length){
									if(isNaN(parseInt(tmplist[j])) && tmplist[j][0] != '('){
										amount = tmplist.slice(0, j).join(' ');
										ingredient = tmplist.slice(j).join(' ');
										break;
									}
									j++;
								}
							}

							ingredientsFormatted.push({
								amount: amount,
								measurement: measurement,
								ingredient: ingredient
							});
						}

						var newRecipe = {
							name: recipeName,
							url: url,
							image: recipeImage,
							creator: recipeCreator,
							servings: recipeServings,
							protein: recipeProtein,
							carbs: recipeCarbs,
							fat: recipeFat,
							calories: recipeCalories,
							meal: meal,
							tags: tags,
							vegetarian: vegetarian,
							vegan: vegan,
							ingredients: ingredientsFormatted
						}
						
						Recipe.create(newRecipe, function(error, recipe){
							if(error) throw error;
							response.send('Added ' + recipe.name);
						});
					});
				} else {
					response.send('Pick a different site!');
				}
			} else {
				response.send('Recipe already added!');
			}
		});
	});
}
