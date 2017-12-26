// UNDER CONSTRUCTION - MacroSlider 
$(document).ready(function() {
    var saveButton = $("#save-nutrition-button");
    var dietInput = $("#diet-input");
    var proPct = 0;
    var fatPct = 0;
    var carbPct = 0;



    noUiSlider.create(rangeSlider1, {
                start: [ 30 ],
                step: 1,
                range: {
                    'min': [  10 ],
                    'max': [ 40 ]
        }
    });

    var rangeSliderValueElement = document.getElementById('slider-range-value1');

    rangeSlider1.noUiSlider.on('update', function( values, handle ) {
        rangeSliderValueElement.innerHTML = values[handle];
    });

    //Fat Slider

    noUiSlider.create(rangeSlider2, {
        start: [ 25 ],
        step: 1,
        range: {
            'min': [  10 ],
            'max': [ 40 ]
        }
    });



    var rangeSliderValueElement2 = document.getElementById('slider-range-value2');

    rangeSlider2.noUiSlider.on('update', function( values, handle ) {
        rangeSliderValueElement2.innerHTML = values[handle];
    });

    //Carb Slider

    noUiSlider.create(rangeSlider3, {
        start: [ 45 ],
        step: 1,
        range: {
            'min': [  0 ],
            'max': [ 60 ]
        }
    });

    var rangeSliderValueElement3 = document.getElementById('slider-range-value3');

    rangeSlider3.noUiSlider.on('update', function( values, handle ) {
        rangeSliderValueElement3.innerHTML = values[handle];
    });

    function setPct(){
        proPct = rangeSlider1.noUiSlider.get()
        fatPct = rangeSlider2.noUiSlider.get()
        carbPct = rangeSlider3.noUiSlider.get()
         var totalPct = parseInt(proPct) + parseInt(fatPct) + parseInt(carbPct)
        $("#total-percent").text(totalPct)
    };

    setPct();

    rangeSlider1.noUiSlider.on('change', setPct);
    rangeSlider2.noUiSlider.on('change', setPct);
    rangeSlider3.noUiSlider.on('change', setPct);


    saveButton.on("click", function(event) {
        var macroTotal = parseInt(proPct) + parseInt(fatPct) + parseInt(carbPct)
        console.log(macroTotal)
      if (macroTotal === 100) {
         var nutritionData = {
             diet: dietInput.val(),
             proPct: proPct,
             fatPct: fatPct,
             carbPct: carbPct
         };

         updateNutrition(nutritionData);

         $('#nutrition-modal').modal('close');
      } else {
        Materialize.toast('Macros percentage not equal 100%.', 4000);
      }
    });

//    Update nutrition 
    function updateNutrition(nutritionData) {
        $.post("/api/user_data/nutrition", nutritionData).then(function(data) {
            window.location.replace('/dashboard');
          // If there's an error, log the error
        }).catch(function(err) {
          console.log(err);
        });
      };
})