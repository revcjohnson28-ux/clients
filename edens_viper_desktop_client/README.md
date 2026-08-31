# Eden's Viper Chat — Desktop Client

Standalone Electron desktop client for:

https://chat-666.onrender.com/

## Run locally

1. Install Node.js 20 or newer.
2. Open Terminal / PowerShell in this folder.
3. Run:

   npm install
   npm start

## Build Windows installer

On Windows:

   npm install
   npm run dist:win

Installer output is placed in `dist/`.

## Build macOS installer

On a Mac:

   npm install
   npm run dist:mac

DMG and ZIP output are placed in `dist/`.

## Build both with GitHub Actions

Push this entire folder to a GitHub repository. Open the repository's **Actions** tab and run the **Build Desktop Clients** workflow manually. It creates separate Windows and macOS downloadable artifacts.

### macOS warning

The generated macOS build will be unsigned unless an Apple Developer ID certificate and notarization credentials are added later. macOS may therefore show a security warning on first launch. Code signing/notarization can be added when you are ready to distribute publicly.

### Windows warning

An unsigned Windows installer can trigger Microsoft SmartScreen until the application gains reputation or is signed with a code-signing certificate.

## Security design

The client does not store the server owner's password in its source code. Login credentials are entered into the live chat page and handled by the chat server. Node integration is disabled for remote web content, context isolation is enabled, and external links are opened in the user's normal browser.
