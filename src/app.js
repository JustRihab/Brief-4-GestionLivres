import { livres } from "./state.js";
import { afficherLivres } from "./ui.js";

const btnAjouter = document.getElementById("ouvrir-formulaire");
const dialogue = document.getElementById("dialog-livre");
const btnFermer = document.getElementById("fermer-formulaire");
const formulaire = document.getElementById("formulaire-livre");
const titreInput = document.getElementById("title");
const auteurInput = document.getElementById("author");
const titreErreur = document.getElementById("title-erreur");
const auteurErreur = document.getElementById("author-erreur");


btnAjouter.addEventListener("click", function() {
    dialogue.showModal();
});

btnFermer.addEventListener("click", function() {
    dialogue.close();
}); 

formulaire.addEventListener("submit", function(event) {
    event.preventDefault();
    const titre = titreInput.value.trim();
    const auteur = auteurInput.value.trim();
    if (titre === "") {
    titreErreur.textContent = "Le titre est obligatoire.";
    titreErreur.classList.remove("hidden");
    titreInput.setAttribute("aria-invalid", "true");
    titreInput.setAttribute("aria-describedby", "title-erreur");
    }
    else {
        titreErreur.classList.add("hidden");
        titreInput.removeAttribute("aria-invalid");
        titreInput.removeAttribute("aria-describedby");
    }
    if (auteur === "") {
        auteurErreur.textContent = "l'auteur est obligatoire.";
        auteurErreur.classList.remove("hidden");
        auteurInput.setAttribute("aria-invalid", "true");
        auteurInput.setAttribute("aria-describedby", "author-erreur");
    }
    else {
       auteurErreur.classList.add("hidden");
       auteurInput.removeAttribute("aria-invalid");
       auteurInput.removeAttribute("aria-describedby");
    }
    if (titre === "" || auteur === "") {
        if (titre === "") {
            titreInput.focus();
        }
        else {
            auteurInput.focus();
        }
        return;
    }
    const newBook = {
        title: titre,
        author: auteur,
        year: document.getElementById("year").value,
        genre: document.getElementById("genre").value.trim(),
        description: document.getElementById("description").value.trim(),
        status: document.getElementById("status").value
    };
    livres.push(newBook);
    localStorage.setItem("livres", JSON.stringify(livres));
    afficherLivres(livres);
    formulaire.reset();
    dialogue.close();
});

titreInput.addEventListener("input", function() {
    if (titreInput.value.trim() !== "") {
        titreErreur.classList.add("hidden");
        titreInput.removeAttribute("aria-invalid");
        titreInput.removeAttribute("aria-describedby");
    }
});

auteurInput.addEventListener("input", function() {
    if (auteurInput.value.trim() !== "") {
        auteurErreur.classList.add("hidden");
        auteurInput.removeAttribute("aria-invalid");
        auteurInput.removeAttribute("aria-describedby");
    }
});
