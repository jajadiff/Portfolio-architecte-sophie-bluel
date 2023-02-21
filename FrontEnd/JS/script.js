const actualGallery = document.querySelector(".gallery");

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((project) => {
      // createElement figure
      const projectGallery = document.createElement("figure");

      // Ajoutez l'image du projet
      const imageGallery = document.createElement("img");
      imageGallery.src = project.imageUrl;
      projectGallery.appendChild(imageGallery);

      // Ajoutez le titre du projet
      const titleGallery = document.createElement("figcaption");
      titleGallery.textContent = project.title;
      projectGallery.appendChild(titleGallery);

      // Ajoutez l'élément de projet au conteneur de projets
      actualGallery.appendChild(projectGallery);
    });
  });

// const actualFilter = document.querySelector("#portfolio");

// fetch("http://localhost:5678/api/categories")
//   .then((responsefilter) => responsefilter.json())
//   .then((filter) => {
//     console.log(filter);
 
//   });


  