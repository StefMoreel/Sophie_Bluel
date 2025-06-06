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

async function callApiCategories() {
    //Requete de la route categories de l'API (GET)
    const reponse = await fetch("http://localhost:5678/api/categories");
    //Réponse de la requete au format JSON
    const repJson = await reponse.json();
    return repJson;
 }
    const categories = await callApiCategories();


    //Création de la balise ul
    const ulElement = document.createElement("ul");
    //Ciblage de l'élément parent pour ul
    const filters = document.querySelector(".filters");
    //Insertion de ul dans filters
    filters.appendChild(ulElement);

    //Appel de la fonction pour ajouter 1 bouton "Tous" à la balise ul
    addButtonFilter(ulElement,"Tous", 0);


    for (let i = 0; i < categories.length ; i++){
        const category = categories[i]; 
    addButtonFilter(ulElement, category.name, category.id);
    }

function addButtonFilter (parent, text, id){      
    //Création des éléments pour les boutons dynamiques dans le DOM
    //Création de la balise li
    const liElement = document.createElement("li");
    //création de la balise button
    const buttonElement = document.createElement("button");
    //Affichage du texte du bouton
    buttonElement.innerText = text;
    buttonElement.setAttribute("name", id)
    //Ciblage de l'élement ul et insertion de li
    parent.appendChild(liElement);
    //Ciblage de l'élement li et insertion de button
    liElement.appendChild(buttonElement);
      
    buttonElement.addEventListener("click", function(event){
        const buttonName = parseInt(event.currentTarget.attributes.name.value);
            if(buttonName === 0){
                showWorks(works);
            }else{
                const categoriesFiltered = works.filter(function(work){
                    return work.categoryId === buttonName;   
                })
            showWorks(categoriesFiltered);
            };
    });

 }

const isLoggedIn = localStorage.getItem("token");

const linkLogin = document.querySelector(".link-login");

if (isLoggedIn){
    linkLogin.textContent = "logout";
    linkLogin.href="#"
    linkLogin.addEventListener("click", function(){
        localStorage.removeItem("token");
        window.location.reload();
    })

    //Création de la balise a
    const modifierLink = document.createElement("a");
    //Ajout de l'attribut du lien a
    modifierLink.href = "modal.html"
    //Création de la balise i pour l'icone
    const iconeModifier = document.createElement("i");
    //Ajout de l'attribut class de la balise i pour afficher l'icone
    iconeModifier.className = "fa-regular fa-pen-to-square";
    //Création de la balise p
    const textModifierLink = document.createElement("p");
    //Ajout du texte à afficher dans la balise p
    textModifierLink.innerText = "modifier";
    //Ciblage de la balise parente
    const divPortfolioSection = document.querySelector(".title-portfolio")
    //Attachement des baslisent créées au parent
    divPortfolioSection.appendChild(modifierLink);
    modifierLink.appendChild(iconeModifier);
    modifierLink.appendChild(textModifierLink);

}
