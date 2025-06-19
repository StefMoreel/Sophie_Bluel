import { getSelectCategorieForm, showWorks } from "./galleries.js";
import { works, modalGallery, modal, modalOne, modalTwo } from "./galleries.js";


const selectCategorieForm = getSelectCategorieForm();

//fonction qui permet d'ouvrir la modale 1 au clic sur le bouton "modifier"


export function onEventUserOpenModal(event){
    event.preventDefault();
    //Modification et ajout des attributs de class et CSS
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modalTwo.classList.remove("active");
    modalOne.classList.add("active");
}
showWorks(works, modalGallery);

// Action de fermeture de la modale 1 et 2
//Au clic sur la croix modale 1
const btnCloseModalOne = document.querySelector(".btn-close-modal-1");
btnCloseModalOne.addEventListener("click", onEventUserCloseModal);
//Au clic sur la croix modale 2
const btnCloseModalTwo = document.querySelector(".btn-close-modal-2");
btnCloseModalTwo.addEventListener("click", onEventUserCloseModal);
//Au clic à l'extérieur de la modale
const overlayCloseModal = document.querySelector(".modal-overlay");
overlayCloseModal.addEventListener("click", onEventUserCloseModal);
//A l'appui sur la touche échap du clavier
window.addEventListener("keydown", function(event){
    if (event.key === "Escape"){
        onEventUserCloseModal(event)
    }
});



//Action d'ouverture de la modale 2 au clic sur le bouton "Ajouter photo"
const btnPostWork = document.querySelector(".btn-open-modal-2");
btnPostWork.addEventListener("click", onEventUserOpenModalTwo);

function onEventUserOpenModalTwo(event){
    event.preventDefault();
    modalOne.classList.remove("active");
    modalTwo.classList.add("active");
    };

//Action de retour vers la modale 1
const btnReturn = document.querySelector(".btn-return-modal-1");
btnReturn.addEventListener("click", onEventUserReturnModalOne);

function onEventUserReturnModalOne() {
    modalTwo.classList.remove("active");
    modalOne.classList.add("active");
    resetFormPostWork()
    };    


//Remplacement de la div de prévisualisation de la photo par la div pour l'ajout d'une photo
function resetFormPostWork(){    
if (previewContainer.parentNode === addPhotoDiv) {
    addPhotoDiv.replaceChild(uploadContainer, previewContainer);// Si la prévisualisation n'est pas affichée, ne rien faire 
}
//Remise à 0 de la sélection de la précédente photo
uploadContainer.querySelector("input[type=file]").value = "";
//Remise à 0 du titre de la photo
titlePhotoToAdd.value = "";
//Remise à 0 de la catégorie sélectionnée
selectCategorieForm.value = "0";
//Remise à 0 du style du bouton de soumission
btnSubmitPostWork.style.backgroundColor = "rgba(167, 167, 167, 1)";
}    



//Fonction qui décrit l'évenement suite au clic pour fermer les modales
function onEventUserCloseModal(event){
        event.preventDefault();
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        resetFormPostWork()
}


    

const addPhotoDiv = document.querySelector(".add-photo-file");
const image = document.createElement("img");
image.className = "selected-image";
const previewContainer = document.createElement("div");
const uploadContainer = addPhotoDiv.querySelector(".upload-container");
let selectedImage = "";

function previewImageModalTwo(eventOnPreview){
    const input = eventOnPreview.target;
    const selectedImage = input.files[0];
    if (!input.files[0]){
        return;
    }
    if (selectedImage.size > 4 * 1024 * 1024) { // 4Mo
        // Afficher un message d'erreur si le fichier est trop volumineux
        alert("Le fichier est trop volumineux. Veuillez sélectionner un fichier de moins de 4 Mo.");
        return;
    }
    const reader = new FileReader();
    reader.onload = function (eventOnLoad){
        image.src = eventOnLoad.target.result;
    }   
    reader.readAsDataURL(selectedImage);
    replaceUploadContainerToPreviewContainer(previewContainer, uploadContainer);
}

//Ajout d'un listener sur l'input de type file pour prévisualiser l'image
addPhotoDiv.addEventListener("change", previewImageModalTwo);

//Fonction qui remplace la div uploadContainer par la div previewContainer
function replaceUploadContainerToPreviewContainer (newContainer, oldContainer){
    newContainer.className = "preview-container";
    newContainer.appendChild(image);
    newContainer.style.padding = "0 10px 0 10px";
    addPhotoDiv.replaceChild(newContainer, oldContainer);
}

//Ciblage du champ de saisie du titre de la photo à ajouter
const titlePhotoToAdd = document.querySelector(".field-title");
//Ciblage du bouton de soumission de la modale 2
const btnSubmitPostWork = document.querySelector(".submit-add-work-modal-2");

//Modification du style du bouton de soumission de la modale 2
function checkFormDataFilledIn(){        
    const titleFilled = titlePhotoToAdd.value.trim() !== "";
    const imageFilled = image.src !== "" ;
    const categorySelected = selectCategorieForm.value !== "0";
     //Si les champs sont remplis, le bouton devient vert
    if (titleFilled && imageFilled  && categorySelected){
            btnSubmitPostWork.style.backgroundColor = "rgba(29, 97, 84, 1)";
            return true
        }
    //Sinon, le bouton reste gris
    else {
            btnSubmitPostWork.style.backgroundColor = "rgba(167, 167, 167, 1)";
            return false;
        }
}

    //Ajout d'un listener sur le champ de saisie du titre de la photo à ajouter
    titlePhotoToAdd.addEventListener("input", checkFormDataFilledIn);
    //Ajout d'un listener sur l'image prévisualisée
    image.addEventListener("change", checkFormDataFilledIn);
    //Ajout d'un listener sur le select des catégories    
    selectCategorieForm.addEventListener("change", checkFormDataFilledIn);