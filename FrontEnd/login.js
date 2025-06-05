async function loginRequest(){
    //Récupération du formulaire
    const formulaireLogin = document.querySelector(".formulaire-login");
    //Ajout d'un listener au moment du submit
    formulaireLogin.addEventListener("submit", 
    //Evènements écoutés au moment du submit
        async function(event){
    // Event 1 : éviter le rechargement de la page après le click sur le bouton
        event.preventDefault();
    //Event 2 :Création de l'objet userLogin
    const userLogin = {
        email: event.target.querySelector("[name=user_email]").value,
        password: event.target.querySelector("[name=user_password]").value
    } 
    //Création de la charge utile
    const chargeUtile = JSON.stringify(userLogin);
    //Appel de la fonction fectch route users/login
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: chargeUtile
    });
    //Réponse de la fonction fetch au format json = JWT(JSON Web Token)
    const data = await response.json();
    //Stockage en local de la réponse = nomClé=token valeurClé=data.token ou valeur de la propriété token 
    localStorage.setItem("token", data.token);
    //Redirection vers la page d'accueil après la connexion réussié
    window.location.href = "index.html";
    });

    
}

loginRequest()
