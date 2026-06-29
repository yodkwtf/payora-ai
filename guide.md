# PayoraAI - Setup Guide

This is a complete, step-by-step setup for running PayoraAI locally and deploying it.
Everything that needs a key or external account is covered here.

PayoraAI works out of the box with **zero setup** in guest mode (data stays in your
browser). The steps below unlock the optional extras:

- **AI features** (Insights, Ask AI, and Add-form auto-fill): need an Anthropic API key.
- **Accounts + cloud sync**: need a free Supabase project.
- **Google / GitHub sign-in**: needs the providers enabled in Supabase (section 5.6).
- **SEO / social preview**: needs your deployed site URL.

These work with **no setup at all**:

- **Multi-currency totals** convert via a free, key-less exchange-rate API (`/api/fx`),
  falling back to bundled rates offline.
- **Renewal reminders** use the browser's notification permission (no server needed).
- **Installable PWA + offline mode** ship with the app.
- **Country flags** render as SVGs (from flagcdn.com) so they show on Windows too.

---

## 1. Prerequisites

| Tool | Version | Notes |
| ---- | ------- | ----- |
| Node.js | **20 LTS or newer** (22 LTS recommended) | https://nodejs.org/ then check with `node -v` |
| npm | comes with Node | check with `npm -v` |
| Git | any recent version | optional, for cloning |

---

## 2. Install & run locally

```bash
# from the project folder
npm install
npm run dev
```

Open http://localhost:3000. You'll land on the marketing page. Click **Try the live
demo** then **Continue as guest** to use the full app immediately with sample data.

---

## 3. Environment variables

Copy the example file and fill in only the values you need:

```bash
cp .env.example .env.local
```

`.env.local` is git-ignored, so your secrets never get committed. Restart `npm run dev`
after changing it.

| Variable | Required? | What it does |
| -------- | --------- | ------------ |
| `ANTHROPIC_API_KEY` | optional | Powers all AI features (Insights, Ask AI, Add-form auto-fill). |
| `NEXT_PUBLIC_SUPABASE_URL` | optional | Enables real accounts + cloud sync. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | optional | Public Supabase key (safe to ship; protected by RLS). |
| `NEXT_PUBLIC_SITE_URL` | optional | Your production URL, used for SEO/Open Graph absolute links. |

There are **no other keys to set**. FX conversion, reminders, and the PWA need nothing.

---

## 4. AI features (Anthropic), optional

One key unlocks every AI feature:

- **AI Insights** on the dashboard ("Analyse my subscriptions") - cancellation suggestions.
- **Ask AI** (input at the bottom of the AI panel) - free-form questions about your stack.
- **AI auto-fill** in the Add/Edit form - guesses the category + billing cycle from a name.

Steps:

1. Go to https://console.anthropic.com/ and sign in.
2. Open **Settings -> API keys -> Create key**. Copy it (starts with `sk-ant-`).
3. Add it to `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```
4. Restart the dev server. The AI features will now work.

> The app uses the `claude-sonnet-4-6` model server-side via the routes under
> `app/api/ai-*`. The key is read on the server only and never exposed to the browser.
> Without a key, every other feature still works; only the AI buttons are disabled.

---

## 5. Accounts & cloud sync (Supabase), optional

Supabase gives every user their own login and stores their data in the cloud. The free
tier is plenty for a side project.

### 5.1 Create the project

1. Go to https://supabase.com/ and sign in (GitHub login is easiest).
2. Click **New project**. Pick a name (e.g. `payoraai`), set a strong database password
   (save it somewhere), and choose the region closest to you.
3. Wait about 2 minutes for it to provision.

### 5.2 Grab your keys

1. In the project, open **Project Settings (gear icon) -> API**.
2. Copy these two values into `.env.local`:
   - **Project URL** goes to `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys -> `anon` `public`** goes to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

```
NEXT_PUBLIC_SUPABASE_URL=https://abcdxyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### 5.3 Create the data table (with security)

PayoraAI stores each user's whole dataset as a single JSON row, protected by Row Level
Security so users can only read/write their own row.

1. In Supabase, open **SQL Editor -> New query**.
2. Paste and **Run** this:

```sql
-- One JSON blob of subscriptions/activity/settings per user.
create table if not exists public.subscriptions_data (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Lock it down: a user can only touch their own row.
alter table public.subscriptions_data enable row level security;

create policy "Users manage their own data"
  on public.subscriptions_data
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### 5.4 Configure email auth

1. Open **Authentication -> Sign In / Providers** and make sure **Email** is enabled.
2. For easy local testing, turn **off** "Confirm email" (Authentication -> Providers ->
   Email -> *Confirm email*). New sign-ups can then log in immediately without an inbox.
   - Leave it **on** for production if you want verified emails. With it on, users must
     click the link in their email before their first sign-in.
3. (Optional) Under **Authentication -> URL Configuration**, set the **Site URL** to
   `http://localhost:3000` for local dev, and your real domain for production.

### 5.5 Try it

Restart `npm run dev`, go to **Sign in -> Create an account**, and register. Your data now
syncs to Supabase and follows you across devices and browsers. The amber "guest" banner
disappears once you're signed in.

### 5.6 Google / GitHub sign-in (optional)

The **Continue with Google** and **Continue with GitHub** buttons appear automatically once
Supabase is configured. They only work after you enable the provider in Supabase:

**GitHub**

1. On GitHub, go to **Settings -> Developer settings -> OAuth Apps -> New OAuth App**.
2. Set **Authorization callback URL** to
   `https://<your-project-ref>.supabase.co/auth/v1/callback` (copy the exact value from the
   next step). Homepage URL can be your site URL.
3. In Supabase, open **Authentication -> Sign In / Providers -> GitHub**, toggle it on, and
   paste the **Client ID** and **Client Secret** from the GitHub OAuth App. Supabase shows
   the callback URL to use in step 2.

**Google**

1. In the [Google Cloud Console](https://console.cloud.google.com/), create an **OAuth 2.0
   Client ID** (type: Web application).
2. Add the Supabase callback URL (`https://<project-ref>.supabase.co/auth/v1/callback`) under
   **Authorized redirect URIs**.
3. In Supabase, open **Authentication -> Sign In / Providers -> Google**, toggle it on, and
   paste the **Client ID** and **Client Secret**.

**Both**

- Under **Authentication -> URL Configuration**, make sure your site URL
  (`http://localhost:3000` for dev, your domain in prod) is in **Site URL** / **Redirect
  URLs**. The app sends users back to `/dashboard` after a successful login.

---

## 6. Deploy (Netlify)

The repo ships with a `netlify.toml`, so importing it is the whole setup. The build
command, the official Next.js runtime (which turns the AI API route into a serverless
function), and the Node version are already configured. **The only thing you add by hand
is environment variables.**

1. Push the project to a GitHub repository.
2. Go to https://app.netlify.com/, click **Add new site -> Import an existing project**,
   pick your Git provider, and select the repo. Netlify reads `netlify.toml` and
   auto-detects Next.js, so leave the build settings as-is and click **Deploy**.
3. Add your environment variables in **Site configuration -> Environment variables**
   (the same keys from your `.env.local`):
   - `ANTHROPIC_API_KEY` (optional, for the AI panel)
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (optional, for accounts)
   - `NEXT_PUBLIC_SITE_URL` set to your Netlify URL, e.g. `https://your-site.netlify.app`
4. Trigger a redeploy (**Deploys -> Trigger deploy -> Deploy site**) so the new env vars
   are baked in. If you added them before the first deploy, you can skip this.
5. In Supabase, under **Authentication -> URL Configuration**, add your Netlify domain to
   **Site URL** / **Redirect URLs** so logins work in production.

> The app works on Netlify with no env vars at all (guest mode only). Add the keys above
> to unlock AI Insights and real accounts.
>
> Do **not** add `output: "export"` to `next.config.mjs` for Netlify: static export would
> disable the API routes (AI + FX serverless functions). The default build is correct.

---

## 7. Features that need no setup

These work as soon as the app runs - nothing to configure:

- **Multi-currency totals.** Each subscription keeps its own currency; the dashboard and
  analytics convert everything into your **default currency** (Settings -> Preferences) so
  totals add up correctly. Rates come from a free, key-less API via `app/api/fx`, cached for
  12 hours, with bundled fallback rates if the network is unavailable.
- **Renewal reminders.** Turn on **Settings -> Preferences -> Renewal reminders**. The
  browser asks for notification permission, then PayoraAI notifies you about renewals within
  your threshold while the app is open (once per subscription per day).
  - True email / closed-app push needs an external mail or push service plus a scheduler
    (e.g. a cron job hitting an email provider). That backend is intentionally out of scope
    for this client-only app; the in-app reminder above covers the no-server case.
- **Install as an app (PWA).** A web manifest and service worker ship with the app, so
  supported browsers offer **Install** and the app works offline for already-visited pages.
  The service worker only registers in a production build (`npm run build && npm start`),
  not in `npm run dev`.

---

## 8. Troubleshooting

| Symptom | Fix |
| ------- | --- |
| Dev note about Supabase keys on the login page | Shown in development only. Add `NEXT_PUBLIC_SUPABASE_*` and restart, or ignore it and use guest mode. |
| Sign-up succeeds but can't sign in | "Confirm email" is on: check your inbox, or disable it (step 5.4). |
| Google/GitHub button does nothing or errors | Enable the provider in Supabase and add the callback + redirect URLs (step 5.6). |
| AI buttons say key not configured | Add `ANTHROPIC_API_KEY` to `.env.local` and restart. |
| Data not syncing | Confirm the SQL in 5.3 ran and the RLS policy exists. Check the browser console for Supabase errors. |
| Renewal notifications never appear | Allow notifications for the site in your browser, keep the toggle on, and keep a tab open. |
| Totals look off across currencies | They're converted to your default currency; rates are approximate. Check `app/api/fx` is reachable. |
| Social preview image is blank | Set `NEXT_PUBLIC_SITE_URL` and redeploy. The image is the static `public/og-image.png`. |

---

## 9. Where things live

```
app/                  routes
  (app)/              protected app (dashboard, subscriptions, analytics, settings)
  login/              sign in / sign up / guest
  page.tsx            public landing page
  api/ai-suggest/     AI cancellation suggestions
  api/ai-ask/         AI free-form Q&A about your subscriptions
  api/ai-categorize/  AI category + cycle guess for the Add form
  api/fx/             exchange rates (cached, with fallback)
  manifest.ts         PWA web manifest        robots.ts / sitemap.ts  SEO
components/auth/      auth context, route gate, cloud sync
components/fx-rates-loader.tsx     background FX refresh
components/renewal-reminders.tsx   browser renewal notifications
components/sw-register.tsx         service-worker registration (prod only)
public/sw.js          offline service worker
public/og-image.png   1200x630 social image
lib/supabase.ts       Supabase client (null when unconfigured)
lib/cloud.ts          load/save the per-user JSON blob
lib/fx.ts             currency conversion + fallback rates
lib/store.ts          Zustand store (local cache + guest storage)
```
