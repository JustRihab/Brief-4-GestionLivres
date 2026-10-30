export function obtenirStatut(status) {
    const statuts = {
        "to-read": "À lire",
        "reading": "En cours de lecture",
        "read": "Lu"
    };
    return statuts[status];
}