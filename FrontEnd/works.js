console.log("test");

fetch("http://localhost:5678/api/works");

// Création des éléments dans le DOM
const figureElement = document.createElement("figure");

const imgElement = document.createElement("img");


const figcaptionElement = document.createElement("figcaption");

// Rattacher éléments créés au parent
const gallery = document.querySelector(".gallery");
gallery.appendChild(figureElement);
figureElement.appendChild(imgElement);
figureElement.appendChild(figcaptionElement);