export const dateParser = (num) => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    // Si num est déjà un timestamp -> pas besoin de Date.parse
    let date = new Date(num).toLocaleString("fr-FR", options);
    return date.toString();
};
export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};
