# Flurr

A dating app for soft queers, shy bois, femmes who flirt with their eyes, etc. Built with React Native and Expo.

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/mosnyik/flurr
cd flurr
pnpm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Set up the database

Go to your Supabase project → **SQL Editor** and run:

```sql
drop table if exists profiles;

create table profiles (
  id                uuid primary key default gen_random_uuid(),
  name              text,
  pronouns          text[],
  image_url         text,
  intention         text,
  match_preferences text[],
  era               smallint,
  bipoc             boolean,
  presentation      text,
  archetypes        text[],
  drawn_to          text[],
  is_onboarded      boolean default false,
  created_at        timestamptz default now()
);

```

### 4. Start the app

```bash
# Start development server
pnpm start

# Run on Android
pnpm android

# Run on iOS
pnpm ios
```

---

## Architecture

```
flurr/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # Unauthenticated flow
│   │   ├── profile-builder/      # Onboarding steps
│   │   │   ├── step-1.tsx        # Name & pronouns
│   │   │   ├── step-4.tsx        # Match preferences
│   │   │   ├── step-5.tsx        # Era (dating pace)
│   │   │   ├── step-6.tsx        # BIPOC identity
│   │   │   ├── step-7.tsx        # Gender presentation
│   │   │   ├── step-8.tsx        # Your archetypes
│   │   │   └── step-9.tsx        # Archetypes you're drawn to
│   │   ├── index.tsx             # Welcome / sign up
│   │   ├── verify.tsx            # OTP verification
│   │   └── intentions.tsx        # Matchmaking vs organizer
│   ├── (main)/                   # Authenticated app
│   │   ├── index.tsx             # Home / matches feed
│   │   ├── chats.tsx             # Chat list
│   │   └── events.tsx            # Events screen
│   └── _layout.tsx               # Root layout
├── components/
│   ├── layout/
│   │   ├── screen-container.tsx
│   │   ├── screen-footer.tsx
│   │   └── progress-header.tsx   # Auto-detects step from route
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── otp-input.tsx
│       ├── chip.tsx
│       ├── chip-input.tsx        # Tag input with auto-commit on blur
│       ├── era-slider.tsx        # Custom pan-gesture slider
│       ├── match-card.tsx
│       ├── selection-card.tsx    # Supports compact mode
│       ├── archetype-card.tsx    # Card with icon + name + description
│       ├── custom-tab-bar.tsx
│       └── text-link.tsx
├── constants/
│   └── theme.ts                  # Colors, typography, spacing
├── lib/
│   ├── supabase.ts               # Supabase client (SecureStore sessions)
│   └── useRealUsers.ts           # Fetches profiles from DB, falls back to mock
└── store/
    ├── user-store.ts             # Zustand store — profile state + Supabase save
    ├── matching.ts               # Weighted compatibility algorithm
    ├── mock-users.ts             # Seed / fallback user data
    └── types.ts                  # TypeScript types
```

---

## Onboarding Flow

Users go through a 7-step profile builder before reaching the main app:

| Step | Screen | What it captures |
|------|--------|-----------------|
| 1/7 | Name & Pronouns | `name`, `pronouns` |
| 2/7 | Intentions | `intention` — matchmaking or organizer |
| 3/7 | Match Preferences | `matchPreferences` — what they're looking for |
| 4/7 | Era | `era` — dating pace (Gen Z / Zillenial / Millennial) |
| 5/7 | BIPOC | `bipoc` — identity flag |
| 6/7 | Presentation | `presentation` — gender expression |
| 7/7 | Your Archetypes | `archetypes` — vibes that describe them |
| 8/7 | Drawn To | `drawnTo` — archetypes they're attracted to |

On completion, the full profile is saved to Supabase.

---

## User Profile Shape

```typescript
interface UserProfile {
  name:             string;
  pronouns:         string[];
  intention:        'matchmaking' | 'organizer' | null;
  matchPreferences: MatchPreference[];
  era:              0 | 1 | 2;       // 0 = Gen Z, 1 = Zillenial, 2 = Millennial
  bipoc:            boolean | null;
  presentation:     Presentation | null;
  archetypes:       Archetype[];
  drawnTo:          Archetype[];
  isOnboarded:      boolean;
}
```

---

## Matching Algorithm

Compatibility is calculated across three weighted factors:

| Factor | Weight | Description |
|--------|--------|-------------|
| Intention | 35% | Must share the same intention to score |
| Preferences | 55% | How well their desired connections align |
| Era | 10% | Dating pace compatibility |

### Preference compatibility matrix (excerpt)

|  | romantic-partner | relationship | open-to-exploring | a-good-time |
|--|-----------------|--------------|-------------------|-------------|
| **romantic-partner** | 100 | 90 | 60 | 30 |
| **relationship** | 90 | 100 | 40 | 25 |
| **open-to-exploring** | 70 | 40 | 100 | 80 |
| **a-good-time** | 50 | 15 | 80 | 100 |

### Era score

```
Same era (0 diff)   → 100
Adjacent (1 diff)   → 60
Far apart (2 diff)  → 20
```

### Compatibility labels

| Score | Label |
|-------|-------|
| 80–100 | Great match |
| 60–79 | Good match |
| 40–59 | Potential |
| 0–39 | Low match |

---

## State Management

Flurr uses [Zustand](https://github.com/pmndrs/zustand) for local state. On `completeOnboarding()` the full profile is inserted into Supabase.

```typescript
import { useUserStore } from '@/store';

const { name, setName, matchPreferences } = useUserStore();
```

---

## Tech Stack

| | |
|---|---|
| Framework | React Native + Expo SDK 54 |
| Package manager | pnpm |
| Routing | Expo Router |
| State | Zustand |
| Database | Supabase (Postgres) |
| Auth storage | expo-secure-store |
| Styling | React Native StyleSheet |
| Animations | React Native Animated API |
| Icons | Ionicons + MaterialCommunityIcons |
