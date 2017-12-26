const React = require('react');
const createReactClass = require('create-react-class');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
// import the react pie chart 
import {Pie} from 'react-chartjs-2';

const pieceLabel = require('chart.piecelabel.js');

// Each of these is a column to be used in the calendar view
const Day = createReactClass({

	render: function(){

		// Recalculate macros when rendering
		var carbs = 0;
		var protein = 0;
		var fat = 0;
		var calories = 0;

		var userMacros = this.props.userMacros;

		for(var i = 0; i < this.props.meals.length; i++){
			carbs += this.props.meals[i].carbs;
			protein += this.props.meals[i].protein;
			fat += this.props.meals[i].fat;
			calories += this.props.meals[i].calories;
		}

		calories = Math.floor(calories);

		var totalMac = carbs + protein + fat;

		// Calculate macro daily ratio
		if(totalMac > 0){
			var carbRatio = ((carbs/totalMac) * 100).toFixed(1);
			var proteinRatio = ((protein/totalMac) * 100).toFixed(1);
			var fatRatio = ((fat/totalMac) * 100).toFixed(1);
		} else {
			carbRatio = 0;
			proteinRatio = 0;
			fatRatio = 0;
		}

		// Determine differences for border

		var maxCalories = Math.floor(userMacros.calories);
		var caloriePercent = ((calories/maxCalories)*100).toFixed(1);

		// Determine differences for border shading
		var userMacros = this.props.userMacros;

		totalMac = userMacros.carbs + userMacros.protein + userMacros.fat;

		if(totalMac > 0){
			var carbMacPct = ((userMacros.carbs / totalMac)*100);
			var proteinMacPct = ((userMacros.protein / totalMac)*100);
			var fatMacPct = ((userMacros.fat / totalMac)*100);
		} else {
			carbMacPct = proteinMacPct = fatMacPct = 33.33;
		}
		
		var carbDiff = Math.abs(carbRatio - carbMacPct);
		var proteinDiff = Math.abs(proteinRatio - proteinMacPct);
		var fatDiff = Math.abs(fatRatio - fatMacPct);

		// Set colors - 0 - 10 diff normal, 10-20 diff yellow, 20+ diff red
		var borderColor = ['rgba(255, 255, 255, 1', 'rgba(255, 255, 255, 1', 'rgba(255, 255, 255, 1'];
		if(carbDiff >= 20){
			borderColor[0] = 'rgba(209, 29, 29, .8';
		} else if(carbDiff >= 10){
			borderColor[0] = 'rgba(244, 229, 66, .8';
		}

		if(proteinDiff >= 20){
			borderColor[1] = 'rgba(209, 29, 29, .8';
		} else if(proteinDiff >= 10){
			borderColor[1] = 'rgba(244, 229, 66, .8';
		}

		if(fatDiff >= 20){
			borderColor[2] = 'rgba(209, 29, 29, .8';
		} else if(fatDiff >= 10){
			borderColor[2] = 'rgba(244, 229, 66, .8';
		}

		var hoverBorderColor = borderColor;

		var pieData = {
			datasets: [{
				data: [carbRatio, proteinRatio, fatRatio],
				backgroundColor: ['rgba(67, 101, 224, .5)', 'rgba(172, 67, 224, .5)', 'rgba(45, 237, 89, .5)'],
				hoverBackgroundColor: ['rgba(67, 101, 224, .9)', 'rgba(172, 67, 224, .9)', 'rgba(45, 237, 89, .9)'],
				borderColor: borderColor,
				hoverBorderColor: hoverBorderColor,
				options: {
					pieceLabel: {
						mode: 'percent',
						precision: 1
					}
				},
			}],
			labels: ['Carbs %','Protein %','Fat %'],
		}
		// Create a list for each recipe in a day
		return (
			<div className='day-column' onClick={ () => this.props.clickDay(this.props.dayNum) } >
				<div className='day-name center-align'>
					<h3>{ this.props.day }</h3>
				</div>

				<div className="divider"></div>
					<div className='center-align'>

							<Pie data={pieData} />
							<p className='calories-txt'>Calories: {calories}/{maxCalories} ({caloriePercent}%)</p>
					</div>

					<div className='recipe-area'>
					<ReactCSSTransitionGroup
						transitionName="popout"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={250}
						transitionLeave={true} >

					
							{this.props.meals.map((recipe, i) => {
								return (
									<div className='day-recipe wobble' key={i} 
										style={{backgroundImage: 'url(' + recipe.image + ')', backgroundSize: 'cover'}}>

										<div className='day-recipe-tl'>
											<h3 className='recipe-name'><a href={recipe.url} target='_blank'><span className='recipe-span'>{recipe.name}</span></a></h3>
										</div>

										<div className='day-recipe-tr'>
											<a href='#' className='btn-delete'><p className='btn-delete' onClick={ this.props.removeRecipe.bind(null, this.props.dayNum, i) }>
												<i className="material-icons delete-meal">delete</i></p></a>
										</div>

										<div className='day-recipe-body'>
											<p>Recipe by {recipe.creator}</p>
											<p className='macro-text'>Carbs: {recipe.carbs}g | Protein: {recipe.protein}g | Fat: {recipe.fat}g | Calories: {recipe.calories}</p>
										</div>
									</div>
								)
							})}
					</ReactCSSTransitionGroup>
					</div>
				</div>
							
		)
	}

});

module.exports = Day;
