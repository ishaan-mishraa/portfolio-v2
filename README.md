<h1 align="center">ishaanm.dev</h1>

<p align="center">
  <b>The source for my personal site</b><br>
  <a href="https://ishaanm.dev">ishaanm.dev</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

A fast, minimal portfolio: who I am, what I've built and where to find me, with a keyboard-first feel.

## Features

- **⌘K command palette** to jump anywhere on the site without touching the mouse
- **Smooth motion** with Framer Motion, kept subtle
- **Dynamic Open Graph image**, so shared links get a proper preview card
- **One-click resume download**
- **Email** handled through Resend

## Built with

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui, Base UI, tw-animate-css |
| Interaction | Framer Motion, cmdk, Lucide icons |
| Email | Resend |
| Hosting | Vercel |

## Structure

```
app/          routes, layout and metadata
components/   UI and page sections
lib/          utilities
public/       static assets
```

## Run it locally

```bash
git clone https://github.com/ishaan-mishraa/portfolio-v2.git
cd portfolio-v2
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000). Email features need your own Resend API key in `.env.local`.

---

<p align="center">
  Designed and built by <a href="https://github.com/ishaan-mishraa">Ishaan Mishra</a>
</p>
