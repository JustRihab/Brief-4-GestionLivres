import { livres } from "./state.js";
import { afficherLivres } from "./ui.js";
afficherLivres(livres);

const btnAjouter = document.getElementById("ouvrir-formulaire");
const dialogue = document.getElementById("dialog-livre");
const btnFermer = document.getElementById("fermer-formulaire");
const formulaire = document.getElementById("formulaire-livre");
const btnAjouterSidebar = document.getElementById("ouvrir-formulaire-sidebar");
const titreInput = document.getElementById("title");
const auteurInput = document.getElementById("author");
const titreErreur = document.getElementById("title-erreur");
const auteurErreur = document.getElementById("author-erreur");
const rechercheInput = document.getElementById("recherche-livre");
const triSelect = document.getElementById("tri-livres");
const listeLivres = document.getElementById("liste-livres");
let idLivreEnModification = null;

function rechercherLivres() {
    const recherche = rechercheInput.value.trim().toLowerCase();
    let livresFiltres = livres.filter((livre) => {
        return livre.title.toLowerCase().includes(recherche) ||
               livre.author.toLowerCase().includes(recherche);
    });
    const ordre = triSelect.value;
    livresFiltres.sort((a, b) => {
        let valeurA;
        let valeurB;
        if (ordre === "titre") {
            valeurA = a.title.toLowerCase();
            valeurB = b.title.toLowerCase();
        }
        if (ordre === "auteur") {
            valeurA = a.author.toLowerCase();
            valeurB = b.author.toLowerCase();
        }
        if (ordre === "annee") {
            valeurA = Number(a.year) || 0;
            valeurB = Number(b.year) || 0;
        }
        if (valeurA > valeurB) {
            return 1;
        }
        if (valeurA < valeurB) {
            return -1;
        }
        return 0;
    });
    afficherLivres(livresFiltres);
}

rechercheInput.addEventListener("input", rechercherLivres);
triSelect.addEventListener("change", rechercherLivres);

btnAjouter.addEventListener("click", function() {
    dialogue.showModal();
});

btnAjouterSidebar.addEventListener("click", function() {
    dialogue.showModal();
});

btnFermer.addEventListener("click", function() {
    dialogue.close();
}); 


listeLivres.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-modifier")) {
        const id = Number(event.target.dataset.id);
        const livreAModifier = livres.find((livre) => livre.id === id);
        idLivreEnModification = id;
        titreInput.value = livreAModifier.title;
        auteurInput.value = livreAModifier.author;
        document.getElementById("year").value = livreAModifier.year;
        document.getElementById("genre").value = livreAModifier.genre;
        document.getElementById("description").value = livreAModifier.description;
        document.getElementById("status").value = livreAModifier.status;
        dialogue.showModal();
    }
    else if (event.target.classList.contains("btn-supprimer")) {
        const id = Number(event.target.dataset.id);
        const confirmation = confirm("Voulez-vous vraiment supprimer ce livre ?");
        if (confirmation) {
            const index = livres.findIndex((livre) => livre.id === id);
            livres.splice(index, 1);
            localStorage.setItem("livres", JSON.stringify(livres));
            rechercherLivres();
        }
    } 
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
    if (idLivreEnModification === null) {
    newBook.id = Date.now();
    livres.push(newBook);
    }
    else {
    const index = livres.findIndex((livre) => livre.id === idLivreEnModification);
    livres[index] = {
        ...livres[index],
        ...newBook
    };
    }
    localStorage.setItem("livres", JSON.stringify(livres));
    rechercherLivres();
    idLivreEnModification = null;
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

