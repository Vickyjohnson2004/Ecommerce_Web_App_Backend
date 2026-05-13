# Ecommerce Project

A full-stack ecommerce application with:

- Mobile app built with **Expo + React Native**
- Admin dashboard built with **React**
- Backend API built with **Node.js + Express + MongoDB**
- JWT-based authentication for mobile and API
- Stripe payments support
- Cloudinary image uploads
- Sentry monitoring

---

## Environment Setup

### Backend (`/backend`)

Create a `.env` file from `.env.example` and provide the following values:

```bash
NODE_ENV=development
PORT=3000
DB_URL=<YOUR_MONGODB_CONNECTION_STRING>
JWT_SECRET=<YOUR_JWT_SECRET>
CLIENT_URL=http://localhost:5173

ADMIN_EMAIL=<YOUR_ADMIN_EMAIL>

CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>

STRIPE_PUBLISHABLE_KEY=<YOUR_STRIPE_PUBLISHABLE_KEY>
STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>
STRIPE_WEBHOOK_SECRET=<YOUR_STRIPE_WEBHOOK_SECRET>
```

### Mobile App (`/mobile`)

Create a `.env` file from `.env.example` and provide the following values:

```bash
EXPO_PUBLIC_API_URL=<YOUR_API_BASE_URL>/api
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=<YOUR_STRIPE_PUBLISHABLE_KEY>
SENTRY_AUTH_TOKEN=<YOUR_SENTRY_DSN>
```

### Admin Dashboard (`/admin`)

Create a `.env` file from `.env.example` and provide the following values:

```bash
VITE_API_URL=<YOUR_API_BASE_URL>/api
VITE_SENTRY_DSN=<YOUR_SENTRY_DSN>
```

---

## Run the Backend

```bash
cd backend
npm install
npm run dev
```

## Run the Admin

```bash
cd admin
npm install
npm run dev
```

## Run the Mobile App

```bash
cd mobile
npm install
npx expo start
```

---

## Production Notes

- Backend requires all required env values and will fail fast if any are missing.
- Mobile uses `EXPO_PUBLIC_API_URL` instead of a hard-coded local address.
- Admin can be built and deployed separately or served from the backend in production.
- Keep `.env` files local and do not commit secret keys.
