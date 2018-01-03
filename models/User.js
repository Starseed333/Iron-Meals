const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = new Schema({
	// User login information
	email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
         type: String,
         required: true
    },
    lastName: {
         type: String,
         required: true
    },

	// User macro nutrition information
	protein: {
		type: Number,
		required: true,
		default: 150
	},
	fat: {
		type: Number,
		required: true,
		default: 55.55555556
	},
	carbs: {
		type: Number,
		required: true,
		default: 225
	},

	// Fitness and nutrition profile
	diet: {type: String},
	height: {type: Number}, // In inches - convert to ft. in. on client side
	startWeight: {type: Number}, // In pounds
	targetWeight: {type: Number}, // In pounds
	currentWeight: {type: Number}, // In pounds
	age: {type: Number},
	gender: {type: String},
	activityLevel: {type: Number}, // 0 none, 1 some, 2 active, 3 very active
	rateOfChange: {type: Number}, // weekly rate of change (in pounds) ex. 1.2
	calories: {
	    type: Number,
	    default: 2000
    }, // Total calories on users calculations
	proPct: {type: Number},
	fatPct: {type: Number},
	carbPct: {type: Number},

	// Array of each meal plan
	mealplans: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Mealplan"
	}]
});

module.exports = mongoose.model('User', User);