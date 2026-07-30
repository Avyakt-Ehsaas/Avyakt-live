# Avyakt-Ehsaas 🧘‍♂️  
*A Mindfulness & Meditation Platform for Inner Awareness*

---

## 📖 About the Project

**Avyakt-Ehsaas** is a meditation and mindfulness application designed to help individuals slow down, reconnect with themselves, and cultivate inner peace in a noisy, fast-paced digital world.

The word **“Avyakt”** means *that which cannot be expressed in words*, and **“Ehsaas”** means *feeling*.  
Together, **Avyakt-Ehsaas** represents subtle inner experiences — silence, awareness, calm, and self-realization — which go beyond logic and language.

This project focuses on creating a **digital sanctuary** where users can experience calmness through a minimal, distraction-free interface combined with mindful content.

---

## 🎯 Purpose & Motivation

Modern life often leads to stress, anxiety, and mental fatigue. Avyakt-Ehsaas was built with the following goals:

- To promote **mental well-being and mindfulness**
- To offer a **simple, calming, and intuitive experience**
- To reduce digital clutter and cognitive overload
- To make meditation accessible for beginners as well as experienced practitioners

The platform is designed to feel peaceful, not overwhelming.

---

## 🌿 Core Features

- 🧘 **Meditation Experience**
  - Guided meditation sessions
  - Focus on breathing, awareness, and relaxation

- 🌬️ **Mindfulness Practices**
  - Breathing exercises
  - Stillness and awareness techniques

- 🎧 **Calming Audio**
  - Peaceful soundscapes
  - Minimal background audio to aid focus

- 🎨 **Minimal UI/UX**
  - Clean, modern, and distraction-free design
  - Nature-inspired color palette
  - Smooth layouts with visual balance

- 📱 **Responsive Design**
  - Works seamlessly across desktop, tablet, and mobile devices

- 🔒 **Privacy-Focused**
  - No unnecessary data collection
  - User experience centered around trust and simplicity

---

## 🧠 Design Philosophy

Avyakt-Ehsaas follows a **“less is more”** philosophy.

- Soft colors and calm gradients
- Spacious layouts
- Minimal text
- No aggressive animations
- Focus on silence, breath, and space

The UI is intentionally subtle to allow the **experience** to take center stage.

---

## 🗂️ Project Structure

```
Avyakt-live/
├── client/          # React + Vite frontend
├── backend/         # Legacy Express + MongoDB backend (existing production API)
└── mern-backend/    # New Express + PostgreSQL backend (Plan.md architecture)
```

---

## 🚀 mern-backend — New Backend (Express + PostgreSQL)

Follows the production-grade architecture defined in `Plan.md`.

### Folder Structure

```
mern-backend/src/
├── app.js                        # Express app factory
├── config/
│   └── database.js               # Knex (PostgreSQL) connection
├── middlewares/
│   └── errorHandler.js           # Global error handler
├── modules/
│   └── qrLead/
│       ├── qrLead.controller.js  # HTTP layer
│       ├── qrLead.data-access.js # Knex queries (no business logic)
│       ├── qrLead.validator.js   # Joi validation schemas
│       └── qrLead.routes.js      # Express router
├── routes/
│   └── index.js                  # Root router — mounts all module routers
├── database/
│   ├── migrations/
│   │   └── 001_create_qr_leads.sql
│   └── models/                   # Future ORM/query model definitions
└── utils/
    ├── ApiError.js               # Custom error class (statusCode + isOperational)
    ├── ApiResponse.js            # Standardised success response helper
    └── asyncWrapper.js           # Async handler wrapper — eliminates try/catch
```

### Environment Variables

Create `mern-backend/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/avyakt
ALLOWED_ORIGINS=http://localhost:5173
PORT=4000
```

### Database Setup

Run the migration before starting the server:

```bash
psql $DATABASE_URL -f mern-backend/src/database/migrations/001_create_qr_leads.sql
```

### API Endpoints

| Method | Path | Access | Description |
|--------|------|--------|-------------|
| `POST` | `/api/v1/qr-leads` | Public | Submit QR-scan lead form |
| `GET` | `/api/v1/qr-leads` | Admin | List all QR leads |
| `GET` | `/health` | Public | Health check |

#### POST `/api/v1/qr-leads` — Request Body

```json
{
  "firstName": "Arjun",
  "lastName": "Sharma",
  "phone": "9876543210",
  "email": "arjun@example.com",
  "age": 25
}
```

#### Success Response (201)

```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "data": { "id": "uuid", "first_name": "Arjun", ... }
}
```

#### Error Response (400)

```json
{
  "success": false,
  "error": { "code": "VALIDATION_ERROR", "message": "Enter a valid 10-digit Indian mobile number" }
}
```

### QR Code Integration

The frontend modal (`client/src/components/ui/Modal/QRLeadModal.jsx`) opens automatically when the URL contains `?qr=1`. Point your QR code to:

```
https://avyaktehsaas.com/live-sessions?qr=1
```

---


