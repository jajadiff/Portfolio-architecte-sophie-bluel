// Evenement qui est déclencé seulements lorsque le HTML à fini de charger
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Récupération des données API via une requête fetch
    const response = await fetch("http://localhost:5678/api/works");
    // Conversion de l'api en format JSON (représente un tableau)
    const pieces = await response.json();
    // Constante des buttons
    const btnAll = document.querySelector(".btn-all");
    const btnObjets = document.querySelector(".btn-objets");
    const btnApps = document.querySelector(".btn-apps");
    const btnHotel = document.querySelector(".btn-hotel");

    // Fonction pour afficher la galerie en fonction de la catégorie sélectionnée
    function galleryAll(categoryId) {
      // dom div avec la class "gallery"
      const actualGallery = document.querySelector(".gallery");
      // Supprimer les éléments
      actualGallery.innerHTML = "";
      // Boucle for qui itère dans le tableau "pieces" i++
      for (let i = 0; i < pieces.length; i++) {
        // article = élément du tableau i
        const article = pieces[i];
        // category = pieces.category
        const category = article.category;
        // idGallery = pieces.id
        const idGallery = category.id;

        // Si idGallery === categoryId OU categoryId === pas de valeurs
        if (idGallery === categoryId || categoryId === undefined) {
          //Création de l'éléments HTML figure
          const figureGallery = document.createElement("figure");
          //Création de l'éléments HTML img
          const imageGallery = document.createElement("img");
          // La .src est définie par article.imageUrl(pieces[i].imageUrl)
          imageGallery.src = article.imageUrl;
          // Création de l'éléments HTML figcaption
          const titleGallery = document.createElement("figcaption");
          // textContent est définie par article.title(pieces[i].title)
          titleGallery.textContent = article.title;

          /* figureGallery est l'enfant de actualGallery 
        (représente la div class gallery dans le HTML)*/
          actualGallery.appendChild(figureGallery);
          // imageGallery, titleGallery sont les enfants de figureGallery
          figureGallery.appendChild(imageGallery);
          figureGallery.appendChild(titleGallery);
        }
      }
    }

    // Ajout des eventListener "click" sur les bouttons
    btnAll.addEventListener("click", function () {
      galleryAll();
      toggleButton(btnAll);
      toggleButton(btnObjets, false);
      toggleButton(btnApps, false);
      toggleButton(btnHotel, false);
    });

    btnObjets.addEventListener("click", function () {
      galleryAll(1);
      toggleButton(btnAll, false);
      toggleButton(btnObjets);
      toggleButton(btnApps, false);
      toggleButton(btnHotel, false);
    });

    btnApps.addEventListener("click", function () {
      galleryAll(2);
      toggleButton(btnAll, false);
      toggleButton(btnObjets, false);
      toggleButton(btnApps);
      toggleButton(btnHotel, false);
    });

    btnHotel.addEventListener("click", function () {
      galleryAll(3);
      toggleButton(btnAll, false);
      toggleButton(btnObjets, false);
      toggleButton(btnApps, false);
      toggleButton(btnHotel);
    });

    // Appel de la fonction pour tout afficher pas défauts
    galleryAll();
  } catch {
    console.log("donnée non disponibles");
  }
});
/*
Préparation pour changer le style des bouttons quand ils sont active
classList.add("whenhover");
classList.toggle("whenhover");

*/
function toggleButton(button, active = true) {
  if (active) {
    button.classList.add("active");
    button.classList.remove("btn-all");
    button.classList.remove("btn-objets");
    button.classList.remove("btn-apps");
    button.classList.remove("btn-hotel");
  } else {
    button.classList.remove("active");
    button.classList.add("btn-all");
    button.classList.add("btn-objets");
    button.classList.add("btn-apps");
    button.classList.add("btn-hotel");
  }
}
