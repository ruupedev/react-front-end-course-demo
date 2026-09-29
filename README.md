# Pihakirpputori

A small yard-sale ("pihakirpputori") inventory app built as a front-end course project. You can list items for sale, mark them sold, edit or delete them, attach photos, search, and see simple sales analytics.

The UI is in Finnish.

## Tech stack

**Frontend** (project root)
- React 19 + Vite
- Material UI (MUI) for components and theming
- React Router for navigation
- Recharts for the analytics charts
- Axios for API calls

**Backend** (`backend/`)
- Node.js + Express 5
- SQLite (`sqlite3`) database in `backend/tavarat.db`
- Multer for image uploads (stored in `backend/uploads/`)
- Helmet + CORS

## Features

- **Listing** (`/`): items split into "Myynnissä" (for sale) and "Myyty" (sold) tabs, shown as cards with images
- **Search** (`/hae`): filter items
- **Add item** (`/lisaa`): form with validation and an optional image upload
- **Analytics** (`/analytiikka`): pie chart of sold vs. for sale, bar chart by category
- Edit, delete and toggle sold status from each card
- Toast-style notifications for successful and failed actions

## Getting started

You need Node.js (18+ recommended).

### 1. Backend

```bash
cd backend
npm install
node createDb.js   # optional: resets the database with sample data
node server.js
```

The API runs at `http://localhost:3001`.

### 2. Frontend

In another terminal, from the project root:

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## API

Base URL: `http://localhost:3001`

| Method | Endpoint           | Description                              |
|--------|--------------------|------------------------------------------|
| GET    | `/api/tavarat`     | Get all items                            |
| GET    | `/api/tavarat/:id` | Get one item                             |
| POST   | `/api/tavarat`     | Add an item (multipart, optional `kuva`) |
| PUT    | `/api/tavarat/:id` | Update an item (multipart, optional `kuva`) |
| DELETE | `/api/tavarat/:id` | Delete an item                           |

Uploaded images are served from `/uploads/<filename>`.

### Item fields

| Field        | Type    | Notes                          |
|--------------|---------|--------------------------------|
| `id`         | integer | auto-increment                 |
| `kategoria`  | text    | category, required             |
| `nimi`       | text    | name, required                 |
| `valmistaja` | text    | manufacturer                   |
| `hinta`      | number  | price                          |
| `myyty`      | boolean | sold (stored as 0/1 in SQLite) |
| `kuva`       | text    | image filename                 |

## Project structure

```
├── backend/
│   ├── server.js        # Express API
│   ├── createDb.js      # creates and seeds the SQLite database
│   ├── tavarat.db       # SQLite database
│   └── uploads/         # uploaded item images
├── src/
│   ├── App.jsx          # routes, theme, state and CRUD handlers
│   ├── services/api.js  # Axios calls to the backend
│   └── components/      # AddItem, Analytics, ListItems, Menu,
│                        # Notification, ProductCard, SearchList
└── index.html
```

## Scripts

| Command           | What it does                  |
|-------------------|-------------------------------|
| `npm run dev`     | Start the Vite dev server     |
| `npm run build`   | Production build into `dist/` |
| `npm run preview` | Preview the production build  |
| `npm run lint`    | Run ESLint                    |
