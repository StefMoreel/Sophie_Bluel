import { onEventUserOpenModal } from "./modal.js";

export let works = [];
export function getSelectCategorieForm() {
            return document.querySelector("#categories-list");
        }
const mainGallery = document.querySelector(".gallery");
export const modalGallery = document.querySelector(".gallery-modal");
const selectCategorieForm = getSelectCategorieForm();
export const modal = document.querySelector("#modal");
export const modalOne = document.querySelector("#modal-1");
export const modalTwo = document.querySelector("#modal-2");

 //Fonction qui fait l'appel API de la route GET WORKS et retourne une réponse json
 export async function ApiGetWorks() {
    //Requete de la route works de l'API (GET)
    const reponse = await fetch("http://localhost:5678/api/works");
    //Réponse de la requete au format JSON
    const repJson = await reponse.json();
    return repJson;
 }
    //Stockage de la réponse json à GET WORKS
    works = await ApiGetWorks();
    //Appel de la fonction d'affichage de chaque work
    showWorks(works, mainGallery);

async function ApiGetCategories() {
    //Requete de la route categories de l'API (GET)
    const reponse = await fetch("http://localhost:5678/api/categories");
    //Réponse de la requete au format JSON
    const repJson = await reponse.json();
    return repJson;
 }
const categories = await ApiGetCategories();

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
createCategoryOptionToSelectInFormPostWork(selectCategorieForm, category.name, category.id);
}

//Fonction qui permet de créer les éléments dans le DOM,
// de les rattacher à la div parente
// et d'ajouter 1 travail dans les éléments créés
function createWorkGalleriesDom(work, galleryDiv){
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
    btnTrash.addEventListener("click", onClicBtnTrashDeleteWork);
    

    
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
export function showWorks(worksList, galleryDiv){
    //Effacement de la balise gallery 
    galleryDiv.innerHTML = "";
    //Parcours des objet de la route works de l'API 
    for (let i=0; i < worksList.length ; i++) {
        createWorkGalleriesDom(worksList[i],galleryDiv);
    }
}

export function addButtonFilter (parent, categoryName, id){      
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


if (isLoggedIn){
    linkLogin.textContent = "logout";
    linkLogin.href="#"
    //Déconnexion de l'utilisateur
    //Au clic sur le lien de déconnexion, on supprime le token stocké en local
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
function createButtonOpenModal() {
    const btnOpenModal = document.createElement("button");
    //Ajout de l'attribut de classe de la balise a pour identifier la fonction du button
    btnOpenModal.className = "btn-open-modal-1"
    //Ajout du texte à afficher dans le bouton
    btnOpenModal.innerText = "modifier";
    //Ciblage de la balise parente
    const divPortfolioSection = document.querySelector(".title-portfolio");
    //Attachement des baslisent créées au parent
    divPortfolioSection.appendChild(divOpenModal);
    divOpenModal.appendChild(iconeModifier);
    divOpenModal.appendChild(btnOpenModal);
    btnOpenModal.addEventListener("click", onEventUserOpenModal);
    return btnOpenModal;
}    

createButtonOpenModal();
}

 //Dans la modale 2 : ajout des catégories dans la liste d'option
export function createCategoryOptionToSelectInFormPostWork(parent, categoryName, id){
    const optionCategoryElement = document.createElement("option");
    optionCategoryElement.value = id;
    optionCategoryElement.innerText = categoryName;
    parent.appendChild(optionCategoryElement);
}

//Fonction qui décrit l'évenement suite au clic sur le bouton poubelle de la modale 1
async function onClicBtnTrashDeleteWork(event){
    //Message de demande de confirmation avant suppression
    const isConfirmed = window.confirm("Etes-vous sûr de vouloir supprimer cet élément?")
    //Si clic sur "annuler" le code s'arrête
    if (!isConfirmed){
        return;
    }
    //Stockage et renvoie de la string en entier de la valeur du nom de l'attribut du work qui est cliqué
    const workToDelete = parseInt(event.currentTarget.attributes.name.value);
    //Vérification que l'utilisateur est connecté
    try{ 
        //Récupération du token stocké en local
        const token = localStorage.getItem("token");
        //Appel de la route DELETE de l'API
        const reponse = await fetch(`http://localhost:5678/api/works/${workToDelete}`,{
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
    //Instruction à exécuter si l'exécution instruite par try est levée
    catch(error){
        alert("erreur réseau");
    }    
}

//Fonction qui permet de poster un nouveau travail
const formAddWork = document.querySelector(".form-add-work-modal-2");
//Ajout d'un listener au moment du submit
formAddWork.addEventListener("submit", onClicSubmitPostWork);

    //Ajout d'un listener sur le bouton de soumission de la modale 2
async function onClicSubmitPostWork(event){
    event.preventDefault();
    //Vérification que les champs sont remplis
    if (!checkFormDataFilledIn()){
        alert("Veuillez remplir tous les champs avant de soumettre le formulaire.");
        return;
    }
    //Message de demande de confirmation avant ajout
    //Si clic sur "ok" le code continue 
    const isConfirmed = window.confirm("Etes-vous sûr de vouloir ajouter cet élément?")
    //Si clic sur "annuler" le code s'arrête
    if (!isConfirmed){
        return;
    }
    let selectedImage = uploadContainer.querySelector("input[type=file]").files[0];
    //Récupération du token stocké en local
    const token = localStorage.getItem("token");
    //Création de l'objet workToPost
    const workToPost = {
        image: selectedImage,
        title: titlePhotoToAdd.value,
        category: selectCategorieForm.value
    }
    //Création de la charge utile
    const formData = new FormData();
    formData.append("image", workToPost.image);
    formData.append("title", workToPost.title);
    formData.append("category", workToPost.category);

    //Ajout de l'en-tête Authorization avec le token
    try{
        //Appel de la route POST de l'API
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        //Si la réponse est OK, on affiche le nouveau travail dans la gallerie principale et dans la modale
        if (response.ok){
            const newWork = await response.json();
            works.push(newWork);
            showWorks(works, mainGallery);
            showWorks(works, modalGallery);
            //Remise à zéro des champs de saisie
            titlePhotoToAdd.innerText = "";
            image.src = "";
            uploadContainer.querySelector("input[type=file]").value = "";
            addPhotoDiv.replaceChild(uploadContainer, previewContainer);
        }else{
            alert("Erreur lors de l'ajout du travail");
        }
    //Instruction à exécuter si l'exécution instruite par try est levée    
    }catch(error){
        console.error("Erreur réseau :", error);
    }
};