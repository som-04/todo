export function formatDate(date) {
    try {
        return date.toLocalDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch (e) {
        console.log("error", e);
    }
}
