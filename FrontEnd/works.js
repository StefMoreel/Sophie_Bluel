async function callApiWorks() {
    //Requete de la route works de l'API (GET)
    const reponse = await fetch("http://localhost:5678/api/works");
    //Réponse de la requete au format JSON
    const repJson = await reponse.json();
    return repJson;
 }
    const works = await callApiWorks();
    showWorks(works);

function addWork(work){    
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

function showWorks(worksList){
    //Effacement de la balise gallery 
    document.querySelector(".gallery").innerHTML = "";
    //Parcours des objet de la route works de l'APÏ 
    for (let i=0; i < worksList.length ; i++) {
        addWork(worksList[i]);
    }
}

    //Ajout d'un listener sur le bouton "Tous"
    const boutonsFiltersTous = document.querySelector(".all");
    boutonsFiltersTous.addEventListener("click", function(){
        showWorks(works);
    });

    // Ajout d'un listner sur le bouton cat-objets
    const boutonCatObjets = document.querySelector(".cat-objets");
    boutonCatObjets.addEventListener("click", function(){
        //Fonction filter par id de la catégorie objets
        const categoriesFiltered = works.filter(function(work){
             return work.categoryId === 1;
         });
        showWorks(categoriesFiltered);
    });

    // Ajout d'un listner sur le bouton cat-appt
    const boutonCatAppt = document.querySelector(".cat-appt");
    boutonCatAppt.addEventListener("click", function(){
        //Fonction filter par id de la catégorie appartement
        const categoriesFiltered = works.filter(function(works){
            return works.categoryId === 2;
        });
        showWorks(categoriesFiltered);
    }); 

    // Ajout d'un listner sur le bouton cat-hotels-restaurants
    const boutonCatHotelsRestaurants = document.querySelector(".cat-hotels-restaurants");
    boutonCatHotelsRestaurants.addEventListener("click", function(){
        //Fonction filter par id de la catégorie hotels et restaurants
        const categoriesFiltered = works.filter(function(works){
            return works.categoryId === 3;
        });
        showWorks(categoriesFiltered);
    });

