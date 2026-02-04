# Tasteboxd (MVP)

Une application type Letterboxd, mais pour les restaurants : découvrir, noter, écrire des avis, suivre des profils et explorer via carte.

## Architecture (diagramme textuel)

```
[Client Next.js + Tailwind]  ->  [Route Handlers Next.js API]
         |                               |
         |                         Prisma ORM
         |                               |
         |                         PostgreSQL
         |
         +--> Leaflet/OSM (carte)
         +--> Nominatim (géocodage)
```

## Stack

- Frontend : Next.js (App Router) + TypeScript + Tailwind
- Backend : Route Handlers Next.js (API)
- DB : PostgreSQL + Prisma
- Auth : NextAuth (Credentials + OAuth Google à ajouter)
- Maps : Leaflet + OpenStreetMap (open-source)
- Geocoding : Nominatim (OSM)
- Déploiement : Vercel + Railway/Supabase (DB) + stockage S3/Supabase Storage

## Schéma Prisma

Le schéma complet se trouve dans `prisma/schema.prisma` et inclut : `User`, `Restaurant`, `Review`, `CuisineTag`, `RestaurantTag`, `Follow`, `List`, `ListItem`, `Photo`, `Report`, `ReviewLike`, `WantToTry`.

## Routes & payloads JSON

### Auth
- `POST /api/auth/[...nextauth]`

### Restaurants
- `GET /api/restaurants?q=ramen&city=Paris`
- `POST /api/restaurants`

```json
{
  "name": "Ramen Kōen",
  "address": "5 Rue Sainte-Anne",
  "city": "Paris",
  "lat": 48.8661,
  "lng": 2.3356,
  "cuisine": "Japonais",
  "priceRange": "€",
  "phone": "+33100000000",
  "website": "https://ramen.example.com",
  "tags": ["ramen", "noodles"]
}
```

- `GET /api/restaurants/:id`

### Reviews
- `GET /api/reviews?restaurantId=...`
- `POST /api/reviews`

```json
{
  "restaurantId": "ckxyz",
  "authorId": "ckuser",
  "rating": 4.5,
  "text": "Super bouillon.",
  "visitedAt": "2024-07-05T12:00:00.000Z",
  "priceRangeAtVisit": "€€",
  "tags": ["ramen"]
}
```

- `PATCH /api/reviews/:id`
- `DELETE /api/reviews/:id`

### Feed
- `GET /api/feed`

### Lists
- `GET /api/lists`
- `POST /api/lists`

```json
{
  "name": "Top ramen",
  "description": "Mes adresses préférées.",
  "isPublic": true
}
```

### Map (bounding box)
- `GET /api/map?minLat=48.84&maxLat=48.88&minLng=2.31&maxLng=2.39&ratingMin=4`

### Geocoding
- `GET /api/geocode?q=Paris 11e`

## Stratégie “restaurants proches”

1. Calculer une bounding box autour d’un centre (lat/lng) + rayon.
2. Requête SQL sur `lat`/`lng` avec index composite.
3. Post-traitement côté API : distance Haversine + tri.

## Pages

- `/` : Home (feed + recherche)
- `/map` : Map Explorer (carte + liste)
- `/restaurants/[id]` : Restaurant detail
- `/restaurants/new` : Ajout restaurant + géocoding
- `/reviews/new` : Write/Edit review
- `/profiles/[id]` : Profile
- `/lists` : Lists
- `/settings` : Settings

## Installation

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

### Variables d'environnement

```
DATABASE_URL=postgresql://user:password@localhost:5432/tasteboxd
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
```

## Seed

`prisma/seed.ts` crée 3 utilisateurs, 10 restaurants et 3 reviews de démo.

## Sécurité & conformité

- Validation serveur via Zod
- RGPD : export/suppression compte (UI paramètre)
- Pas de tracking utilisateur (position uniquement en session)
