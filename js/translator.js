function triggerGoogleTranslate(lang) {
    const select = document.querySelector(".goog-te-combo");
    if (!select) {
        console.warn("Google Translate not yet initialized");
        return;
    }
    select.value = lang;
    select.dispatchEvent(new Event("change"));
}

document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("page-lang");
    langSelect.addEventListener("change", (e) => {
        if (e.target.value) {
            // Wait a tiny bit to ensure Google’s widget is ready
            setTimeout(() => triggerGoogleTranslate(e.target.value), 500);
        }
    });
});
