function loginRequest(){
    const formulaireLogin = document.querySelector(".fomulaire-login");
    formulaireLogin.addEventListener("submit", function(event){
        event.preventDefault();
    //Création de l'objet userLogin
    const userLogin = {
        email: event.target.querySelector("[name=user_email").value,
        password: event.target.querySelector("[name=user_password").value,
    }
    //Création de la charge utile
    const chargeUtile = JSON.stringify(userLogin);
    //Appel de la fonction fectch route users/login
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: chargeUtile
    });
    });
}
loginRequest()