# SIA Laser - Website pentru Epilare Definitivă cu Laser

Un website modern pentru un centru de epilare definitivă cu laser, construit folosind Astro și Tailwind CSS.

## Caracteristici

- Design modern și responsive
- Optimizat pentru SEO
- Secțiuni pentru servicii, prețuri, despre noi și contact
- Formular de programare
- Afișare hartă Google Maps
- Pagină de întrebări frecvente
- Footer cu informații de contact și linkuri rapide

## Tehnologii folosite

- [Astro](https://astro.build/) - Framework web
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Inter Font](https://fonts.google.com/specimen/Inter) - Font principal

## Pornirea proiectului în mod local

1. Clonează repository-ul:
   ```bash
   git clone https://github.com/username/sialaser.git
   cd sialaser
   ```

2. Instalează dependențele:
   ```bash
   npm install
   ```

3. Pornește serverul de dezvoltare:
   ```bash
   npm run dev
   ```

4. Deschide în browser:
   ```
   http://localhost:4321
   ```

## Structura proiectului

```
src/
├── components/     # Componentele Astro
├── layouts/        # Layout-urile aplicației
├── pages/          # Paginile aplicației
└── styles/         # Fișiere CSS globale
```

## Componente

- `Header.astro` - Bara de navigare
- `Hero.astro` - Secțiunea principală
- `Services.astro` - Servicii oferite
- `Benefits.astro` - Beneficiile epilării cu laser
- `Pricing.astro` - Prețuri și pachete
- `About.astro` - Despre centrul SIA Laser
- `Contact.astro` - Informații de contact și formular de programare
- `Footer.astro` - Footer-ul site-ului

## Personalizare

Pentru a personaliza site-ul, poți modifica următoarele:

- Culorile pot fi modificate în `tailwind.config.mjs`
- Textele și conținutul pot fi modificate în fișierele din directorul `components/`
- Imaginile pot fi înlocuite în directorul `public/`

## Build pentru producție

Pentru a crea versiunea de producție a site-ului:

```bash
npm run build
```

Rezultatul va fi generat în directorul `dist/`.

## Licență

Acest proiect este licențiat sub [MIT License](LICENSE).

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
# sia
