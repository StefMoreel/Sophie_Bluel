// Récupération et stockage des travaux depuis l API au format json
async function generesWorks (){
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();

    //Stockage de la réponse dans un tableau travaux
   

    for (let i=0 ; i<works.length;i++){
        const work = works[i];
        addWork(work);
    }
}
function addWork (work){
// Création des éléments dans le DOM
    const figureElement = document.createElement("figure");

    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;

    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = work.title;

    // Rattacher éléments créés au parent
    const gallery = document.querySelector(".gallery");

    gallery.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
}
generesWorks()
