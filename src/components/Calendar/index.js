// External Dependencies
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Modal from 'react-modal';
import List from 'react-icons/lib/fa/edit';
import CalendarIcon from 'react-icons/lib/fa/sticky-note-o';

// Our Dependencies
import { fetchRecipes } from '../../utils/api';
import { capitalize } from '../../utils/helpers';
import { addRecipe } from '../../actions';

// Our Components
import FoodModal from './FoodModal';
import ShoppingList from '../ShoppingList';

// Redux
function mapStateToProps({ food, calendar }, { mealOrders }) {
  
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];
  return {
    mealOrders,

    // Convert the calendar state object
    // to an array to be used in the component
    calendar: days.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = food[calendar[day][meal]] || null;
        return meals;
      }, {})
    }))
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectRecipe: (data) => dispatch(addRecipe(data)),
})

// Component
class Calendar extends Component {
  componentWillMount() {
    Modal.setAppElement('body');
 }

  state = {
    meal: null,
    day: null,
    foodList: null,
    isLoadingFood: false,
    isFoodModalOpen: false,
    isIngredientsModalOpen: false,
  }

  // Food Modal

  openFoodModal = ({ meal, day }) => {
    this.setState(() => ({
      isFoodModalOpen: true,
      meal,
      day,
    }))
  }

  closeFoodModal = () => {
    this.setState(() => ({
      isFoodModalOpen: false,
      meal: null,
      day: null,
      foodList: null,
    }))
  }

  searchFood = (value) => {
    if (!value) return;
    this.setState({ isLoadingFood: true });
    
    fetchRecipes(value).then(foodList => {
      this.setState({ foodList, isLoadingFood: false });
    })
  }
    // Ingredients Modal

    openIngredientsModal = () => this.setState({ isIngredientsModalOpen: true });
    closeIngredientsModal = () => this.setState({ isIngredientsModalOpen: false });

    generateShoppingList = () => {
      const { calendar } = this.props;
      
      return calendar.reduce((results, { meals }) => {
        const { breakfast, lunch, dinner } = meals;

        // Only add meal if a meal is present
        breakfast && results.push(breakfast);
        lunch && results.push(lunch);
        dinner && results.push(dinner);

        return results;
      }, [])
        .reduce((ingredients, { ingredientLines }) => (
          ingredients.concat(ingredientLines)
        ), []);
    }
  

  render() {
    const { 
      isIngredientsModalOpen,
      isLoadingFood, 
      isFoodModalOpen, 
      meal, 
      day, 
      foodList 
    } = this.state;

    const { mealOrders, calendar, selectRecipe } = this.props;

    return (
      <div>
        <List 
          size={30}
          className="shopping-list"
          onClick={this.openIngredientsModal}
        />
        <div className="calendar">
          <div className="days">
            { calendar.map(({ day }) => 
              <h3 key={day} className="subheader">
                {capitalize(day)}
              </h3>
            )}
          </div>
          <div className="icon-grid">
            { calendar.map(({ day, meals }) => (
              <ul key={day}>
                { mealOrders.map(meal => (
                  <li key={meal} className="meal">
                    { meals[meal] 
                        ? <div className="food-item">
                            <img src={meals[meal].image} alt={meals[meal].label}/>
                          </div>
                        : <button className="icon-btn" onClick={() => this.openFoodModal({ meal, day })}>
                            <CalendarIcon size={30} /> 
                          </button>        
                    }
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        
        <FoodModal 
          meal={meal} 
          day={day}
          foodList={foodList}
          isLoadingFood={isLoadingFood}
          isFoodModalOpen={isFoodModalOpen}
          searchFood={this.searchFood}
          selectRecipe={selectRecipe}
          closeFoodModal={this.closeFoodModal}
        />

        {/* Ingredients Modal */}
        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={isIngredientsModalOpen}
          onRequestClose={this.closeIngredientsModal}
          contentLabel="Modal"
        >
          { isIngredientsModalOpen && (
            <ShoppingList list={this.generateShoppingList()} />
          )}
        </Modal>

      </div>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(Calendar)
