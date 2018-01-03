const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Mealplan = new Schema({
	// Date of start of week
	startDate: {
		type: Date,
		required: true
	},
	
	// 2D array format for the data in the form of the table/chart to be used
	meals:[
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}]
	]
});

module.exports = mongoose.model('Mealplan', Mealplan);
