# sam-bday-card

This repository contains a simple interactive birthday card website you can customize.

Where to put your assets
- Put images in: `assets/images/`
- Put music files in: `assets/audio/`
- Put any local font files in: `assets/fonts/`

Supported/suggested formats
- Images: .webp, .jpg, .jpeg, .png (use WebP for best compression)
- Audio: .mp3 (most compatible), .ogg (good fallback)
- Fonts: .woff / .woff2 (recommended)

Quick local preview
1. Clone the repo
   - git clone <repo-url>
2. Start a local static server:
   - python3 -m http.server 8000    (then open http://localhost:8000)
   - or use VS Code Live Server extension

Publish with GitHub Pages
1. Commit and push your files (index.html at root or put site in `docs/`).
2. In GitHub, go to Settings → Pages → Source, choose the branch (e.g., `main`) and folder (`/` or `/docs`), and save.
3. Your site will be published at the URL shown in Pages settings.

Notes & tips
- Browser autoplay rules: You usually must start audio after a user gesture (click). Provide a clear Play button.
- Large media: GitHub limits files to 100 MB; for files > 50 MB consider Git LFS.
- Credits and licensing: make sure you have the rights to any music/images you upload and include attribution if required.
- Accessibility: ensure alt text for images and visible controls for audio.
- Customize fonts via Google Fonts (link in head) or self-host in `assets/fonts/` using `@font-face`.