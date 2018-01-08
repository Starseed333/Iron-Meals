// import developer keys here
const API_ID = "ed0ec8c3";
const APP_KEY = "f553388cfbb8fe8c794404ed490afeb7";

export function fetchRecipes (food = '') {
  food = food.trim()

  return fetch(`https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`)
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
