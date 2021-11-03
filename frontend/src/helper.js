export const getDate = (givenDate) => {
    if (!givenDate) return;
    const date = new Date(givenDate);
    const d = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", hour12: true, hour: "2-digit", minute: "2-digit" }).split(",");
    const finalDate = d[0] + d[1].toUpperCase();
    return finalDate;
};
