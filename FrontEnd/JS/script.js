const response = await fetch("http://localhost:5678/api/works");
const pieces = await response.json();

console.log(pieces);

for (let i = 0; i < pieces.length; i++) {
  // Index du parcours de la boucles
  const article = pieces[i];
  // Récup de l'élément du DOM qui accueillera les figures
  const actualGallery = document.querySelector(".gallery");

  const figureGallery = document.createElement("figure");
  // createElement figure
  const imageGallery = document.createElement("img");
  imageGallery.src = article.imageUrl;
  // createElement figcaption
  const titleGallery = document.createElement("figcaption");
  titleGallery.textContent = article.title;
  // Récupe de categoryID
  const idGallery = article.categoryId;
  //  Rattacher les éléments a la div ".gallery"
  actualGallery.appendChild(figureGallery);
  // Rattacher les éléments images et title a la balise figure et figcaption
  figureGallery.appendChild(imageGallery);
  figureGallery.appendChild(titleGallery);
}

//Ajout des eventListener pour les filtres

// Tous
const btnAll = document.querySelector(".btn-all");
btnAll.addEventListener("click", function () {
  console.log("Tous");
});
// Objets
const btnObjets = document.querySelector(".btn-objets");
btnObjets.addEventListener("click", function () {});

// Appartements
const btnApps = document.querySelector(".btn-apps");
btnApps.addEventListener("click", function () {
  console.log("Appartements");
});

// Hôtels & restaurants
const btnHotel = document.querySelector(".btn-hotel");
btnHotel.addEventListener("click", function () {
  console.log("Hotel");
});
