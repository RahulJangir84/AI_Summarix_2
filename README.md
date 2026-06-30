# 📄 AI Summarix

> An AI-powered SaaS application that transforms PDF documents into structured, actionable summaries — with quiz generation, Notion export, and Stripe-powered subscriptions.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF)](https://clerk.com/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe)](https://stripe.com/)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Summarization** | Gemini 2.5 Flash as primary AI with automatic OpenAI fallback on rate limits |
| 🔍 **OCR Support** | Handles scanned / image-based PDFs via Gemini Vision OCR |
| 🧠 **Quiz Generation** | Auto-generates multiple-choice quizzes from uploaded PDF content |
| 📤 **Notion Export** | OAuth-connected export — pushes structured summaries as Notion pages |
| 📥 **PDF Download** | Download your summary as a formatted PDF directly from the browser |
| 💳 **Stripe Subscriptions** | Full subscription lifecycle — checkout, active status, and cancellation via webhooks |
| 🔐 **Auth with Clerk** | Secure authentication with support for OAuth providers (including Notion) |
| 🗄️ **Neon Serverless DB** | PostgreSQL on Neon with parameterised queries for all DB operations |
| 📊 **Usage Limits** | Plan-based upload limits — Free (5), Basic (30), Pro (1000) |
| 🌙 **Dark Mode** | Full dark/light theme support |

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** — App Router, Server Actions, Server Components
- **[React 19](https://react.dev/)** — UI library
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** — Animations
- **[Radix UI](https://www.radix-ui.com/)** — Accessible UI primitives
- **[Lucide React](https://lucide.dev/)** — Icon library
- **[Sonner](https://sonner.emilkowal.ski/)** — Toast notifications

### Backend / AI
- **[LangChain](https://js.langchain.com/)** — PDF text extraction and chunking
- **[Google Gemini 2.5 Flash](https://ai.google.dev/)** — Primary summarization, OCR, and quiz generation
- **[OpenAI GPT](https://openai.com/)** — Fallback summarization provider
- **[UploadThing](https://uploadthing.com/)** — Secure file uploads to CDN
- **[Cloudinary](https://cloudinary.com/)** — Media management
- **[Pino](https://getpino.io/)** — Structured JSON logging

### Auth & Payments
- **[Clerk](https://clerk.com/)** — Authentication + OAuth (Notion)
- **[Stripe](https://stripe.com/)** — Subscriptions, checkout, webhooks

### Database
- **[Neon](https://neon.tech/)** — Serverless PostgreSQL
- **Raw SQL** — No ORM; parameterised queries via `@neondatabase/serverless`

### Testing
- **[Vitest](https://vitest.dev/)** — Unit testing with mocking

---

## 🗺️ Architecture Overview

```
User uploads PDF
    │
    ├─ UploadThing (CDN storage)
    │
    ├─ LangChain PDFLoader (text extraction)
    │       └─ if text < 50 chars → Gemini OCR fallback
    │
    ├─ Gemini 2.5 Flash (summarization, 3 retries)
    │       └─ if rate-limit error → OpenAI GPT fallback
    │
    ├─ Neon PostgreSQL (summary stored)
    │
    └─ User can:
            ├─ Export to Notion (OAuth via Clerk)
            ├─ Download as PDF
            └─ Generate Quiz (Gemini)
```

---

## 🗄️ Database Schema

```sql
-- Users table (synced from Stripe on payment)
users (id, email_id, full_name, customer_id, price_id, status)

-- PDF summaries
pdf_summary (id, user_id, original_file_url, summary_text, title, file_name, notion_page_url)

-- Payment records
payments (id, amount, status, stripe_payment_id, price_id, user_email)
```

All tables include `created_at` / `updated_at` with auto-update triggers.

---

## 💰 Pricing Plans

| Plan | Price | Upload Limit |
|---|---|---|
| **Free** | $0 | 5 summaries |
| **Basic** | $9/mo | 30 summaries |
| **Pro** | $19/mo | 1,000 summaries |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech/) PostgreSQL database
- A [Clerk](https://clerk.com/) application (with Notion OAuth enabled)
- A [Stripe](https://stripe.com/) account
- A [Google AI](https://ai.google.dev/) API key (Gemini)
- An [OpenAI](https://openai.com/) API key
- An [UploadThing](https://uploadthing.com/) account
- A [Cloudinary](https://cloudinary.com/) account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-summarix.git
cd ai-summarix
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
# Database
DATABASE_URL=your_neon_connection_string

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# AI Providers
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key

# File Uploads
UPLOADTHING_TOKEN=your_uploadthing_token

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_...
```

### 4. Set up the database

Run the schema against your Neon database:

```bash
# Paste schema.sql into Neon SQL editor, or run via psql:
psql $DATABASE_URL -f schema.sql
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Set up Stripe webhooks (local development)

```bash
# Install Stripe CLI, then:
stripe listen --forward-to localhost:3000/api/payments
```

---

## 🧪 Running Tests

```bash
# Run all unit tests
npm test

# Watch mode
npm run test:watch
```

---

## 📁 Project Structure

```
summarix/
├── app/
│   ├── (logged-in)/          # Protected routes (dashboard, upload, summaries, quiz)
│   ├── api/
│   │   ├── payments/         # Stripe webhook handler
│   │   ├── uploadthing/      # UploadThing file router
│   │   └── chat/             # AI chat API route
│   ├── sign-in/ sign-up/     # Auth pages
│   └── page.tsx              # Landing page
├── actions/
│   ├── upload-action.ts      # PDF upload + summarization server action
│   ├── export_to_notion.ts   # Notion export server action
│   └── delete_summary.ts     # Delete summary server action
├── components/
│   ├── summaries/            # Summary cards, quiz, notion button, download
│   ├── upload/               # Upload form components
│   ├── home/                 # Landing page sections
│   └── ui/                   # Shadcn/Radix UI primitives
├── lib/
│   ├── geminiAI.ts           # Gemini summarization (with retry logic)
│   ├── openAI.ts             # OpenAI fallback summarization
│   ├── langchain.ts          # PDF text extraction + OCR fallback
│   ├── ocr.ts                # Gemini Vision OCR for scanned PDFs
│   ├── quiz.ts               # Quiz generation via Gemini
│   ├── payment.ts            # Stripe checkout + subscription handlers
│   ├── user.ts               # Upload limit enforcement
│   └── database.ts           # Neon DB connection
├── utils/
│   ├── prompts.ts            # AI summarization system prompt
│   ├── quizprompt.ts         # Quiz generation prompt
│   └── constants.ts          # Pricing plans + animation variants
├── tests/
│   └── unit/                 # Vitest unit tests
└── schema.sql                # PostgreSQL schema + triggers
```

---

## 🔑 Key Implementation Details

### AI Fallback Chain
The summarization pipeline has a built-in fallback:
1. **Gemini 2.5 Flash** (primary) — with 3 retries on 503 errors
2. **OpenAI GPT** (fallback) — triggered only on rate limit errors

### OCR for Scanned PDFs
After LangChain extracts text, if the result is fewer than 50 characters (indicating an image-based PDF), Gemini Vision is used to OCR the document directly from the raw buffer.

### Stripe Webhook Security
The `/api/payments` route verifies every incoming webhook using `stripe.webhooks.constructEvent()` with the webhook secret — rejecting any unsigned requests.

### Notion Export
Uses Clerk's OAuth token storage — the user connects Notion via Clerk's OAuth flow, and the stored access token is used server-side to create pages in the user's workspace.

---

