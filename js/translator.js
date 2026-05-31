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
    const domain = hostname.replace(/^www\./, '');

    const expiry = lang === 'en'
        ? 'Thu, 01 Jan 1970 00:00:00 UTC'
        : 'Fri, 31 Dec 2099 23:59:59 UTC';

    const value      = lang === 'en' ? '' : `/en/${lang}`;
    const cookieBase = `googtrans=${value}; expires=${expiry}; path=/`;

    document.cookie = cookieBase;
    document.cookie = `${cookieBase}; domain=${domain}`;
    document.cookie = `${cookieBase}; domain=.${domain}`;
}

/** Immediately hide the Google Translate banner iframe + reset body offset. */
function suppressGoogleBanner() {
    // Hide every iframe that Google injects for its toolbar
    document.querySelectorAll('iframe').forEach(frame => {
        if (
            frame.classList.contains('skiptranslate') ||
            frame.name === 'google_translate_o' ||
            (frame.src && frame.src.includes('translate.google'))
        ) {
            frame.style.cssText = 'display:none!important;height:0!important;';
        }
    });
    // Google shifts <body> down by the banner height — undo it
    document.body.style.top = '0';
    document.body.style.removeProperty('margin-top');
}

/** Use a MutationObserver to catch the banner the moment Google injects it. */
function watchForGoogleBanner() {
    suppressGoogleBanner(); // run once immediately in case it's already there

    const observer = new MutationObserver(() => suppressGoogleBanner());
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('page-lang');
    if (!langSelect) return;

    // Sync the dropdown with the active translation on page load
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-z]+)/);
    if (match) {
        langSelect.value = match[1];
    }

    langSelect.addEventListener('change', (e) => {
        setGoogTransCookie(e.target.value);
        location.reload();
    });

    // Start suppressing the Google Translate banner
    watchForGoogleBanner();
});
