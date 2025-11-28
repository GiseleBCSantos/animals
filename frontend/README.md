# 🐾 PetCare Frontend

PetCare's **frontend**, a modern platform for managing pets.\
Built with **React**, **Vite**, **TypeScript**, **Zustand**, **React
Query**, **Tailwind CSS**, smooth animations using **framer-motion**,
and integrated with a **Django** backend.

---

## 🏗️ Technologies & Architecture

- **React + Vite** --- Fast, modular, and highly performant
  interface.\
- **TypeScript** --- Static typing for better safety and
  predictability.\
- **Zustand** --- Simple and efficient global state management (auth,
  filters, session).\
- **React Query** --- Data caching and synchronization with the API.\
- **React Router DOM** --- SPA routing with public and private
  routes.\
- **Tailwind CSS** --- Fast, utility-first and responsive styling.\
- **react-scroll-parallax** --- Smooth visual effects with parallax.\
- **framer-motion** --- Modern and fluid animations.

---

## 📁 Folder Structure

    src/
     ├── pages/            # Application pages (home, login, dashboard…)
     ├── components/       # Reusable components
     ├── hooks/            # Custom hooks
     ├── lib/
     │    ├── services/    # API communication services
     │    ├── stores/      # Zustand stores
     │    ├── constants/   # Constants and enums
     │    ├── types/       # Global TypeScript types
     ├── router/           # Routes and private route protection
     ├── styles/           # Global styles

---

## 🔐 Authentication

- Login and registration handled via Django API.\
- User data and tokens stored in Zustand with local persistence.\
- The `use-auth` hook centralizes the entire authentication flow.\
- Private routes protected with `PrivateRoute`.\
- Logout clears session and global state.

---

## 📌 Features

- User signup, login, and password recovery.\
- Full CRUD dashboard for pets.\
- Filtering, search, and pagination.\
- Developer mode with **mock data**.\
- Modern responsive UI with animations.\
- Toast notifications for action feedback.

---

## 🔌 Backend Integration

- REST API communication powered by Django.\
- JWT-protected endpoints.\
- Includes a Dockerfile for containerized execution.

---

## 📌 Important Files

- `src/App.tsx` --- App initialization and global providers.\
- `src/router/index.tsx` --- Route definitions.\
- `src/router/private-route.tsx` --- Private route protection.\
- `src/hooks/use-auth.ts` --- Authentication logic using Zustand.\
- `src/hooks/use-animals-query.ts` --- React Query integration for pet
  CRUD.\
- `src/lib/stores/auth-store.ts` --- Global authentication store.\
- `src/lib/services/animals.ts` --- Pet API service.\
- `src/pages/dashboard.tsx` --- Main dashboard page for logged-in
  users.

---

## 🧩 Extensibility

- Easy to add new pages, routes, entities, and components.\
- Modular and strongly typed architecture for long-term
  maintainability.

---

## 🤝 Contributing

Contributions are welcome!\
Please follow the coding standards and keep the architecture clean.

---

## 📄 License

MIT
