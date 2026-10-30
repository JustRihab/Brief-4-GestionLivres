export function afficherLivres(livres) {
    const listeLivres = document.getElementById("liste-livres");
    if (livres.length === 0) {
        listeLivres.textContent = "Aucun livre pour le moment.";
        return;
    }
    listeLivres.innerHTML = "";
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
        const statuts = {
            "to-read": "À lire",
            "reading": "En cours de lecture",
            "read": "Lu"
        };
        const statut = document.createElement("p");
        statut.className = "mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700";
        statut.textContent = `Statut : ${statuts[livre.status]}`;
        carte.appendChild(statut);
        listeLivres.appendChild(carte);
    });
}
