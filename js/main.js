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
    imagePlaceholder.innerText = aliment.emoji;

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

// On garde la catégorie et le tri actifs en mémoire
let categorieActive = "tous";
let triActif = "az"; // tri par défaut

// ---- Fonction pour trier une liste d'aliments ----
function trierAliments(liste, tri) {
  // Créer une copie pour ne pas modifier la liste d'origine
  const listeTriee = Array.from(liste);

  if (tri === "az") {
    listeTriee.sort(function (a, b) {
      return a.nom.localeCompare(b.nom);
    });
  } else if (tri === "za") {
    listeTriee.sort(function (a, b) {
      return b.nom.localeCompare(a.nom);
    });
  } else if (tri === "cal-asc") {
    listeTriee.sort(function (a, b) {
      return a.calories - b.calories;
    });
  } else if (tri === "cal-desc") {
    listeTriee.sort(function (a, b) {
      return b.calories - a.calories;
    });
  } else if (tri === "prot-asc") {
    listeTriee.sort(function (a, b) {
      return a.proteines - b.proteines;
    });
  } else if (tri === "prot-desc") {
    listeTriee.sort(function (a, b) {
      return b.proteines - a.proteines;
    });
  }

  return listeTriee;
}

// ---- Fonction qui applique catégorie + tri et regénère la grille ----
function appliquerFiltreEtTri() {
  // 1. Filtrer par catégorie
  let liste;
  if (categorieActive === "tous") {
    liste = aliments;
  } else {
    liste = aliments.filter(function (aliment) {
      return aliment.categorie === categorieActive;
    });
  }

  // 2. Trier
  liste = trierAliments(liste, triActif);

  // 3. Afficher
  genererAliments(liste);
}

// ---- Premier affichage de la page (trié A-Z par défaut) ----
appliquerFiltreEtTri();

// ---- Gestion des boutons de filtre par catégorie ----
const filterBtns = document.querySelectorAll(".filter-btn");

for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function (event) {
    // Retirer la classe active de tous les boutons
    for (let j = 0; j < filterBtns.length; j++) {
      filterBtns[j].classList.remove("active");
    }
    // Ajouter la classe active sur le bouton cliqué
    event.target.classList.add("active");

    // Mettre à jour la catégorie active
    categorieActive = event.target.dataset.filter;

    // Appliquer
    appliquerFiltreEtTri();
  });
}

// ---- Gestion du menu déroulant de tri ----
const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", function (event) {
  triActif = event.target.value;
  appliquerFiltreEtTri();
});
