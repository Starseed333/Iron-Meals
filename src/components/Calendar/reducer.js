//calender data save into the store
import {
  ADD_RECIPE,
  REMOVE_FROM_CALENDAR,
} from '../../actions/constants';

const initialCalendarState = {
  sunday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  monday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  tuesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  wednesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  thursday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  friday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  saturday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
}
//use the spread operator for the state
export default function calendar (state = initialCalendarState, action) {
  const { day, food, meal } = action;

  switch (action.type) {
    case ADD_RECIPE :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: food.label,
        }
      }
    case REMOVE_FROM_CALENDAR :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      }
    default :
      return state
  }
}
