const React = require('react');
const ReactDOM = require('react-dom');
const createReactClass = require('create-react-class');
var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup') // ES5 with npm

const Search = createReactClass({

	getInitialState: function(){

		var randList = ['shrimp', 'white rice', 'lunch', 'easy meal', 'Italian', 'steak', 'kale', 'turkey',
				'spicy', 'chinese', 'pepper', 'snack', 'cheese', 'chicken', 'salmon', 'bread']
		var searchDefault = randList[Math.floor(Math.random() * randList.length)];
		
		return {
			searchTerm: '',
			addRecipe: {},
			searchDefault: searchDefault,
			filter: {
				breakfast: true,
				lunch: true,
				dinner: true,
				snack: true
			},
			filterResults: [],
			updateFilter: false
		}
	},

	componentWillReceiveProps: function(){
		this.setState({updateFilter: true});
	},

	componentDidUpdate: function(){
		if(this.state.updateFilter){

			// Convert filter to array
			var allowed = [];
			var f = this.state.filter;
			if(f.breakfast) allowed.push('breakfast');
			if(f.lunch) allowed.push('lunch');
			if(f.dinner) allowed.push('dinner');
			if(f.snack) allowed.push('snack');

			var filterResults = [];

			if(this.props.searchResults.length !== 0){
				for(var i = 0; i < this.props.searchResults.length; i++){
					// If item meal is in allowed, add to filtered results;
					if(allowed.indexOf(this.props.searchResults[i].meal) !== -1){
						filterResults.push(this.props.searchResults[i]);
					}
				}
			}

			this.setState({
				updateFilter: false,
				filterResults: filterResults
			});
		}
	},

	// As user types in search box this will update
	changeSearch: function(event){
		this.setState({ searchTerm: event.target.value });
	},

	// When search button is pressed, send to parent component
	sendSearch: function(event){
		this.props.setSearch(this.state.searchTerm);
	},

	// When click button to add recipe, add to parent component
	addRecipe: function(day, recipeNum){
		this.props.addToMealPlan(day, this.props.searchResults[recipeNum]);
	},

	toggleCheckbox: function(meal){

		var updateObj = this.state.filter;
		updateObj[meal] = !updateObj[meal];

		this.setState({
			filter: updateObj,
			updateFilter: true
		});
	},
	// UNDER CONSTRUCTION
	// Include the search bar and button and form here
	//Include the table for the day
	render: function(){
		console.log('i was triggered during render search.js');
		return (

			<div id='search-bar'>
				<div id='pull-search' className='center-align valign-wrapper'>
					<a href='#'><i className="material-icons no-select">search</i></a></div>

				<div className='row'>
					<div className='col sm12 center-align'>
						<h3 className='search-header'>Search for Recipes</h3>
						
						<input value={this.state.searchTerm} onChange={this.changeSearch} className='center-align'
							id='search-term' placeholder={this.state.searchDefault}/>

						<a className="waves-effect waves-light btn blue lighten-1" onClick={this.sendSearch}>Search</a>
						<a className="waves-effect waves-light btn blue lighten-1" href='#recipe-modal'>Add</a>

						<form>
							<p>
							<input className='checkbox-blue' type="checkbox" id="breakfast"
								onChange={this.toggleCheckbox.bind(null, 'breakfast')} checked={this.state.filter.breakfast}/>
							<label htmlFor="breakfast">Breakfast</label>
							<br/>
							<input className='checkbox-blue' type="checkbox" id="lunch"
								onChange={this.toggleCheckbox.bind(null, 'lunch')} checked={this.state.filter.lunch}/>
							<label htmlFor="lunch">Lunch</label>
							<br/>
							<input className='checkbox-blue' type="checkbox" id="dinner"
								onChange={this.toggleCheckbox.bind(null, 'dinner')} checked={this.state.filter.dinner}/>
							<label htmlFor="dinner">Dinner</label>
							<br/>
							<input className='checkbox-blue' type="checkbox" id="snack"
								onChange={this.toggleCheckbox.bind(null, 'snack')} checked={this.state.filter.snack}/>
							<label htmlFor="snack">Snack</label>
							</p>
						</form>
					</div>
				</div>

				<div className='row'>
					<div className='col sm12'>
						<div className='search-results' >

							<CSSTransitionGroup
							transitionName="popout"
							transitionEnterTimeout={250}
							transitionLeaveTimeout={250}>
							
							{this.state.filterResults.map((recipe, i) => {
								return (
									<div key={i} className='search-result'>
										<div className='search-recipe-name'>
											<h3 ><a href={recipe.url} target='_blank'>{recipe.name}</a></h3>
										</div>

										<p className='macro-text'>Carbs: {recipe.carbs}g | Protein: {recipe.protein}g | Fat: {recipe.fat}g | Calories: {recipe.calories}</p>
										<p className='small-text'>Meal: {recipe.meal}</p>
										<p className='small-text'>Tags: 

										{recipe.tags.map((tag, i) => {
											return (
												<span key={i}> {tag}, </span>
											)
										})} </p>

										<div className='center-align'>

											<table className='add-day'>
												<tbody>
												<tr>
													<td>Add:</td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 0, i)} >S</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 1, i)} >M</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 2, i)} >T</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 3, i)} >W</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 4, i)} >T</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 5, i)} >F</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 6, i)} >S</a></td>
												</tr>
												</tbody>
											</table>
										
										</div>
									</div>
								)
							})}
							</CSSTransitionGroup>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Search;