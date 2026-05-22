// ============================================
// main.js — Chow Nutrition App
// ============================================

// ---- Sélection des éléments du DOM ----
const sectionFiches = document.querySelector(".food-grid");
const noResults = document.getElementById("noResults");
const heroText = document.querySelector(".hero__text p");
const badgeNumber = document.querySelector(".hero__badge span");
const filterBtns = document.querySelectorAll(".filter-btn");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");

// ---- Récupération des données depuis le fichier JSON ----
const reponse = await fetch("data/foods.json");
const aliments = await reponse.json();
const totalAliments = aliments.length;

// ---- Mise à jour du hero (texte + badge) ----
heroText.innerText = `Découvre les ${totalAliments} aliments du quotidien et leurs macronutriments essentiels — protéines, glucides, lipides et calories — pour 100g.`;
badgeNumber.innerText = totalAliments;

// ---- État courant de la page (filtres + tri + recherche) ----
let categorieActive = "tous";
let triActif = "az";
let rechercheActive = "";

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

  // Parcourir la liste et créer une carte pour chaque aliment
  liste.forEach((aliment) => {
    // Créer le lien cliquable (la carte)
    const cardElement = document.createElement("a");
    cardElement.classList.add("food-card");
    cardElement.href = "food.html?id=" + aliment.id;

    // Créer le bloc image (emoji)
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

// ---- Fonction qui applique recherche + catégorie + tri ----
function appliquerFiltreEtTri() {
  let liste = aliments;

  // 1. Filtrer par recherche (sur le nom)
  if (rechercheActive !== "") {
    liste = liste.filter(function (aliment) {
      const nomMinuscule = aliment.nom.toLowerCase();
      const rechercheMinuscule = rechercheActive.toLowerCase();
      return nomMinuscule.includes(rechercheMinuscule);
    });
  }

  // 2. Filtrer par catégorie
  if (categorieActive !== "tous") {
    liste = liste.filter(function (aliment) {
      return aliment.categorie === categorieActive;
    });
  }

  // 3. Trier
  liste = trierAliments(liste, triActif);

  // 4. Afficher
  genererAliments(liste);
}

// ---- Premier affichage de la page (trié A-Z par défaut) ----
appliquerFiltreEtTri();

// ---- Gestion des boutons de filtre par catégorie ----
filterBtns.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    // Retirer la classe active de tous les boutons
    filterBtns.forEach((b) => b.classList.remove("active"));

    // Ajouter la classe active sur le bouton cliqué
    event.target.classList.add("active");

    // Mettre à jour la catégorie active
    categorieActive = event.target.dataset.filter;

    // Appliquer
    appliquerFiltreEtTri();
  });
});

// ---- Gestion du menu déroulant de tri ----
sortSelect.addEventListener("change", function (event) {
  triActif = event.target.value;
  appliquerFiltreEtTri();
});

// ---- Gestion de la barre de recherche ----
searchInput.addEventListener("input", function (event) {
  rechercheActive = event.target.value;
  appliquerFiltreEtTri();
});