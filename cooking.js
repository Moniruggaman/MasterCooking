// Nav-menu bar section

const navMenu = document.querySelectorAll("header");
const navList = document.getElementById("nav-menu");
const navLogo = document.createElement("div");
navLogo.className = ("nav-logo");
navList.appendChild(navLogo);
const logoItem = `
    <h1 class ="logo"> Cooking Master</h1>
`
navLogo.innerHTML = logoItem;
const navDiv = document.createElement("div")
navDiv.id = ("navItems");
navList.appendChild(navDiv);


const items = ["Home", "About", "Recipes", "Blog"];

items.forEach((item, i) => {
    const element = document.createElement("a");
    element.innerText = item;
    element.classList.add("menu-items");
    element.setAttribute("id", `menu-${i + 1}`);
    element.href = `#section${i + 1}`;

    navDiv.appendChild(element);

});

// Search options where view meal info.

const search = document.getElementById('search');
const submit = document.getElementById('submit');


const singleMeal = document.getElementById('single-meal');

// search meal.

function searchMeal(element) {
    element.preventDefault();
    singleMeal.innerHTML = "";

    const meals = search.value;

    if (meals.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`)
            .then(res => res.json())
            .then(data => displayMeal(data.meals));
        const displayMeal = meals => {
            const mealsDiv = document.getElementById("meals");

            if (meals === null) {
                const searchResult = document.getElementsByClassName('result');
                searchResult.innerHTML = `<h2>Search correctly by meal name${meals}</h2>`
            }
            else {
                meals.forEach(meal => {
                    const mealDiv = document.createElement("div");
                    mealDiv.className = "meal";

                    const mealsInfo = `
                        <div class= "meal" onclick="mealsEl('${meal.idMeal}')">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <div class="meal-info" data-mealId="${meal.idMeal}"> <h3>${meal.strMeal}</h3> </div>
                        </div>
                       
                    `;
                    mealDiv.innerHTML = mealsInfo;
                    mealsDiv.appendChild(mealDiv);
                });
            }
            return ('');
        }
        // clear search text
        search.value = '';
    }
    else {
        // Alert message to the user
        alert("please enter search value by meal name");
    }
}

// Added addEventListener to search button.
submit.addEventListener('submit', searchMeal);
// Added addEventListener to get meal ingredients.
// const mealsEl = document.getElementsByClassName("meal");
// mealDiv.addEventListener('click', mealsEl);

// mealsEl.addEventListener('click', (e) => {
   function mealsEl(mealEl) {
// const mealsEl = mealEl => {
    const mealInfo = mealEl.path.find((mealDiv) => {
        if (mealDiv.classList) {
            return mealDiv.classList.contains('meal-info');
        }
        else {
            return false;
        }
    });
console.log(mealInfo)
    if (mealInfo) {
        const mealId = mealInfo.getAttribute("data-mealId");
        getMealById(mealId);
    
    }
// }
};
// const mealInfo = document.getElementsByClassName("meal-info");




// This section Get Meal displayed with ingredients.

// Fetch meal by ID.
function getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
};

function addMealToDOM(meal) {
    // Get all ingredients from the object. Up to 20
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            // Stop if there are no more ingredients
            break;
        }
    }
    singleMeal.innerHTML = `
            <div class="single-meal">
                <h2> ${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="Meal Image">
                <div class="single-mealInfo">
                    <h4>${meal.strMeal}</h4>
                    <p>${meal.strInstructions}</p>
                    <h5>Ingredients:</h5>
                    <ul>
                        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
            </div>
            `;
}