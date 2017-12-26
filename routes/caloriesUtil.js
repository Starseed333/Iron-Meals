// calculate basal metabolic rate
function calculateBMR(gender, height, currentWeight, age) {
    var userBMR = 0;
    if (gender === "Male") {
        userBMR = 666 + 6.2 * currentWeight + 12.7 * height - 6.76 * age
    } else if (gender === "Female") {
       userBMR = 655.1 + 4.35 * currentWeight + 4.7 * height - 6.76 * age
    }
    return userBMR;
};

// calculate daily caloric needs
function calculateDCN(BMR, activityLevel) {
    var userDCN = 0;
    if (activityLevel == 1) {
        userDCN = BMR * 1.2
    } else if (activityLevel == 2) {
        userDCN = BMR * 1.375
    } else if (activityLevel == 3) {
        userDCN = BMR * 1.55
    } else if (activityLevel == 4) {
        userDCN = BMR * 1.725
    } else if (activityLevel == 5) {
        userDCN = BMR * 1.9
    }
    return userDCN;
};
// calculate users rate of change by the average
//calculate the free form fitnes UNDER CONSTRUCTION
module.exports = {
    calculateFFF: function(user) {
         var userBMR = calculateBMR(user.gender, user.height, user.currentWeight, user.age);
        var DCN = calculateDCN(userBMR, user.activityLevel);
        var ROC = user.rateOfChange;
        var userFFF = [];
        var proteinGram = 0;
        var carbGram = 0;
        var fatGram = 0;

        var userCalories = 0;
        if (ROC == 1) {
            userCalories = DCN + 500;
        } else if (ROC == 2) {
            userCalories = DCN + 250;
        } else if (ROC == 3) {
            userCalories = DCN - 250;
        } else if (ROC == 4) {
            userCalories = DCN - 500;
        }
        userFFF.push(userCalories);

        if (user.proPct == null || user.fatPct == null || user.carbPct == null) {
            proteinGram = 0.3 * userCalories / 4;
            userFFF.push(proteinGram);

            fatGram = 0.25 * userCalories / 9;
            userFFF.push(fatGram);

            carbGram = 0.45 * userCalories / 4;
            userFFF.push(carbGram);

        } else {
            var proPct = parseInt(user.proPct)/100;
            var fatPct = parseInt(user.fatPct)/100;
            var carbPct = parseInt(user.carbPct)/100;

            proteinGram = proPct * userCalories / 4;
            userFFF.push(proteinGram);

            fatGram = fatPct * userCalories / 9;
            userFFF.push(fatGram);

            carbGram = carbPct * userCalories / 4;
            userFFF.push(carbGram);

        }
        return userFFF;
    },
    // calculate the users macro nutrients by the average protein grams, fats, carbs, by the average 
    calculatePFC: function(user) {
        var userCalories = user.calories;
        var userMacro = [];

        if (user.proPct == null || user.fatPct == null || user.carbPct == null) {
            proteinGram = 0.3 * userCalories / 4;
            userMacro.push(proteinGram);

            fatGram = 0.25 * userCalories / 9;
            userMacro.push(fatGram);

            carbGram = 0.45 * userCalories / 4;
            userMacro.push(carbGram);

        } else {
            var proPct = parseInt(user.proPct)/100;
            var fatPct = parseInt(user.fatPct)/100;
            var carbPct = parseInt(user.carbPct)/100;

            proteinGram = proPct * userCalories / 4;
            userMacro.push(proteinGram);

            fatGram = fatPct * userCalories / 9;
            userMacro.push(fatGram);

            carbGram = carbPct * userCalories / 4;
            userMacro.push(carbGram);
        }
        return userMacro;
    }
};