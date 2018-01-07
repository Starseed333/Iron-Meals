import {
  ADD_RECIPE,
  REMOVE_FROM_CALENDAR
} from './constants';

export function addRecipe ({ food, day, meal }) {
  return {
    type: ADD_RECIPE,
    food,
    day,
    meal,
  }
}

export function removeFromCalendar ({ day, meal }) {
  return {
    type: REMOVE_FROM_CALENDAR,
    day,
    meal,
  }
}
