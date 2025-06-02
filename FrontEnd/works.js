// Récupération et stockage des travaux depuis l API au format json

    //Création de la fonction de récupération des travaux depuis l'API
async function getWorks (){
    //Stockage de la fonction fetch dans la variable reponse
    const reponse = await fetch("http://localhost:5678/api/works");
    //Stockage de la réponse (= travaux) dans la variable works
    const works = await reponse.json();
    //Boucle sur les travaux
    for (let i=0 ; i<works.length; i++){
    //Stockage de chaque itération [i] dans la variable work
    const work = works[i];
    //Appel de la fonction d'affichage de chaque élément sur le site    
addWork(work);
    }
//Filtrer les works selon la catégorie au click
    //Ajout d'un listnener sur le btn-filters : click + fonction filtrer par catégorie
    const boutonsFiltersTous = document.querySelector(".all");
    boutonsFiltersTous.addEventListener("click", function() {
    //Fonction filter par id de la catégorie pour toutes les catégories
        const categoriesFilter = works.filter(function (work){
        return work.category.id;
        });
     console.log(categoriesFilter);
    //  document.querySelector(".gallery").innerHTML = "";
    //  addWork(categoriesFilter);
    });
    const boutonsFiltersObjets = document.querySelector(".cat-objets");
    boutonsFiltersObjets.addEventListener("click", function() {
    //Fonction filter par id de la catégorie objets  
        const categoriesFilter = works.filter(function (work){
        return work.category.id === 1;
        });
    console.log(categoriesFilter);
    });
    const boutonsFiltersAppartements = document.querySelector(".cat-appt");
    boutonsFiltersAppartements.addEventListener("click", function() {
    //Fonction filter par id de la catégorie appartements  
        const categoriesFilter = works.filter(function (work){
        return work.category.id === 2;
        });
    console.log(categoriesFilter);
    });
    const boutonsFiltersHotelsRestaurants = document.querySelector(".cat-hotels-restaurants");
    boutonsFiltersHotelsRestaurants.addEventListener("click", function() {
    //Fonction filter par id de la catégorie hotels et restaurants  
        const categoriesFilter = works.filter(function (work){
        return work.category.id === 3;
        });
    console.log(categoriesFilter);
    });
}
// Appel de la fonction de récupétation des travaux
getWorks()

function addWork (work){
// Création des éléments dans le DOM
    // Création de la balise figure
    const figureElement = document.createElement("figure");
    // Création de la balise img (enfant de figure)
    const imgElement = document.createElement("img");
    // Affichage et identification de l'élément dans la baslise img depuis la source dans la route de l'API
    imgElement.src = work.imageUrl;
    // Création de la balise figcation (enfant de figure)
    const figcaptionElement = document.createElement("figcaption");
    // Affichage et identification de l'élément dans le texte de la balise figcaption depuis la source dans la route de l'API
    figcaptionElement.innerText = work.title;

// Rattacher éléments créés au parent
    //Ciblage de l'élémnent parent
    const gallery = document.querySelector(".gallery");
    //Insertion de la balise figure => enfant de gallery
    gallery.appendChild(figureElement);
    //Insertion de la balise img + affichage élément => enfant de figure
    figureElement.appendChild(imgElement);
    //Insertion de la balise figcation + affichage élément => enfant de figure
    figureElement.appendChild(figcaptionElement);
}




