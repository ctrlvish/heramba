# Heramba Communications website

A dependency-free, single-page website ready for GitHub Pages. Edit `index.html` for content, `styles.css` for design, and `script.js` for the contact-form behaviour. The images used by the page are in `assets/` with descriptive filenames.

## Preview locally

From this folder, run `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Contact form

The form submits to Formspree endpoint `https://formspree.io/f/xrpbpkdo` and displays success or error feedback without leaving the page. Confirm the Formspree recipient address, then test a real submission after publishing. The visitor should remain on this page and see the success message, and the email must arrive at `vengad@herambacommunications.com`. Consider Formspree's domain restriction and spam settings after the final domain is live.

## Publish on GitHub Pages

1. Create a public GitHub repository and push this folder. The original Wix export and the private approval checklist are excluded by `.gitignore`.
2. In the repository, open **Settings → Pages**. Choose **Deploy from a branch**, the default branch, and **/(root)** as the source.
3. Once the site is available on its GitHub Pages URL, verify images, navigation, mobile layout, and the contact form.
4. To use `herambacommunications.com`, add it in **Settings → Pages → Custom domain** and follow GitHub's DNS instructions for the domain. Add the resulting `CNAME` file to the repository, and enable **Enforce HTTPS** once available. Do not point DNS away from an existing live site until the new page is ready.

The project has no build step, package manager, or external font dependency. It self-hosts a small Latin subset of [Inter](https://github.com/rsms/inter) in `assets/fonts/`; its open-font licence is included there.
