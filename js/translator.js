/**
 * Google Translate — cookie-based switcher.
 *
 * On static / GitHub Pages sites the goog-te-combo <select> lives inside
 * a sandboxed iframe injected by Google, so dispatchEvent() from the parent
 * document never reaches it.  The reliable alternative is to write the
 * `googtrans` cookie that Google Translate reads on every page load.
 *
 * Cookie format:  googtrans=/sourceLanguage/targetLanguage
 */
function setGoogTransCookie(lang) {
    const hostname = location.hostname;
    // Strip leading "www." to get the root domain
    const domain = hostname.replace(/^www\./, '');

    const expiry = lang === 'en'
        ? 'Thu, 01 Jan 1970 00:00:00 UTC'   // delete cookie → restore English
        : 'Fri, 31 Dec 2099 23:59:59 UTC';  // far future → keep translation

    const value    = lang === 'en' ? '' : `/en/${lang}`;
    const cookieBase = `googtrans=${value}; expires=${expiry}; path=/`;

    // Must be set on both the bare domain and the dot-prefixed domain
    document.cookie = cookieBase;
    document.cookie = `${cookieBase}; domain=${domain}`;
    document.cookie = `${cookieBase}; domain=.${domain}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('page-lang');
    if (!langSelect) return;

    // Reflect the current cookie in the dropdown on page load
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-z]+)/);
    if (match) {
        langSelect.value = match[1];
    }

    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        setGoogTransCookie(lang);
        location.reload();
    });
});
