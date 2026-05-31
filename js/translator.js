/**
 * translator.js
 * Bridges the custom #page-lang <select> to Google Translate's hidden widget.
 *
 * Root causes fixed:
 *  1. Google Translate only responds to a bubbling "change" event — plain
 *     `new Event("change")` does NOT bubble, so the widget never fired.
 *  2. Restoring to English requires hitting the /setprefs reset URL or
 *     clicking the hidden "Show original" button — not just setting value="en".
 *  3. The widget can take several seconds to inject on GitHub Pages (slow CDN),
 *     so we poll more aggressively and cap retries.
 */

(function () {
    'use strict';

    var MAX_RETRIES = 40;   // 40 × 250 ms = 10 s max wait
    var POLL_MS = 250;

    /* ------------------------------------------------------------------ */
    /* Helpers                                                              */
    /* ------------------------------------------------------------------ */

    /**
     * Restore page to the original English without reloading.
     * Google Translate exposes a hidden "restore" link inside the banner
     * frame; we simulate a click on it.  If that frame isn't ready yet
     * we fall back to clearing the googtrans cookie and reloading once.
     */
    function restoreToEnglish() {
        try {
            var frame = document.querySelector('.goog-te-banner-frame');
            if (frame && frame.contentDocument) {
                var restore = frame.contentDocument.querySelector('.goog-te-button button');
                if (restore) { restore.click(); return; }
            }
        } catch (e) { /* cross-origin guard */ }

        // Fallback: clear the translation cookie and do a soft reload
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname + ';';
        location.reload();
    }

    /**
     * Dispatch the change event Google Translate actually listens to.
     * The critical fix: `bubbles: true` — without it the event never
     * reaches Google's listener which is attached higher up the DOM.
     */
    function fireChangeEvent(select) {
        // Modern browsers
        select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    /**
     * Find the hidden .goog-te-combo, set its value, and trigger translation.
     * Retries up to MAX_RETRIES times while Google Translate is still loading.
     */
    function triggerGoogleTranslate(lang, retries) {
        retries = retries || 0;

        if (lang === 'en') {
            restoreToEnglish();
            return;
        }

        var select = document.querySelector('.goog-te-combo');

        if (!select) {
            if (retries < MAX_RETRIES) {
                setTimeout(function () {
                    triggerGoogleTranslate(lang, retries + 1);
                }, POLL_MS);
            } else {
                console.warn('[translator] Google Translate widget never appeared.');
            }
            return;
        }

        select.value = lang;
        fireChangeEvent(select);
    }

    /* ------------------------------------------------------------------ */
    /* Wire up the custom dropdown                                          */
    /* ------------------------------------------------------------------ */

    function init() {
        var langSelect = document.getElementById('page-lang');
        if (!langSelect) { return; }

        langSelect.addEventListener('change', function (e) {
            var lang = e.target.value;
            if (lang) {
                triggerGoogleTranslate(lang);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

}());
