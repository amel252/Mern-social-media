// Convertit une date ou un timestamp en format lisible FR
export const dateParser = (input) => {
    if (!input) return null;

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    // input peut être une string ou un timestamp
    const date = new Date(input).toLocaleString("fr-FR", options);
    return date; // déjà une string
};

// Même fonction mais pour les timestamps explicites
export const timestampParser = (timestamp) => {
    if (!timestamp) return null;

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const date = new Date(timestamp).toLocaleString("fr-FR", options);
    return date;
};

// Vérifie si une valeur est vide
export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};
