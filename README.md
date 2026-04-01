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
  id                      uuid primary key default gen_random_uuid(),
  name                    text,
  pronouns                text[],
  image_url               text,
  intention               text,
  match_preferences       text[],
  era                     smallint,
  bipoc                   boolean,
  presentation            text,
  presentation_preference text[],
  archetypes              text[],
  drawn_to                text[],
  is_onboarded            boolean default false,
  created_at              timestamptz default now()
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
│   │   │   ├── step-4.tsx        # Intent (what you're looking for)
│   │   │   ├── step-5.tsx        # Era (dating pace)
│   │   │   ├── step-6.tsx        # Identity (BIPOC)
│   │   │   ├── step-7.tsx        # Presentation (gender expression)
│   │   │   ├── step-8.tsx        # Archetype (vibes that describe you)
│   │   │   └── step-9.tsx        # Archetype preference (vibes you're drawn to)
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
│       ├── match-card-skeleton.tsx # Shimmer loading placeholder
│       ├── selection-card.tsx    # Supports compact mode
│       ├── archetype-card.tsx    # Card with icon + name + description
│       ├── custom-tab-bar.tsx
│       └── text-link.tsx
├── constants/
│   └── theme.ts                  # Colors, typography, spacing
├── lib/
│   ├── supabase.ts               # Supabase client (SecureStore sessions)
│   └── useRealUsers.ts           # Fetches profiles from DB
└── store/
    ├── user-store.ts             # Zustand store — profile state + Supabase save
    ├── matching.ts               # Compatibility algorithm (PDF spec)
    ├── mock-users.ts             # Seed / fallback user data (commented out)
    └── types.ts                  # TypeScript types
```

---

## Onboarding Flow

Users go through a multi-step profile builder before reaching the main app:

| Step | Screen | Field captured |
|------|--------|---------------|
| 1 | Name & Pronouns | `name`, `pronouns` |
| 2 | Intentions | `intention` — matchmaking or organizer |
| 3 | Intent | `intent` — what they're looking for right now |
| 4 | Era | `era` — dating pace (Gen Z / Zillenial / Millennial) |
| 5 | Identity | `identity` — BIPOC yes/no |
| 6 | Presentation | `presentation` — gender expression |
| 7 | Archetype | `archetype` — vibes that describe them |
| 8 | Archetype Preference | `archetypePreference` — vibes they're drawn to |

On completion, the full profile is saved to Supabase.

---

## User Profile Shape

```typescript
interface UserProfile {
  name:                   string;
  pronouns:               string[];
  intention:              'matchmaking' | 'organizer' | null;
  intent:                 MatchPreference[];
  era:                    0 | 1 | 2;       // 0 = Gen Z, 1 = Zillenial, 2 = Millennial
  identity:               boolean | null;
  presentation:           Presentation | null;
  presentationPreference: Presentation[];
  archetype:              Archetype[];
  archetypePreference:    Archetype[];
  isOnboarded:            boolean;
}
```

---

## Matching Algorithm

Compatibility is scored across 6 signals with a maximum of **31 points**, converted to a percentage.

| Signal | Max points | Scoring |
|--------|-----------|---------|
| Intent | 9 | All selections match → 9, at least one overlap → 5, none → 0 |
| Identity | 7 | Same answer → 7, different → 0 |
| Presentation | 7 | Same → 7, different → 0 |
| Presentation preference bonus | +1 | A's presentation in B's preference AND B's in A's → +1 |
| Archetype | 6 | Share at least one archetype → 6, none → 0 |
| Archetype preference bonus | +1 | A's archetype in B's drawnTo AND B's in A's → +1 |

```
Match % = total points / 31
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

const { name, setName, intent, setIntent } = useUserStore();
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
| Animations | React Native Animated API + Reanimated |
| Icons | Ionicons + MaterialCommunityIcons |
