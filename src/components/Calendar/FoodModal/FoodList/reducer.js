import {
  ADD_RECIPE,
} from '../../../../actions/constants';

export default function food(state = {}, action) {
  switch (action.type) {
    case ADD_RECIPE:
      const { food } = action;
      return {
        ...state,
        [food.label]: food,
      }
    default:
      return state;
  }
} 
