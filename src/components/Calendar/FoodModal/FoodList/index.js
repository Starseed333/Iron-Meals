// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Our Dependencies
import { trim } from '../../../../utils/helpers';

const FoodList = ({ foodList, onSelect}) => {
  if (foodList.length === 0) {
    return (
      <p>Your search has 0 results </p>
    )
  }

  return (
    <ul className="food-list">
      { foodList.map(food => (
        <li key={food.label} onClick={() => onSelect(food)}>
          <h3>{trim(food.label)}</h3>
          <img src={food.image} alt={food.label} />
          <div>{Math.floor(food.calories)} Calories</div>
          <div>{food.source}</div>
        </li>
      ))}
    </ul>
  )
}

FoodList.propTypes = {
  foodList: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default FoodList;
