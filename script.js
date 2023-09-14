// 1 . Ecrire Une fonction fetchMeal qui va récupérer les repas depuis l'API et les afficher dans le DOM
// Utiliser un repas statique : https://www.themealdb.com/api/json/v1/1/search.php?s=salmon
// 2 . Appeler la fonction fetchMeal
// Afficher dans la console le résultat de la requête
// 3 . Ecrire une fonction displayMeal qui va ajouter dans card-container une card avec les informations du repas
// 4 . Appeler la fonction displayMeal dans fetchMeal
// 5. Lancer fetchMeal dynamiquement à chaque fois que l'on change searchInput (utiliser addEventListener)
// 6. Lancer displayMeal dynamiquement à chaque fois que l'on change rangeInput ou sortButton (utiliser addEventListener)
const searchInput = document.getElementById("searchInput");
const rangeInput = document.getElementById("InputRange");
const rangeSpan = document.getElementById("rangeSpan");
const sortBtn = document.getElementById("sortBtn");
const mealDisplay = document.querySelector("section");

let sortMethod = true;
let leRepas = [];

//lié le span avec l'input range et faire appelle a la fonction de l'api
rangeInput.addEventListener("input", () => {
    rangeSpan.textContent = rangeInput.value;
    displayMeal();
});

//faire le bouton avec sortmethod pour le changer
sortBtn.addEventListener("click", () => {
    sortMethod = !sortMethod;
    sortBtn.textContent = sortMethod ? "Croissant" : "Décroissant";
    displayMeal();
});

//faire appelle l'API 
const fetchMeal = async () =>{
    let nameRepas = searchInput.value;
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameRepas}`);
    data = await result.json();
    leRepas = data.meals; 

    displayMeal();
};
// Faire afficher les cartes 
const displayMeal = () => {
    mealDisplay.innerHTML="";
    leRepas
    .sort((a, b) => {
        if (sortMethod) {
            return a.strMeal.localeCompare(b.strMeal);
        } else {
            return b.strMeal.localeCompare(a.strMeal);
        }
    })
    .slice(0, rangeInput.value)
    .map((theDinner) => {
        mealDisplay.innerHTML += ` 
        <div class="card">
        <div class="name">${theDinner.strMeal}</div>
        <img src="${theDinner.strMealThumb}" alt="Spicy Arrabiata Penne">
        <div class="instruction">${theDinner.strInstructions}</div>
    </div>`
    });
}

fetchMeal();

//Permet de faire la recherche 
searchInput.addEventListener("input", () => {
    fetchMeal();
});