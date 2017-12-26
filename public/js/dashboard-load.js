//    User Dash progress bar width
function renderProgress(startWeight, currentWeight, targetWeight) {
     var progressWidth;

     if (startWeight == null || currentWeight == null || targetWeight == null) {
         progressWidth = "width: 0%"
         $("#progress-bar").attr("style", progressWidth)
         return;
     }

     var percent = 0;
     var total = targetWeight - startWeight;

     var progress = targetWeight - currentWeight

     percent = (1- (progress/total)) * 100

     progressWidth = "width: " + percent + "%"

     $("#progress-bar").attr("style", progressWidth)

     $(function() {
        $(".meter > span").each(function() {
            $(this)
                .data("origWidth", $(this).width())
                .width(0)
                .animate({
                    width: $(this).data("origWidth")
                }, 1200);
        });
    });
};

// Create the function for the user dash activity level
function renderActivityLevel(activityLevel) {
    if (activityLevel == 1) {
        $("#activity").text("Sedentary (little or no exercise)");
    } else if (activityLevel == 2) {
        $("#activity").text("Lightly active (light exercise 1-3 days/week)");
    } else if (activityLevel == 3) {
        $("#activity").text("Moderately active (moderate exercise 3-5 days/week)");
    } else if (activityLevel == 4) {
        $("#activity").text("Very active (hard exercise 6-7 days a week)");
    } else if (activityLevel == 5) {
        $("#activity").text("Extra active (very hard exercise & physical job)");
    };
};
// Create the function for the weight rate change by week
function renderRateOfChange(rateOfChange) {
    if (rateOfChange == 1) {
        $("#rateOfChange").text("Gain 1lb per week");
    } else if (rateOfChange == 2) {
        $("#rateOfChange").text("Gain .5lb per week");
    } else if (rateOfChange == 3) {
        $("#rateOfChange").text("Lose .5lb per week");
    } else if (rateOfChange == 4) {
        $("#rateOfChange").text("Lose 1lb per week");
    };
};

// Create the function for the chart that displays users inputs & implement the google.charts
function drawChart(protein, fat, carbs) {
    var proCal = protein * 4
    var fatCal = fat * 9
    var carbCal = carbs * 4

    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(function () {

        var data = google.visualization.arrayToDataTable([
         ['Macronutrient', 'Percentage'],
         ['Protein', proCal],
         ['Carbohydrates', carbCal],
         ['Fat',  fatCal],

        ]);

        var options = {
         is3D: true,
         backgroundColor: { fill:'transparent' }
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    });
};
// UNDER CONSTRUCTION
// Create the sliders for the user use the noUiSlider & the Materialize modals
function renderSliders(proPct, fatPct, carbPct) {
rangeSlider1.noUiSlider.set(proPct)
rangeSlider2.noUiSlider.set(fatPct)
rangeSlider3.noUiSlider.set(carbPct)
}

$(document).ready(function() {
    $.get("/api/user_data").then(function(user) {
    // User info in fitness profile section
        $("#name").text(user.firstName + " " + user.lastName);
        $("#email").text(user.email);
        $("#gender").text(user.gender);
        $("#age").text(user.age);
        $("#height").text(user.height ? user.height + " inches" : '');
        $(".currentWeight").text(user.currentWeight ? user.currentWeight + " lbs." : '');
        $("#startWeight").text(user.startWeight ? user.startWeight + " lbs." : '');
        $("#targetWeight").text(user.targetWeight ? user.targetWeight + " lbs." : '');
        renderActivityLevel(user.activityLevel);
        renderRateOfChange(user.rateOfChange);

        //User info in nutrition profile
        $("#dietPref").text(user.diet);
        $("#totalCalories").text(Math.round(user.calories));
        $("#protein").text(Math.round(user.protein) + "g");
        $("#fat").text(Math.round(user.fat) + "g");
        $("#carbs").text(Math.round(user.carbs) + "g");

        //User info in fitness modal
        $("#gender-input option[value='" + user.gender + "']").attr("selected", "selected");
        $("#activity-level-input option[value='" + user.activityLevel + "']").attr("selected", "selected");
        $("#change-rate-input option[value='" + user.rateOfChange + "']").attr("selected", "selected");
        $("#age-input").attr("value", user.age);
        $("#height-input").attr("value", user.height);
        $("#current-weight-input").attr("value", user.currentWeight);
        $("#start-weight-input").attr("value", user.startWeight);
        $("#target-weight-input").attr("value", user.targetWeight);

        //User info in nutrition modal
        $("#diet-input option[value='" + user.diet + "']").attr("selected", "selected");
        renderSliders(user.proPct, user.fatPct, user.carbPct);

        renderProgress(user.startWeight, user.currentWeight, user.targetWeight);

        drawChart(user.protein, user.fat, user.carbs);
        Materialize.updateTextFields();

        localStorage.setItem('id', user._id);
    });
});
