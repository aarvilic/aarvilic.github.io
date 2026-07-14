# Venkatesh Rapolu Insurance Advisory Website

Static, single-page website for Venkatesh Rapolu, a LIC life insurance advisor and Star Health insurance consultant. The site presents insurance plans, helps visitors narrow down suitable coverage, and provides several ways to request a consultation.

## Features

- Responsive single-page navigation with mobile menu support
- Hero carousel highlighting featured LIC plans
- About section with animated experience, family, and claims counters
- Filterable LIC policy catalog covering endowment, whole-life, money-back, child, term, pension, ULIP, and single-premium plans
- Star Health policy catalog
- Four-step Smart Policy Finder with rule-based recommendations for LIC, Star Health, or combined coverage
- Contact form for requesting a financial projection or consultation
- WhatsApp, Telegram, email, and phone contact links
- Persistent dark/light theme selection using `localStorage`
- English, Telugu, and Hindi translation through Google Translate
- Responsive layouts and animations for desktop, tablet, and mobile screens

## Tech Stack

- HTML5
- CSS3, organized into page, component, layout, responsive, and theme files
- Vanilla JavaScript
- Font Awesome icons via CDN
- Google Fonts via CDN
- Google Translate widget
- Web3Forms API for contact form submissions

No package manager, bundler, or build step is required.

## Run Locally

Because the page uses external scripts and submits data through an API, use a local HTTP server instead of opening `index.html` directly from the file system.

### Python

```bash
python -m http.server 8000
```

### Node.js

```bash
npx serve .
```

Open [http://localhost:8000](http://localhost:8000) when using Python, or the URL printed by `serve`.

## Project Structure

```text
.
├── index.html             # Main page and content
├── favicon.ico            # Site favicon and navigation logo
├── css/
│   ├── variables.css      # Theme tokens and design variables
│   ├── reset.css          # Base element normalization
│   ├── components.css     # Shared UI components
│   ├── layout.css         # Page layout and section styling
│   ├── pages.css          # Page-specific styles
│   ├── responsive.css     # Responsive breakpoints and animations
│   └── translator.css     # Language selector and Translate UI overrides
└── js/
    ├── theme.js           # Theme persistence and toggle behavior
    ├── navigation.js      # Mobile navigation and scroll state
    ├── ui-components.js   # Carousel, counters, and policy filters
    ├── policy-finder.js   # Recommendation logic and contact form handling
    └── translator.js      # Google Translate language switching
```

## External Services

The page depends on the following third-party resources when it is loaded online:

- Google Fonts for `Playfair Display` and `Plus Jakarta Sans`
- Font Awesome 6.4 for icons
- Unsplash and WordPress-hosted images used by the plan cards and carousel
- Google Translate for Telugu and Hindi translations
- Web3Forms for contact form delivery

The Web3Forms access key is referenced by the client-side form handler in `js/policy-finder.js`. Replace it with the correct project key when deploying a fork, and verify the form destination in the Web3Forms dashboard.

## Updating Content

- Edit page copy, plan cards, contact details, and navigation labels in `index.html`.
- Add or change theme colors and shared design tokens in `css/variables.css`.
- Update recommendation branches in `js/policy-finder.js` when plan options or business rules change.
- Keep policy information, plan numbers, benefits, and premium guidance aligned with the latest official provider material before publishing.

## Deployment

This repository can be deployed to any static hosting provider, including GitHub Pages. Publish the repository root as the site directory; no compilation or server-side runtime is needed.

Before publishing, check that:

1. All external image and CDN URLs load over HTTPS.
2. The Web3Forms key and notification settings are configured for the deployment.
3. Contact links and the displayed office details are current.
4. The site has been tested on both narrow mobile and desktop viewports.
5. Insurance plan descriptions and claims are reviewed for accuracy and compliance.

## License

No license file is currently included in this repository. Add a license before redistributing the source or reusing the site commercially.