// ============================================
// food.js — Page détail d'un aliment
// ============================================

// Sélectionner les éléments de la page
const detailContainer = document.getElementById("detailContainer");
const notFound = document.getElementById("notFound");

// Lire l'id dans l'URL  (ex: food.html?id=riz → "riz")
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Récupérer les données depuis le fichier JSON
const reponse = await fetch("data/foods.json");
const aliments = await reponse.json();

// Chercher l'aliment qui correspond à l'id dans l'URL
const aliment = aliments.find(function (a) {
  return a.id === id;
});

// Si aucun aliment trouvé, afficher le message d'erreur
if (aliment === undefined) {
  notFound.classList.remove("hidden");
} else {
  // Mettre à jour le titre de l'onglet
  document.title = "Chow — " + aliment.nom;

  // ---- Construire la page détail ----

  // Conteneur principal
  const carte = document.createElement("div");
  carte.classList.add("detail-carte");

  // --- Image ---
  const imageElement = document.createElement("div");
  imageElement.classList.add("detail-image");
  imageElement.innerText = getEmoji(aliment.categorie);

  // --- Infos ---
  const infosElement = document.createElement("div");
  infosElement.classList.add("detail-infos");

  // Catégorie
  const categorieElement = document.createElement("p");
  categorieElement.classList.add("detail-categorie");
  categorieElement.innerText = aliment.categorie;

  // Nom
  const nomElement = document.createElement("h1");
  nomElement.classList.add("detail-nom");
  nomElement.innerText = aliment.nom;

  // Origine
  const origineElement = document.createElement("p");
  origineElement.classList.add("detail-origine");
  origineElement.innerText = "Origine : " + aliment.origine;

  // Description
  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("detail-description");
  descriptionElement.innerText = aliment.description;

  // --- Macros ---
  const macrosElement = document.createElement("div");
  macrosElement.classList.add("detail-macros");

  // Calories
  const caloriesElement = document.createElement("div");
  caloriesElement.classList.add("macro-card", "macro-calories");

  const caloriesValeur = document.createElement("span");
  caloriesValeur.classList.add("macro-valeur");
  caloriesValeur.innerText = aliment.calories;

  const caloriesLabel = document.createElement("span");
  caloriesLabel.classList.add("macro-label");
  caloriesLabel.innerText = "kcal";

  caloriesElement.appendChild(caloriesValeur);
  caloriesElement.appendChild(caloriesLabel);

  // Glucides
  const glucidesElement = document.createElement("div");
  glucidesElement.classList.add("macro-card");

  const glucidesValeur = document.createElement("span");
  glucidesValeur.classList.add("macro-valeur");
  glucidesValeur.innerText = aliment.glucides + "g";

  const glucidesLabel = document.createElement("span");
  glucidesLabel.classList.add("macro-label");
  glucidesLabel.innerText = "Glucides";

  glucidesElement.appendChild(glucidesValeur);
  glucidesElement.appendChild(glucidesLabel);

  // Protéines
  const proteinesElement = document.createElement("div");
  proteinesElement.classList.add("macro-card");

  const proteinesValeur = document.createElement("span");
  proteinesValeur.classList.add("macro-valeur");
  proteinesValeur.innerText = aliment.proteines + "g";

  const proteinesLabel = document.createElement("span");
  proteinesLabel.classList.add("macro-label");
  proteinesLabel.innerText = "Protéines";

  proteinesElement.appendChild(proteinesValeur);
  proteinesElement.appendChild(proteinesLabel);

  // Lipides
  const lipidesElement = document.createElement("div");
  lipidesElement.classList.add("macro-card");

  const lipidesValeur = document.createElement("span");
  lipidesValeur.classList.add("macro-valeur");
  lipidesValeur.innerText = aliment.lipides + "g";

  const lipidesLabel = document.createElement("span");
  lipidesLabel.classList.add("macro-label");
  lipidesLabel.innerText = "Lipides";

  lipidesElement.appendChild(lipidesValeur);
  lipidesElement.appendChild(lipidesLabel);

  // Assembler les macros
  macrosElement.appendChild(caloriesElement);
  macrosElement.appendChild(glucidesElement);
  macrosElement.appendChild(proteinesElement);
  macrosElement.appendChild(lipidesElement);

  // Assembler les infos
  infosElement.appendChild(categorieElement);
  infosElement.appendChild(nomElement);
  infosElement.appendChild(origineElement);
  infosElement.appendChild(descriptionElement);
  infosElement.appendChild(macrosElement);

  // Assembler la carte complète
  carte.appendChild(imageElement);
  carte.appendChild(infosElement);

  // Injecter dans la page
  detailContainer.appendChild(carte);
}

// ---- Fonction emoji (même que main.js) ----
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