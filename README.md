# West Gilmore St Church of Christ

> *"Pointing Souls to Christ Through Truth and Love"*

Full-stack church website — Next.js 14 App Router · Tailwind CSS · Framer Motion · MongoDB · NextAuth

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run dev server
```bash
npm run dev
# → http://localhost:3000
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Run: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | e.g. `http://localhost:3000` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary (image uploads) |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `STRIPE_PUBLISHABLE_KEY` | Stripe donations |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `EMAIL_HOST` | SMTP host e.g. `smtp.gmail.com` |
| `EMAIL_USER` / `EMAIL_PASS` | SMTP credentials |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — animated hero, about, sermon, events, scripture |
| `/about` | History, mission, leadership, beliefs |
| `/ministry` | Ministry programs grid |
| `/sermons` | Sermon library with filters & YouTube embed |
| `/events` | Event list + calendar view |
| `/gallery` | Photo grid with lightbox |
| `/donations` | Online giving form |
| `/resources` | Downloadable materials |
| `/contact` | Contact form + map + service times |
| `/login` | Member sign-in |
| `/register` | New member registration |
| `/portal` | Members dashboard |
| `/portal/prayer` | Prayer wall |
| `/portal/attendance` | Attendance tracker |
| `/portal/news` | Announcements & bulletins |
| `/portal/profile` | Edit profile & password |
| `/admin` | Admin dashboard (admin role required) |

---

## API Routes

| Endpoint | Methods | Auth |
|---|---|---|
| `/api/auth/register` | POST | Public |
| `/api/auth/[...nextauth]` | GET, POST | NextAuth |
| `/api/sermons` | GET / POST | Public / Admin |
| `/api/events` | GET / POST | Public / Admin |
| `/api/prayer` | GET, POST | Members |
| `/api/attendance` | GET, POST | Members |
| `/api/users` | GET, PATCH | Admin |

---

## Make Yourself an Admin

After registering, open your MongoDB database and run:
```js
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
```

---

## Deploy

```bash
npm run build   # must pass before deploying
```

Deploy on [Vercel](https://vercel.com) — connect your repo and add all env vars in the dashboard.
