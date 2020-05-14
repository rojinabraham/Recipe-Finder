const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  const seachQuery = search.value;
  e.preventDefault();
  //clear single meal
  single_mealEl.innerHTML = "";
  if (seachQuery.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${seachQuery}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search Result for ${seachQuery} :<h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>Nothing found, Try Again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3></div>
            </div>`
            )
            .join("");
        }
      });
    //clear search
    search.value = "";
  } else {
    alert("Enter Search Term");
  }
}
submit.addEventListener("submit", searchMeal);
