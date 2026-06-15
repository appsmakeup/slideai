# SlideAI — AI Presentation Maker (Vercel)

Full-stack AI presentation generator built with Next.js 15 App Router and Vercel Postgres.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, TailwindCSS |
| API | Next.js Route Handlers (same-origin, no separate backend) |
| Database | Vercel Postgres (PostgreSQL) + Drizzle ORM |
| State | Zustand (persistent) |
| AI | Claude (default), GPT-4o, DeepSeek, OpenRouter |
| PPTX Export | PptxGenJS (client-side, no server needed) |
| Hosting | Vercel |

## Project Structure

```
slideai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/route.ts       # POST — AI generation
│   │   │   ├── presentations/
│   │   │   │   ├── route.ts            # GET — list
│   │   │   │   └── [id]/route.ts       # GET/PUT/DELETE — single
│   │   │   ├── rewrite/route.ts        # POST — AI rewrite
│   │   │   └── health/route.ts         # GET — status
│   │   ├── page.tsx                    # Home / generator
│   │   ├── editor/page.tsx             # Slide editor
│   │   ├── templates/page.tsx          # Templates gallery
│   │   ├── presentations/page.tsx      # Saved presentations
│   │   └── settings/page.tsx           # Settings
│   ├── components/
│   │   ├── layout/AppShell.tsx
│   │   └── slides/SlideRenderer.tsx
│   ├── lib/
│   │   ├── ai/generate.ts              # Multi-provider AI
│   │   ├── pptx/export.ts              # PptxGenJS export engine
│   │   ├── db/
│   │   │   ├── schema.ts               # Drizzle Postgres schema
│   │   │   └── client.ts               # Vercel Postgres client
│   │   ├── api.ts                      # Frontend fetch client
│   │   └── store.ts                    # Zustand state
│   └── types/index.ts
├── drizzle/
│   └── 0001_initial.sql
├── drizzle.config.ts
└── vercel.json
```

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/YOUR/slideai.git
git push -u origin main
```

### 2. Import to Vercel

Go to [vercel.com/new](https://vercel.com/new) → Import your repo → Deploy.

### 3. Add Vercel Postgres

In your Vercel project dashboard:
- **Storage** tab → **Create Database** → **Postgres**
- Click **Connect** — environment variables are auto-added

### 4. Run the migration

```bash
# Install Vercel CLI
npm i -g vercel

# Pull env vars locally
vercel env pull .env.local

# Run migration
npm run db:migrate
```

Or paste `drizzle/0001_initial.sql` directly into the Vercel Postgres query console.

### 5. Add AI API keys

In Vercel dashboard → **Settings** → **Environment Variables**:

```
ANTHROPIC_API_KEY = sk-ant-api03-...
```

Optionally add `OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, `OPENROUTER_API_KEY` for multi-provider support.

### 6. Redeploy

Vercel auto-deploys on push. Or trigger manually in the dashboard.

---

## Local Development

```bash
npm install
vercel env pull .env.local   # pulls Postgres + other env vars
npm run db:migrate            # run migration against your dev DB
npm run dev                   # http://localhost:3000
```

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/generate` | Generate presentation (Claude/GPT/etc.) |
| GET | `/api/presentations` | List saved presentations |
| GET | `/api/presentations/:id` | Get single presentation |
| PUT | `/api/presentations/:id` | Update slides |
| DELETE | `/api/presentations/:id` | Delete presentation |
| POST | `/api/rewrite` | AI rewrite slide content |
| GET | `/api/health` | Health check |

## Key Differences from Cloudflare Version

| Feature | Cloudflare | Vercel |
|---------|-----------|--------|
| API layer | Separate Worker | Next.js Route Handlers (same origin) |
| Database | D1 (SQLite) | Vercel Postgres (PostgreSQL) |
| File storage | R2 | Not needed (PPTX is client-side) |
| Config | wrangler.toml | vercel.json |
| Deploy | wrangler deploy | git push |

## License

MIT
