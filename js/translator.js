function triggerGoogleTranslate(lang) {
    const select = document.querySelector(".goog-te-combo");
    if (!select) {
        // Try again until Google injects the element
        setTimeout(() => triggerGoogleTranslate(lang), 300);
        return;
    }
    select.value = lang;
    select.dispatchEvent(new Event("change"));
}

document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("page-lang");
    langSelect.addEventListener("change", (e) => {
        if (e.target.value) {
            triggerGoogleTranslate(e.target.value);
        }
    });
});
