# Flurr

A modern dating app built with React Native and Expo.

## Architecture

```
flurr/
├── app/                    # Expo Router (file-based routing)
│   ├── (auth)/            # Authentication flow
│   │   ├── profile-builder/  # Onboarding steps (step-1 to step-8)
│   │   ├── index.tsx      # Sign up screen
│   │   ├── verify.tsx     # OTP verification
│   │   └── intentions.tsx # User intentions
│   ├── (main)/            # Main app (authenticated)
│   │   ├── index.tsx      # Home/matches screen
│   │   ├── chats.tsx      # Chat list
│   │   └── events.tsx     # Events screen
│   └── _layout.tsx        # Root layout
├── components/
│   ├── layout/            # Layout components
│   │   ├── screen-container.tsx
│   │   ├── screen-footer.tsx
│   │   └── progress-header.tsx
│   └── ui/                # Reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── otp-input.tsx
│       ├── chip.tsx
│       ├── chip-input.tsx
│       ├── era-slider.tsx
│       ├── match-card.tsx
│       ├── selection-card.tsx
│       ├── custom-tab-bar.tsx
│       └── text-link.tsx
├── constants/
│   └── theme.ts           # Colors, typography, spacing
└── store/                 # State management
    ├── user-store.ts     # User state (Zustand)
    ├── matching.ts       # Matching algorithm
    ├── mock-users.ts     # Mock data
    └── types.ts          # TypeScript types
```

### Key Patterns

- **File-based routing**: Expo Router handles navigation based on file structure
- **Route groups**: `(auth)` and `(main)` organize routes without affecting URLs
- **Barrel exports**: `index.ts` files for clean imports (`@/components/ui`)
- **Separation of concerns**: UI components, business logic, and state are isolated

## State Management

Flurr uses [Zustand](https://github.com/pmndrs/zustand) for state management - a lightweight, unopinionated solution.

### User Store

```typescript
// store/user-store.ts
interface UserState extends UserProfile {
  setName: (name: string) => void;
  setPronouns: (pronouns: string[]) => void;
  setIntention: (intention: Intention) => void;
  setMatchPreferences: (prefs: MatchPreference[]) => void;
  setEra: (era: number) => void;
  completeOnboarding: () => void;
}
```

### Usage

```typescript
import { useUserStore } from '@/store';

function MyComponent() {
  const { name, setName, matchPreferences } = useUserStore();

  return <Input value={name} onChangeText={setName} />;
}
```

### User Profile Shape

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | User's first name |
| `pronouns` | `string[]` | e.g., `['she', 'her']` |
| `intention` | `Intention` | `'matchmaking'` or `'organizer'` |
| `matchPreferences` | `MatchPreference[]` | What user is looking for |
| `era` | `number` | Dating pace (0-2) |
| `isOnboarded` | `boolean` | Onboarding completion status |

## Matching Algorithm

The matching algorithm calculates compatibility between users based on three weighted factors.

### Weights

| Factor | Weight | Description |
|--------|--------|-------------|
| Intention | 35% | Are they both looking for matches? |
| Preferences | 55% | What are they looking for? |
| Era | 10% | Dating pace compatibility |

### Intention Score (0-100)

Binary match - users must have the same intention to score.

```
Same intention    → 100
Different         → 0
```

### Preference Score (0-100)

Uses a compatibility matrix to score how well preferences align.

**Preference Types:**
- `romantic-partner` - Looking for love
- `relationship` - Seeking commitment
- `open-to-exploring` - Flexible
- `someone-to-go-out-with` - Activity partner
- `a-good-time` - Casual connection
- `new-bestie` - Friendship

**Compatibility Matrix (excerpt):**

|  | romantic-partner | relationship | open-to-exploring | a-good-time |
|--|------------------|--------------|-------------------|-------------|
| **romantic-partner** | 100 | 90 | 60 | 30 |
| **relationship** | 90 | 100 | 40 | 25 |
| **open-to-exploring** | 70 | 40 | 100 | 80 |
| **a-good-time** | 50 | 15 | 80 | 100 |

The algorithm averages scores across all user preference pairs.

### Era Score (0-100)

Measures dating pace compatibility.

```
Same era (0 diff)     → 100
Adjacent (1 diff)     → 60
Far apart (2+ diff)   → 20
```

**Era Values:**
- `0` - Fast pace (spontaneous, ready now)
- `1` - Medium pace (balanced approach)
- `2` - Slow pace (taking time, friends first)

### Final Calculation

```typescript
compatibility = Math.round(
  (intentionScore * 0.35) +
  (preferencesScore * 0.55) +
  (eraScore * 0.10)
);
```

### Example

**User A:**
- Intention: `matchmaking`
- Preferences: `['romantic-partner', 'relationship']`
- Era: `2`

**User B:**
- Intention: `matchmaking`
- Preferences: `['relationship', 'open-to-exploring']`
- Era: `1`

**Calculation:**
- Intention: `100` (same)
- Preferences: `~72` (high overlap)
- Era: `60` (adjacent)

```
Final = (100 × 0.35) + (72 × 0.55) + (60 × 0.10)
      = 35 + 39.6 + 6
      = 81% compatibility
```

### Compatibility Labels

| Score | Label | Color |
|-------|-------|-------|
| 80-100 | Great match | Green |
| 60-79 | Good match | Light green |
| 40-59 | Potential | Amber |
| 0-39 | Low match | Gray |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm expo start

# Run on iOS
pnpm expo run:ios

# Run on Android
pnpm expo run:android
```

## Tech Stack

- **Framework**: React Native + Expo
- **Package Manager**: pnpm
- **Routing**: Expo Router
- **State**: Zustand
- **Styling**: React Native StyleSheet
- **Animations**: React Native Animated API
- **Icons**: @expo/vector-icons (Ionicons)
