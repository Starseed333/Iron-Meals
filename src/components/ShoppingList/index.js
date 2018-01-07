import React from 'react';
import PropTypes from 'prop-types';

const ShoppingList = ({ list }) => (
  <div className="ingredient-list">
    <h3 className="subheader">
      Your Shopping List  
    </h3> 
    <ul>
      { list.map(item => (
          <li key={item}>
            {item}
          </li>
        ))
      }
    </ul>
  </div>
)

ShoppingList.propTypes = {
  list: PropTypes.array.isRequired,
}

export default ShoppingList;
