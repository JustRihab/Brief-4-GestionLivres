export let livres = JSON.parse(localStorage.getItem("livres")) || [];

const baseId = Date.now();
livres.forEach((livre, index) => {
    if (!livre.id) {
        livre.id = baseId + index;
    }
});
localStorage.setItem("livres", JSON.stringify(livres));