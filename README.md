# Colin Hebe Homepage

This is the personal homepage project for Colin Hebe, built with React, Vite, and Tailwind CSS. It features a modern UI, Markdown-based posts, and a knowledge base section.

## Features

- ⚡️ Fast and modern React + Vite setup
- 📝 Supports Markdown posts
- 🎨 Styled with Tailwind CSS
- 📚 Knowledge Base section
- 🖥️ Responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or above recommended)
- npm

### Install Dependencies

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

### Build

Build the project for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is configured to deploy to GitHub Pages at the root of your user site (https://c01-in.github.io).

To deploy:

```bash
npm run deploy
```

This will build the project and publish the contents of the `dist` folder to the `gh-pages` branch.

### Notes

- Ensure the `homepage` field in `package.json` is set to `https://c01-in.github.io`.
- In `vite.config.ts`, the `base` should be set to `/` for correct asset paths.

## License

MIT
