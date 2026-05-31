function triggerGoogleTranslate(lang) {
    const select = document.querySelector(".goog-te-combo");
    if (!select) return;

    select.value = lang;
    // Fire change event so Google Translate applies it
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
