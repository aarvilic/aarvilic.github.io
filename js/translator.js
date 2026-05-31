function triggerGoogleTranslate(lang) {
    // Handle "English" — restore original language via Google's cookie reset
    if (lang === 'en') {
        // Remove the translation cookie and reload to restore English
        const domain = location.hostname.replace(/^www\./, '');
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        location.reload();
        return;
    }

    const select = document.querySelector('.goog-te-combo');
    if (!select) {
        // Google hasn't injected the widget yet — retry
        setTimeout(() => triggerGoogleTranslate(lang), 300);
        return;
    }

    select.value = lang;

    // Fire both 'change' and 'input' events with bubbling so Google's listener catches them
    select.dispatchEvent(new Event('change', { bubbles: true }));
    select.dispatchEvent(new Event('input', { bubbles: true }));
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('page-lang');
    if (!langSelect) return;

    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        if (lang) {
            triggerGoogleTranslate(lang);
        }
    });
});
