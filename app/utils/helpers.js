import axios from "axios";


var qs = require('qs');

module.exports = {
	// Search for recipes based on term
	searchRecipes: function(searchTerm){
		return axios.get('/api/recipes/' + searchTerm);
	},

	getUserInfo: function(userId){
		return axios.get('/api/user/' + userId);
	},

	getMealPlan: function(planId){
		return axios.get('/api/mealplan/' + planId);
	},

	createEmptyMealPlan: function(date, userId){
		return axios.post('/api/mealplan/' + userId + '/' + date);
	},

	saveMealPlan: function(meals, planId){
		return axios.put('/api/mealplan/' + planId, qs.stringify(meals));
	}
}
