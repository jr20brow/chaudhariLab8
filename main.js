"use strict";

function init() {
  let btn = document.getElementById("fetch-btn");
  btn.addEventListener("click", fetchDog);

  let btn2 = document.getElementById("meal-btn")
  btn2.addEventListener("click", fetchMeal);

  let btn3 = document.getElementById("joke-btn");
  btn3.addEventListener("click", fetchJoke);
}

function fetchDog() {
  let url = "https://dog.ceo/api/breeds/image/random";
  fetch(url)
    .then(statusCheck)
    .then(resp => resp.json())
    .then(showDog)
    .catch(handleError);
}

function showDog(data) {
  console.log("Dog data:", data);
  let img = document.createElement("img");
  img.src = data.message;
  img.alt = "A random dog";
  document.getElementById("output").appendChild(img);
}

async function statusCheck(res) {
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res;
}

function handleError(err) {
  console.error("Something went wrong:", err);
  document.getElementById("output").textContent =
    "The kitchen is closed! (Error loading data)";
}

function showMeals(data) {
    let container = document.getElementById("meal-output");
    container.innerHTML = "";
  const meals = data.meals;
  if(meals == null){
    console.log("Sorry, that's not on our menu!");
  }
  meals.forEach(meal => {
    let tmp = document.createElement("div");
    tmp.textContent = meal.strMeal + " " + meal.strCategory;
    let img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.alt = "A pizza";
    document.getElementById("meal-output").appendChild(tmp);
    document.getElementById("meal-output").appendChild(img);
  });
}

function mealhandleError(err) {
  console.error("Something went wrong:", err);
  document.getElementById("meal-output").textContent =
    "Sorry, that's not on our menu!";
}

function fetchMeal() {
  let food = document.getElementById("food-input").value;
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food;
  fetch(url)
    .then(statusCheck)
    .then(resp => resp.json())
    .then(showMeals)
    .catch(mealhandleError);
}

function fetchJoke(){
  let url = "https://official-joke-api.appspot.com/random_joke";
  fetch(url)
    .then(statusCheck)
    .then(resp => resp.json())
    .then(showJoke)
    .catch(jokeHandleError);
}

function showJoke(data) {
  console.log("Joke:", data);
  let tmp = document.createElement("div");
  tmp.textContent = data.setup;
  document.getElementById("joke-output").appendChild(tmp);
  setTimeout(showPunchline, 3000, data);
}

function showPunchline(data){
let tmp2 = document.createElement("div");
  tmp2.textContent = data.punchline;
  document.getElementById("joke-output").appendChild(tmp2).innerHTML;
}

function jokeHandleError(err) {
  console.error("Something went wrong:", err);
  document.getElementById("output").textContent =
    "Error loading joke...";
}


init();
