const React = require('react');
const createReactClass = require('create-react-class');
const moment = require('moment');

// Include Day sub component
const Day = require('./children/Day');

const Planner = createReactClass({

	clickDay: function(day){
		// Runs when you click a "day" column
		// Check first if clickAdd is true - signals that a recipe from search was clicked first
		if(this.props.clickAdd){
			// Add the current recipe to the meal plan day, then reset
			this.props.addToMealPlan(day);
		}
	},

	// Called when delete button is clicked for a recipe
	removeRecipe: function(day, recipe){
		this.props.removeFromMealPlan(day, recipe);
	},

	render: function(){
		// console.log(this.props.mealPlan);
		var showDate = moment(this.props.startDate).format('dddd, MMMM Do');
		// Meal Dates
		// Add buttons for controlling the planner
		// Include the meal plan area
		return (
			<div className='row'>
				<div className='col s12'>
					<div className='app-wrapper'>

						
						<h4 id='plan-date' className='center-align'>My meals for the week starting {showDate}</h4>
						
						<div className='row'>
							<div className='col s12'>
								<div className='center-align'>
									{/*<a className="waves-effect waves-light btn blue lighten-1">Previous Plans</a>*/}
									<a className="waves-effect waves-light btn blue lighten-1" onClick={this.props.clearPlan}>Clear</a>
									<a className={"waves-effect waves-light btn lighten-1 " + this.props.saveColor} onClick={this.props.savePlan}>Save Plan</a>

								</div>
							</div>
						</div>
						
						<div className='row'>
							<div className='col s12'>
								<div id='calendar'>

									<Day day='Sunday' dayNum={0} meals={this.props.mealPlan.meals[0]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} userMacros={this.props.userMacros}/>
									<Day day='Monday' dayNum={1} meals={this.props.mealPlan.meals[1]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} userMacros={this.props.userMacros} />
									<Day day='Tuesday' dayNum={2} meals={this.props.mealPlan.meals[2]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} userMacros={this.props.userMacros} />
									<Day day='Wednesday' dayNum={3} meals={this.props.mealPlan.meals[3]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} userMacros={this.props.userMacros} />
									<Day day='Thursday' dayNum={4} meals={this.props.mealPlan.meals[4]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} userMacros={this.props.userMacros} />
									<Day day='Friday' dayNum={5} meals={this.props.mealPlan.meals[5]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} userMacros={this.props.userMacros} />
									<Day day='Saturday' dayNum={6} meals={this.props.mealPlan.meals[6]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} userMacros={this.props.userMacros} />

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Planner;
