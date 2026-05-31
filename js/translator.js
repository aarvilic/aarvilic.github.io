/**
 * Google Translate — cookie-based switcher.
 * Cookie format: googtrans=/sourceLanguage/targetLanguage
 */
function setGoogTransCookie(lang) {
    const domain = location.hostname.replace(/^www\./, '');

    const expiry = lang === 'en'
        ? 'Thu, 01 Jan 1970 00:00:00 UTC'
        : 'Fri, 31 Dec 2099 23:59:59 UTC';

    const value      = lang === 'en' ? '' : `/en/${lang}`;
    const cookieBase = `googtrans=${value}; expires=${expiry}; path=/`;

    document.cookie = cookieBase;
    document.cookie = `${cookieBase}; domain=${domain}`;
    document.cookie = `${cookieBase}; domain=.${domain}`;
}

/** Hide any Google Translate banner iframes already in the DOM. */
function suppressGoogleBanner() {
    document.querySelectorAll('iframe.skiptranslate, .goog-te-banner-frame').forEach(el => {
        el.style.display = 'none';
    });
    // Undo the body shift Google applies when the banner is visible
    if (document.body) {
        document.body.style.top = '0';
    }
}

/**
 * Watch for Google's banner being inserted, but ONLY on childList changes
 * (no attribute observation) to avoid triggering an infinite loop when
 * we ourselves modify element styles.
 */
function watchForGoogleBanner() {
    suppressGoogleBanner();

    const observer = new MutationObserver((mutations) => {
        let needsSuppress = false;
        for (const m of mutations) {
            if (m.addedNodes.length > 0) {
                needsSuppress = true;
                break;
            }
        }
        if (needsSuppress) suppressGoogleBanner();
    });

    observer.observe(document.body, {
        childList: true,  // watch for new nodes only
        subtree: true     // include all descendants
        // attributes: false (default) — CRITICAL: omitting this prevents the
        // infinite loop caused by our own style changes re-triggering the observer
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('page-lang');
    if (!langSelect) return;

    // Sync dropdown with active translation on page load
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-z]+)/);
    if (match) {
        langSelect.value = match[1];
    }

    langSelect.addEventListener('change', (e) => {
        setGoogTransCookie(e.target.value);
        location.reload();
    });

    watchForGoogleBanner();
});
