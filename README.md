# Pixel Media

A modern, multi-lingual portfolio and creative agency website built with Next.js, featuring dynamic animations and a sleek user interface.

![Pixel Media Screenshot](./public/screenshot.png)

## 📌 Features

- **Multi-lingual Support**: Fully localized in English, French, and Arabic using `next-intl`.
- **Interactive Animations**: Advanced, smooth scroll animations powered by GSAP.
- **Modern UI**: Styled with Tailwind CSS for a responsive, clean, and professional aesthetic.
- **Dynamic 3D Elements**: Includes high-performance interactive 3D components like Cobe.
- **Optimized Performance**: Taking advantage of Next.js App Router and Turbopack.

## 💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/)
- **Internationalization (i18n)**: [next-intl](https://next-intl-docs.vercel.app/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Globe**: [Cobe](https://cobe.vercel.app/)

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have Node.js and npm (or yarn/pnpm/bun) installed on your machine.

### Installation

1. Clone the repository and navigate to the project folder:
   ```bash
   cd pixel_media_mainn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/src/app/[locale]/` - Contains localized pages and routing.
- `/src/components/` - Reusable React components (UI, layout, etc.).
- `/src/constants/` - Static data and configuration files.
- `/public/` - Static assets including images, icons, and fonts.
