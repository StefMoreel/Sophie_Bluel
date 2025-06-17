
    //Ciblage de l'élémnent parent
    const mainGallery = document.querySelector(".gallery");
    const modalGallery = document.querySelector(".gallery-modal");
    //const galleryDiv = document.querySelectorAll(".gallery .gallery-modal")
   

 //Fonction qui fait l'appel API de la route GET WORKS et retourne une réponse json
 async function callApiWorks() {
    //Requete de la route works de l'API (GET)
    const reponse = await fetch("http://localhost:5678/api/works");
    //Réponse de la requete au format JSON
    const repJson = await reponse.json();
    return repJson;
 }
    //Stockage de la réponse json à GET WORKS
    let works = await callApiWorks();
    //Appel de la fonction d'affichage de chaque work
    showWorks(works, mainGallery);

//Fonction qui permet de créer les éléments dans le DOM, 
// de les rattacher à la div parente
// et d'ajouter 1 travail dans les éléments créés
function addWork(work, galleryDiv){    
    // Création des éléments dans le DOM
    // Création de la balise figure
    const figureElement = document.createElement("figure");
    figureElement.setAttribute("id", work.id);
    // Création de la balise img (enfant de figure)
    const imgElement = document.createElement("img");
    // Affichage et identification de l'élément dans la baslise img depuis la source dans la route de l'API
    imgElement.src = work.imageUrl;
    // Création de la balise figcation (enfant de figure)
    const figcaptionElement = document.createElement("figcaption");
    // Affichage et identification de l'élément dans le texte de la balise figcaption depuis la source dans la route de l'API
    figcaptionElement.innerText = work.title;
    //Création du bouton trash
    const btnTrash = document.createElement("button")
    btnTrash.className = "btn-trash";
    btnTrash.setAttribute("name", work.id);
    //Création de la balise i (icone trash)
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash-can icon-trash";
    btnTrash.appendChild(trashIcon);
    btnTrash.addEventListener("click", onClickBtnTrashDeleteWork);

    
// Rattacher éléments créés au parent

    //Insertion de la balise figure => enfant de gallery
    galleryDiv.appendChild(figureElement);
    //Insertion de la balise img + affichage élément => enfant de figure
    figureElement.appendChild(imgElement);
    //Insertion de la balise figcation + affichage élément => enfant de figure
    figureElement.appendChild(figcaptionElement);
    figureElement.appendChild(btnTrash);


 }


//Fonction qui efface la balise où doivent s'afficher les travaux + affichage des travaux retourés
function showWorks(worksList, galleryDiv){
    //Effacement de la balise gallery 
    galleryDiv.innerHTML = "";
    //Parcours des objet de la route works de l'APÏ 
    for (let i=0; i < worksList.length ; i++) {
        addWork(worksList[i],galleryDiv);
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

     const selectCategorieForm = document.querySelector("#categories-list");

    for (let i = 0; i < categories.length ; i++){
        const category = categories[i]; 
    addButtonFilter(ulElement, category.name, category.id);
    createCategorieOptionToSelectInFormPostWork(selectCategorieForm, category.name, category.id);
    }

function addButtonFilter (parent, categoryName, id){      
    //Création des éléments pour les boutons dynamiques dans le DOM
    //Création de la balise li
    const liElement = document.createElement("li");
    //création de la balise button
    const buttonElement = document.createElement("button");
    //Affichage du texte du bouton
    buttonElement.innerText = categoryName;
    buttonElement.setAttribute("name", id)
    //Ciblage de l'élement ul et insertion de li
    parent.appendChild(liElement);
    //Ciblage de l'élement li et insertion de button
    liElement.appendChild(buttonElement);
    //Ajout d'un listener clic sur le bouton filtre  
    buttonElement.addEventListener("click", 
        //Après le clic, stockage de la valeur de l'attribut name du bouton
        function(event){
        const buttonName = parseInt(event.currentTarget.attributes.name.value);
            //Si l'attribut name du bouton est = 0, affichage de tous les travaux dans la gallerie principale
            if(buttonName === 0){
                showWorks(works, mainGallery);
            //sinon, on parcours chaque travail et on retourne l'ID de la catégorie pour chacun 
            //qui sera égal à l'attribut name de chaque bouton 
            }else{
                const categoriesFiltered = works.filter(function(work){
                    return work.categoryId === buttonName;   
                })
               
            //Affichage dans la gallerie principale des travaux filtrés par catégorie
            showWorks(categoriesFiltered, mainGallery);
            };
    });

 }

//Affichage de la page après la connexion

const isLoggedIn = localStorage.getItem("token");
const linkLogin = document.querySelector(".link-login");
const modal = document.querySelector("#modal");
const modalOne = document.querySelector("#modal-1");
const modalTwo = document.querySelector("#modal-2");

if (isLoggedIn){
    linkLogin.textContent = "logout";
    linkLogin.href="#"
    linkLogin.addEventListener("click", function(){
        localStorage.removeItem("token");
        window.location.reload();
    })
    //Suppression de l'affichage des boutons filtres
    document.querySelector(".filters").innerHTML = ""

    //Création de la div openModal
    const divOpenModal = document.createElement("div");
    divOpenModal.className = "openModal";
    //Création de la balise i pour l'icone
    const iconeModifier = document.createElement("i");
    //Ajout de l'attribut class de la balise i pour afficher l'icone
    iconeModifier.className = "fa-regular fa-pen-to-square";
    //Création de la balise button pour acceder à la modale
    const btnOpenModal = document.createElement("button");
    //Ajout de l'attribut de classe de la balise a pour identifier la fonction du button
    btnOpenModal.className = "btn-open-modal-1"
    //Ajout du texte à afficher dans le bouton
    btnOpenModal.innerText = "modifier";
    //Ciblage de la balise parente
    const divPortfolioSection = document.querySelector(".title-portfolio")
    //Attachement des baslisent créées au parent
    divPortfolioSection.appendChild(divOpenModal);
    divOpenModal.appendChild(iconeModifier);
    divOpenModal.appendChild(btnOpenModal);

    
    //Clblage du lien d'ouverture de la modale : bouton "modifier"
        btnOpenModal.addEventListener("click", function(event){
            event.preventDefault();
            //Modification et ajout des attributs de class et CSS
            modal.style.display = null;
            modal.removeAttribute('aria-hidden');
            modal.setAttribute('aria-modal', 'true');
            modalTwo.classList.remove("active");
            modalOne.classList.add("active");


            

        })
        // Action de fermeture de la modale 1 et 2

        //Au clic sur la croix modale 1
        const btnCloseModalOne = document.querySelector(".btn-close-modal-1");
        btnCloseModalOne.addEventListener("click", OnEventUserCloseModal);
        //Au clic sur la croix modale 2
        const btnCloseModalTwo = document.querySelector(".btn-close-modal-2");
        btnCloseModalTwo.addEventListener("click", OnEventUserCloseModal);
        //Au clic à l'extérieur de la modale
        const overlayCloseModal = document.querySelector(".modal-overlay");
        overlayCloseModal.addEventListener("click", OnEventUserCloseModal);
        //A l'appui sur la touche échap du clavier
        window.addEventListener("keydown", function(event){
            if (event.key === "Escape"){
                OnEventUserCloseModal(event)
            }
        });

    showWorks(works, modalGallery);

    //Action d'ouverture de la modale 2 au clic sur le bouton "Ajouter photo"
    const btnPostWork = document.querySelector(".btn-open-modal-2");
    btnPostWork.addEventListener("click", function(event){
        event.preventDefault();
        modalOne.classList.remove("active");
        modalTwo.classList.add("active");

    });

    //Action de retour vers la modale 1
    const btnReturn = document.querySelector(".btn-return-modal-1");
    btnReturn.addEventListener("click", function() {
    modalTwo.classList.remove("active");
    modalOne.classList.add("active");
    //Remplacement de la div de prévisualisation de la photo par la div pour l'ajout d'une photo
    addPhotoDiv.replaceChild(uploadContainer, previewContainer);
    //Remise à 0 de la sélection de la précédente photo
    uploadContainer.querySelector("input[type=file]").value = "";

    });

}

//Dans la modale 2 : ajout des catégories dans la liste d'option
function createCategorieOptionToSelectInFormPostWork(parent, categoryName, id){
    
    const optionCategoryElement = document.createElement("option");
    optionCategoryElement.value = id;
    optionCategoryElement.innerText = categoryName;
   
    parent.appendChild(optionCategoryElement);

}

//Fonction qui décrit l'évenement suite au clic pour fermer les modales
function OnEventUserCloseModal(event){
        event.preventDefault();
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
}

//Fonction qui décrit l'évenement suite au clic sur le bouton poubelle de la modale 1

//
async function onClickBtnTrashDeleteWork(event, id){
    //Message de demande de confirmation avant suppression
    const isConfirmed = window.confirm("Etes-vous sûr de vouloir supprimer cet élément?")
    //Si clic sur "annuler" le code s'arrête
    if (!isConfirmed){
        return;
    }
    //Stockage et renvoie de la string en entier de la valeur du nom de l'attribut du work qui est cliqué
    const workToDelete = parseInt(event.currentTarget.attributes.name.value);
    
    
    try{ 
        //Récupération du token stocké en local
        const token = localStorage.getItem("token");
        //Appel de la route DELETE de l'API
        const reponse = await fetch(`http://localhost:5678/api/works/${id}`,{
            method : "DELETE",
            headers : {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                }

            });
        //Si l'API renvoie OK    
        if (reponse.ok){
            //Déclaration d'une nouvelle liste
            const worksUpdatedWithoutDeleteWork = [];
            //Boucle dans la liste des works
            for (let i = 0 ; i < works.length ; i++){
                //Si l'id d'un work est différent de celui qui doit être supprimé
                if (works[i].id != workToDelete){
                    //Mise à jour de la nouvelle liste avec l'id du work
                    worksUpdatedWithoutDeleteWork.push(works[i])
                }
            }
            //Nouvelle déclaration de works qui correspond à la nouvelle liste
            works = worksUpdatedWithoutDeleteWork; 
            //Affichage de la liste MAJ dans la gallerie principale
            showWorks(works, mainGallery);
            ////Affichage de la liste MAJ dans la gallerie de la modale
            showWorks(works, modalGallery);
        //Sinon alerte d'erreur    
        }else{
            alert("Erreur lors de la suppression de l'élément");
        }
    }
    catch(error){
        alert("erreur réseau");
    }    
}
    

const addPhotoDiv = document.querySelector(".add-photo-file");
const image = document.createElement("img");
image.className = "selected-image";
const previewContainer = document.createElement("div");
const uploadContainer = addPhotoDiv.querySelector(".upload-container");

function previewImage(eventOnPreview){
    const input = eventOnPreview.target;
    const selectedFile = input.files[0];
    if (!input.files[0]){
        return;
    }
    const reader = new FileReader();
    reader.onload = function (eventOnPreview){
        image.src = eventOnPreview.target.result;
    }
    reader.readAsDataURL(selectedFile);

replaceUploadContainerToPreviewContainer(previewContainer, uploadContainer);
}

addPhotoDiv.addEventListener("change", previewImage);

function replaceUploadContainerToPreviewContainer (newContainer, oldContainer){
    newContainer.className = "preview-container";
    newContainer.appendChild(image);
    newContainer.style.padding = "0 10px 0 10px";
    addPhotoDiv.replaceChild(newContainer, oldContainer);
}

