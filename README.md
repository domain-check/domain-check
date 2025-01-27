# Domain Check

Welcome to **Domain Check**, the sleek and modern Progressive Web App (PWA) for domain search and management! 🌐

This fully static app is built with the latest tools and technologies, proudly deployed on **GitHub Pages**, and offers a super-smooth, lightweight user experience. Whether you’re curious about domain DNS details, RDAP records, or just want to keep an eye on your favorite domains, we’ve got you covered.

## Features ✨

- **Domain Search Made Easy**: Search any domain and get:
  - DNS details powered by **Cloudflare**.
  - RDAP records served by **iana.org**, including TLD-specific provider lists.
- **Watchlist**: Add domains to your watchlist and track them effortlessly.
- **Blazing Fast PWA**: Instant load times and offline support thanks to **Vite**, **IndexedDB**, and **TailwindCSS**.
- **Static Excellence**: Fully static and served on **GitHub Pages**, ensuring a secure, fast, and reliable experience.

---

## Tech Stack 🚀

This project is built with love and the following awesome tools:

- **Vue 3** + **Pinia**: For a smooth, reactive UI and state management.
- **Vite**: Lightning-fast bundling and hot module reloading.
- **TailwindCSS**: For a clean, modern, and responsive design.
- **idb**: Simplified IndexedDB for storing your domain watchlist locally.
- **vite-plugin-pwa**: Seamless PWA integration with caching and offline support.

## Architecture Overview 🛠️

Our app respects modern web development principles, including:

- **Full Static Deployment**: No backends, no servers — everything is pre-rendered and delivered via GitHub Pages.
- **IndexedDB Storage**: Local storage for your data, ensuring speed and privacy.
- **API-Driven Content**: All DNS and RDAP data is fetched in real-time from trusted sources like **Cloudflare** and **iana.org**.

---

## Getting Started 🏁

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or later)
- **Git**

### Install

```bash
# Install dependencies
npm install
```

### Development

Run the development server with hot reload:

```bash
npm run dev
```

Access the app at `http://localhost:5173`.

### Build for Production

Build the app for static deployment:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Credits & Acknowledgments 🙌

- **Cloudflare**: For providing DNS data services.
- **iana.org**: For RDAP services and TLD info.
- **Vue, Vite, and TailwindCSS**: The holy trinity of modern web development.
- **GitHub Pages**: Making static site hosting effortless.

---

## Contributing 🤝

We welcome contributions! Feel free to:

- Report bugs
- Suggest new features
- Open pull requests

---

## License 📄

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.


