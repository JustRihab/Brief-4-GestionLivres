import { obtenirStatut } from "./utils.js";
export function afficherLivres(livres) {
    const listeLivres = document.getElementById("liste-livres");
    const messageVide = document.getElementById("message-vide");
    listeLivres.innerHTML = "";
    if (livres.length === 0) {
        listeLivres.appendChild(messageVide);
        return;
    }
    livres.forEach((livre) => {
        const carte = document.createElement("div");
        carte.className ="rounded-xl border border-gray-200 bg-white p-5 shadow-sm";
        const titre = document.createElement("h3");
        titre.className = "mb-2 text-lg font-bold text-gray-900";
        titre.textContent = livre.title;
        const auteur = document.createElement("p");
        auteur.className = "mb-2 text-sm text-gray-600";
        auteur.textContent = `Auteur : ${livre.author}`;
        carte.append(titre, auteur);
        if (livre.year) {
            const annee = document.createElement("p");
            annee.className = "mb-2 text-sm text-gray-600";
            annee.textContent = `Année : ${livre.year}`;
            carte.appendChild(annee);
        }
        if (livre.genre) {
            const genre = document.createElement("p");
            genre.className = "mb-2 text-sm text-gray-600";
            genre.textContent = `Genre : ${livre.genre}`;
            carte.appendChild(genre);
        }
        if (livre.description) {
            const description = document.createElement("p");
            description.className = "mb-3 text-sm text-gray-700";
            description.textContent = livre.description;
            carte.appendChild(description);
        }
        const statut = document.createElement("p");
        statut.className = "mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700";
        statut.textContent = `Statut : ${obtenirStatut(livre.status)}`;
        carte.appendChild(statut);
        const btnModifier = document.createElement("button");
        btnModifier.textContent = "Modifier";
        btnModifier.className = "btn-modifier mt-4 mx-4 bg-blue-600 rounded-full px-4 py-1 font-medium text-white hover:bg-blue-700";
        btnModifier.dataset.id = livre.id;
        carte.appendChild(btnModifier);
        const btnSupprimer = document.createElement("button");
        btnSupprimer.textContent = "Supprimer";
        btnSupprimer.className = "btn-supprimer mt-3 mx-3 bg-red-700 rounded-full px-4 py-1 font-medium text-white hover:bg-red-800";
        btnSupprimer.dataset.id = livre.id;
        carte.appendChild(btnSupprimer);
        listeLivres.appendChild(carte);
    });
}
