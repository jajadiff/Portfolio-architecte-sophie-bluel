/////////////////////////////////////////////////////////////////////////////////////////
// Modale
const modal = document.querySelector(".modale");
//Modale 1
const modalUn = document.querySelector(".modale-content");
// Modale 2
const modalDeux = document.querySelector(".modale-content2");
// Boutton pour déclancher la modale
const btn = document.querySelector(".myBtnModale");
// Boutton pour déclancer la deuxième modale
const btnDeux = document.querySelector(".myBtnModale2");
// Const fleche
const backFirstModale = document.getElementById("backfirstmodale");
// Selection croix pour fermer la modale
// const span = document.getElementsByClassName("close")[0];
const span = document.querySelectorAll(".close");
// eventListener click modale
btn.addEventListener("click", () => {
  // Change le display none en block
  modal.style.display = "block";
  modalUn.style.display = "block";
  modalDeux.style.display = "none";
});

//Btn 2
btnDeux.addEventListener("click", () => {
  modalDeux.style.display = "block";
  modalUn.style.display = "none";
});
// Boucle for + ajout eventLister click
for (let i = 0; i < span.length; i++) {
  span[i].addEventListener("click", () => {
    // Change le display block en none
    modal.style.display = "none";
  });
}

backFirstModale.addEventListener("click", () => {
  modalDeux.style.display = "none";
  modalUn.style.display = "block";
});
// Si clique en dehors de la fenetre (modale) display none
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
///////////////////////////////////////////////////////
// test
/////////////////////////////////////////////////////////////////////////////////////////
// Récupération du token
const token = localStorage.getItem("token");
/////////////////////////////////////////////////////////////////////////////////////////
// Button filtre
const btnAll = document.querySelector(".btn-all");
const btnObjets = document.querySelector(".btn-objets");
const btnApps = document.querySelector(".btn-apps");
const btnHotel = document.querySelector(".btn-hotel");

// Evenement qui est déclencé seulements lorsque le HTML à fini de charger
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Récupération des données API via une requête fetch
    const response = await fetch("http://localhost:5678/api/works");
    // Conversion de l'api en format JSON (représente un tableau)
    const pieces = await response.json();
    // Constante des buttons

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

    // Tous
    btnAll.addEventListener("click", function () {
      galleryAll();
      toggleButton(btnAll);
      toggleButton(btnObjets, false);
      toggleButton(btnApps, false);
      toggleButton(btnHotel, false);
    });

    // Objets
    btnObjets.addEventListener("click", function () {
      galleryAll(1);
      toggleButton(btnAll, false);
      toggleButton(btnObjets);
      toggleButton(btnApps, false);
      toggleButton(btnHotel, false);
    });

    // Appartements
    btnApps.addEventListener("click", function () {
      galleryAll(2);
      toggleButton(btnAll, false);
      toggleButton(btnObjets, false);
      toggleButton(btnApps);
      toggleButton(btnHotel, false);
    });

    // Hôtels & restaurants
    btnHotel.addEventListener("click", function () {
      galleryAll(3);
      toggleButton(btnAll, false);
      toggleButton(btnObjets, false);
      toggleButton(btnApps, false);
      toggleButton(btnHotel);
    });

    // Appel de la fonction pour tout afficher pas défauts
    galleryAll();
    toggleButton(btnAll);
  } catch {
    console.log("donnée non disponibles");
  }
});

//Filter toggle
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

document.addEventListener("DOMContentLoaded", async function () {
  // Récupération des données API via une requête fetch
  const response = await fetch("http://localhost:5678/api/works");
  // Conversion de l'api en format JSON (représente un tableau)
  const pieces = await response.json();
  // Constante des buttons

  // Fonction pour afficher la galerie en fonction de la catégorie sélectionnée
  // Fonction pour créer le contenu HTML d'une figure
  function createFigure(article) {
    const iconGallery = document.createElement("i");
    iconGallery.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    //Création de l'élément HTML figure
    const figureGallery = document.createElement("figure");
    //Création de l'élément HTML img
    const imageGallery = document.createElement("img");
    // La .src est définie par article.imageUrl(pieces[i].imageUrl)
    imageGallery.src = article.imageUrl;
    // Création de l'élément HTML figcaption
    const titleGallery = document.createElement("figcaption");
    // textContent est définie par article.title(pieces[i].title)
    titleGallery.textContent = "éditer";

    // Ajout de l'écouteur d'événements pour le clic sur l'image de la figure
    imageGallery.addEventListener("click", async function () {
      // Suppression de la figure correspondante
      figureGallery.remove();

      const token = localStorage.getItem("token");
      // Envoi de la requête DELETE à l'API
      const response = await fetch(
        `http://localhost:5678/api/works/${article.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // Vérification du statut de la réponse
      if (response.ok) {
        console.log(`Article ${article.id} supprimé de l'API`);
      } else {
        console.error(
          `Erreur lors de la suppression de l'article ${article.id} : `,
          response.status
        );
      }
    });
    ////////////////////////////////////////////////

    // Retourne la figure complète
    figureGallery.appendChild(imageGallery);
    figureGallery.appendChild(titleGallery);
    figureGallery.appendChild(iconGallery);
    return figureGallery;
  }

  ///////////////////////
  // Fonction pour afficher la galerie en fonction de la catégorie sélectionnée
  function galleryAll(categoryId) {
    // dom div avec la class "gallery"
    const actualGallery = document.querySelector(".gallery2");
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
        // Création de la figure correspondante
        const figure = createFigure(article);
        // Ajout de la figure à la galerie
        actualGallery.appendChild(figure);
      }
    }
  }
  galleryAll();
});
////////////////////////////////////////////////////////////////////////////////////////
// Ajout projet
// const response = await fetch("http://localhost:5678/api/works", {
//   method: "POST",
//   headers: {
//     Authorization: "Bearer " + token,
//   },
//   body: formData,
// });
//Ajout projet
const submitButton = document.querySelector("#submit-projet");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  // Récupération Value titre , catégorie , file,
  const title = document.getElementById("title").value;
  const category = document.getElementById("form-category").value;
  const file = document.querySelector('input[type="file"]').files[0];

  // Si titre categorie file pas remplis = alerte
  if (!title || !category || !file) {
    alert("Il faut remplir tous les champs du formulaire.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", file);

  const token = localStorage.getItem("token");
  try {
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
  } catch (error) {
    console.log(error);
  }
});
function previewImage() {
  var file = document.getElementById("filestyle").files;
  if (file.length > 0) {
    var fileReader = new FileReader();

    fileReader.onload = function (event) {
      document.getElementById("preview").setAttribute("src", event.target.result);
      document.querySelector(".carrer-content label").style.display = "none";
      document.querySelector(".carrer-content span").style.display = "none";
      document.querySelector(".carrer-content i").style.display = "none";
    };


    fileReader.readAsDataURL(file[0]);
  }
}

document.getElementById("filestyle").addEventListener("change", previewImage);
