//Fonction callApi
    //Requete de la route works de l'API (GET)
    const reponse = await fetch("http://localhost:5678/api/works");
    //Réponse de la requete au format JSON
    const works = await reponse.json();

//Fonction genererWorks
    // Parcours des objet de la route works de l'APÏ
    for (let i=0; i < works.length ; i++) {
    // Création des éléments dans le DOM
        // Création de la balise figure
        const figureElement = document.createElement("figure");
        // Création de la balise img (enfant de figure)
        const imgElement = document.createElement("img");
        // Affichage et identification de l'élément dans la baslise img depuis la source dans la route de l'API
        imgElement.src = works[i].imageUrl;
        // Création de la balise figcation (enfant de figure)
        const figcaptionElement = document.createElement("figcaption");
        // Affichage et identification de l'élément dans le texte de la balise figcaption depuis la source dans la route de l'API
        figcaptionElement.innerText = works[i].title;
    // Rattacher éléments créés au parent
        //Ciblage de l'élémnent parent
        const gallery = document.querySelector(".gallery");
        //Insertion de la balise figure => enfant de gallery
        gallery.appendChild(figureElement);
        //Insertion de la balise img + affichage élément => enfant de figure
        figureElement.appendChild(imgElement);
        //Insertion de la balise figcation + affichage élément => enfant de figure
        figureElement.appendChild(figcaptionElement);


// Fonction catFilter
    //Ajout d'un listener sur le bouton "Tous"
    const boutonsFiltersTous = document.querySelector(".all");
    boutonsFiltersTous.addEventListener("click", function(){
        //Effacement de la balise gallery 
        document.querySelector(".gallery").innerHTML = "";
        //Parcours des objet de la route works de l'APÏ 
        for (let i=0; i < works.length ; i++) {
        // Création des éléments dans le DOM
            // Création de la balise figure
            const figureElement = document.createElement("figure");
            // Création de la balise img (enfant de figure)
            const imgElement = document.createElement("img");
            // Affichage et identification de l'élément dans la baslise img depuis la source dans la route de l'API
            imgElement.src = works[i].imageUrl;
            // Création de la balise figcation (enfant de figure)
            const figcaptionElement = document.createElement("figcaption");
            // Affichage et identification de l'élément dans le texte de la balise figcaption depuis la source dans la route de l'API
            figcaptionElement.innerText = works[i].title;
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
    });
    // Ajout d'un listner sur le bouton cat-objets
    const boutonCatObjets = document.querySelector(".cat-objets");
    boutonCatObjets.addEventListener("click", function(){
        //Fonction filter par id de la catégorie objets
        const categoriesFiltered = works.filter(function(works){
            return works.categoryId === 1;
        });
        // Effacement de la balise gallery    
        document.querySelector(".gallery").innerHTML = "";
        // Affichage des éléments filtrés
        for (let i = 0 ; i < categoriesFiltered.length ; i++){
        // Création des éléments dans le DOM
            // Création de la balise figure
            const figureElement = document.createElement("figure");
            // Création de la balise img (enfant de figure)
            const imgElement = document.createElement("img");
            // Affichage et identification de l'élément dans la baslise img depuis la source dans la route de l'API
            imgElement.src = categoriesFiltered[i].imageUrl;
            // Création de la balise figcation (enfant de figure)
            const figcaptionElement = document.createElement("figcaption");
            // Affichage et identification de l'élément dans le texte de la balise figcaption depuis la source dans la route de l'API
            figcaptionElement.innerText = categoriesFiltered[i].title;
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
    });

    // Ajout d'un listner sur le bouton cat-appt
    const boutonCatAppt = document.querySelector(".cat-appt");
    boutonCatAppt.addEventListener("click", function(){
        //Fonction filter par id de la catégorie appartement
        const categoriesFiltered = works.filter(function(works){
            return works.categoryId === 2;
        });
        // Effacement de la balise gallery    
        document.querySelector(".gallery").innerHTML = "";
        // Affichage des éléments filtrés
        for (let i = 0 ; i < categoriesFiltered.length ; i++){
        // Création des éléments dans le DOM
            // Création de la balise figure
            const figureElement = document.createElement("figure");
            // Création de la balise img (enfant de figure)
            const imgElement = document.createElement("img");
            // Affichage et identification de l'élément dans la baslise img depuis la source dans la route de l'API
            imgElement.src = categoriesFiltered[i].imageUrl;
            // Création de la balise figcation (enfant de figure)
            const figcaptionElement = document.createElement("figcaption");
            // Affichage et identification de l'élément dans le texte de la balise figcaption depuis la source dans la route de l'API
            figcaptionElement.innerText = categoriesFiltered[i].title;

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
    }); 

    // Ajout d'un listner sur le bouton cat-hotels-restaurants
    const boutonCatHotelsRestaurants = document.querySelector(".cat-hotels-restaurants");
    boutonCatHotelsRestaurants.addEventListener("click", function(){
        //Fonction filter par id de la catégorie hotels et restaurants
        const categoriesFiltered = works.filter(function(works){
            return works.categoryId === 3;
        });
        // Effacement de la balise gallery    
        document.querySelector(".gallery").innerHTML = "";
        // Affichage des éléments filtrés
        for (let i = 0 ; i < categoriesFiltered.length ; i++){
        // Création des éléments dans le DOM
            // Création de la balise figure
            const figureElement = document.createElement("figure");
            // Création de la balise img (enfant de figure)
            const imgElement = document.createElement("img");
            // Affichage et identification de l'élément dans la baslise img depuis la source dans la route de l'API
            imgElement.src = categoriesFiltered[i].imageUrl;
            // Création de la balise figcation (enfant de figure)
            const figcaptionElement = document.createElement("figcaption");
            // Affichage et identification de l'élément dans le texte de la balise figcaption depuis la source dans la route de l'API
            figcaptionElement.innerText = categoriesFiltered[i].title;

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
  });
}
