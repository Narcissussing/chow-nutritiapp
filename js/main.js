// ============================================
// main.js — Chow Nutrition App
// ============================================

// Sélectionner la section où afficher les cartes
const sectionFiches = document.querySelector(".food-grid");
const noResults = document.getElementById("noResults");

// Récupérer les données depuis le fichier JSON
const reponse = await fetch("data/foods.json");
const aliments = await reponse.json();
const totalAliments = aliments.length;

// HERO TEXT
const heroText = document.querySelector(".hero__text p");
heroText.innerText = `Explorer ${totalAliments} aliments du quotidien et découvre leurs macronutriments essentiels — protéines, glucides, lipides et calories — pour 100g.`;

// BADGE NUMBER
const badgeNumber = document.querySelector(".hero__badge span");
badgeNumber.innerText = totalAliments;

// On garde une copie de tous les aliments pour les filtres
let alimentsFiltres = aliments;

// ---- Fonction pour générer les cartes aliments ----
function genererAliments(liste) {
  // Vider la grille avant d'afficher
  sectionFiches.innerHTML = "";

  // Si aucun aliment dans la liste, afficher le message
  if (liste.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }

  // Cacher le message "aucun résultat"
  noResults.classList.add("hidden");

  // Boucle pour parcourir tous les aliments
  liste.forEach((item) => {
    // Récupérer un aliment du tableau
    const aliment = item;

    // Créer le lien cliquable (la carte)
    const cardElement = document.createElement("a");
    cardElement.classList.add("food-card");
    cardElement.href = "food.html?id=" + aliment.id;

    // Créer le bloc image (emoji pour l'instant)
    const imagePlaceholder = document.createElement("div");
    imagePlaceholder.classList.add("food-card__img-placeholder");
    imagePlaceholder.innerText = getEmoji(aliment.categorie);

    // Créer le bloc texte
    const bodyElement = document.createElement("div");
    bodyElement.classList.add("food-card__body");

    // Créer le nom
    const nomElement = document.createElement("p");
    nomElement.classList.add("food-card__name");
    nomElement.innerText = aliment.nom;

    // Créer la catégorie
    const categorieElement = document.createElement("p");
    categorieElement.classList.add("food-card__category");
    categorieElement.innerText = aliment.categorie;

    // Assembler le corps de la carte
    bodyElement.appendChild(nomElement);
    bodyElement.appendChild(categorieElement);

    // Assembler la carte complète
    cardElement.appendChild(imagePlaceholder);
    cardElement.appendChild(bodyElement);

    // Ajouter la carte dans la grille
    sectionFiches.appendChild(cardElement);
  });
}

// ---- Fonction pour retourner un emoji selon la catégorie ----
function getEmoji(categorie) {
  if (categorie === "Céréales") return "🍚";
  if (categorie === "Légumes") return "🥦";
  if (categorie === "Légumineuses") return "🫘";
  if (categorie === "Boulangerie") return "🥖";
  if (categorie === "Plats préparés") return "🍜";
  if (categorie === "Fruits") return "🍋";
  if (categorie === "Viandes") return "🍗";
  if (categorie === "Poissons") return "🐟";
  if (categorie === "Charcuterie") return "🌭";
  if (categorie === "Produits laitiers") return "🧀";
  return "🍽️";
}

// ---- Premier affichage de la page ----
genererAliments(aliments);

// ---- Gestion des boutons de filtre ----
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    // Retirer la classe active de tous les boutons
    filterBtns.forEach((button) => {
      button.classList.remove("active");
    });

    // Ajouter la classe active sur le bouton cliqué
    event.target.classList.add("active");

    // Récupérer la valeur du filtre choisi
    const filtre = event.target.dataset.filter;

    // Filtrer la liste selon la catégorie
    if (filtre === "tous") {
      alimentsFiltres = aliments;
    } else {
      alimentsFiltres = aliments.filter(function (aliment) {
        return aliment.categorie === filtre;
      });
    }

    // Regénérer les cartes avec la liste filtrée
    genererAliments(alimentsFiltres);
  });
});
