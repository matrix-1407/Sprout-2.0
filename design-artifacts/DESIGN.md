# Sprout 2.0 — Design System & Continuous Product Specification (`design.md`)

## 1. Project Overview & Core Objective
- **Product:** Sprout 2.0 — A regulated Indian micro-investing platform enabling first-time investors to start with just ₹100.
- **Core Design Goal:** Create one continuous, reassuring storytelling journey from the Website Homepage (Desktop + Mobile) through the first 5 screens of App Onboarding, anchored by a non-cartoon, geometric 3D botanical mascot named **KORU**.
- **Target Metrics Fixed by Design:**
  1. Reduce **78% Homepage Bounce Rate** & **6.2s 4G Load Time** by replacing heavy videos/pop-ups with an ultra-lightweight (`<180 KB` total bundle) interactive ₹100 habit calculator and calm social proof.
  2. Eliminate **62% KYC Drop-off** by introducing an upfront document readiness checklist (PAN + DigiLocker mobile OTP) with a "Save & Remind Me Tonight" fallback, plus an "Anti-Freeze" live step-by-step KYC verification tracker so users on slow 4G never think the app crashed.
  3. De-escalate **"Investing feels scary" (65% user survey)** via warm, paper-like editorial surfaces, zero volatile stock tickers, and jargon-free bilingual (English + Hindi) micro-copy.

---

## 2. Aesthetic Direction: "Sovereign Botanical Craft" (Anti-AI-Slop Rules)
- **Strict Visual Ban:** DO NOT use dark-mode neon purple/cyan gradients, glowing sci-fi blobs, generic stock cartoons, or cluttered pop-up modals.
- **Design Language:** Inspired by Apple Card minimalism, Stripe Press craft, and sovereign wealth journals. Warm, tactile, calm, and high-trust.

### 2.1 Color Tokens (WCAG AA / AAA Compliant)
| Token Name | Hex Code | Usage & Accessibility |
| :--- | :--- | :--- |
| `--bg-canvas` | `#F6F4EE` | Primary background (Warm Raw Silk / Unbleached Paper — prevents harsh white glare) |
| `--bg-surface` | `#FFFFFF` | Elevated cards, interactive calculators, and onboarding containers |
| `--bg-subtle` | `#ECE9DF` | Secondary pills, inactive step tracks, input backgrounds |
| `--border-hairline` | `#DFDCD0` | Crisp 1px structural card borders |
| `--ink-primary` | `#0A2118` | Deep Banyan Obsidian Green — Primary headings, body text, and primary CTA fill (`14.2:1` AAA contrast) |
| `--ink-secondary` | `#475569` | Muted slate for subtitles, captions, and helper labels (`7.1:1` AA+ contrast) |
| `--accent-jade` | `#10B981` | Active growth states, verified checkmarks, and Screen 5 UPI investment CTA |
| `--accent-gold` | `#D97706` | Sovereign Amber Gold for the ₹100 seed core and upfront KYC readiness notes |
| `--surface-amber` | `#FEF3C7` | Soft warm warning banner for PAN/DigiLocker preparation notices |

### 2.2 Typography & Bilingual (English + Hindi) Rules
- **Display / Headlines:** `Fraunces` or `Instrument Serif` (SemiBold 600, tracking `-0.02em`, line-height `1.22` in English / `1.45` in Hindi Devanagari so top/bottom matras never clip).
- **UI & Body Copy:** `Plus Jakarta Sans` (Regular 400, Medium 500, Bold 700, minimum `15px` body size).
- **Currency & Telemetry Numerals:** `JetBrains Mono` (`font-variant-numeric: tabular-nums` so rolling ₹ amounts never jitter horizontally).
- **Mandatory Compliance Text:** Minimum `12.5px` (`0.78rem`), high-contrast `#E7E5DC` on `#0A2118` pinned footer bar.

### 2.3 Touch Targets & Low-End Device (`< ₹10,000`) Ergonomics
- **Minimum Tap Target:** Every button, goal card, checkbox, and input field MUST be at least `48px` tall (`min-height: 48px`, exceeding the 44px requirement).
- **Adaptive Motion Budget:**
  - **Desktop (`>= 768px`):** Enables Lenis smooth scrolling, radial hover border spotlights, and 3D cursor proximity tilt on the **KORU** mascot.
  - **Mobile / Budget Android (`< 768px`):** Disables JS mouse-tracking listeners and heavy blur filters; uses hardware-accelerated CSS `transform` transitions (`< 12 KB` total animation weight).

---

## 3. Mascot Specification: "KORU" (The Living Jade & Gold Botanical Sculpture)
- **Stakeholder Resolution:** Satisfies the CEO ("minimal, premium, no cartoon characters") and Marketing ("memorable mascot") while staying under the Lead Developer's `< 100 KB` CSS/SVG budget (`8.8 KB` pure layered SVG).
- **Visual Form:** An isometric, faceted origami seed-to-sprout sculpture resting on a dark `#0A2118` glass pedestal with specular gold and jade gradients.
- **5 Connected Evolution Stages Across Web & App:**
  1. **Stage 1 (Website Homepage):** Dormant Golden Seed resting on soil pedestal — reacts dynamically as user drags the ₹100 weekly slider.
  2. **Stage 2 (Onboarding Screen 1 — Goal Handoff):** Seed cracks open with a rooted emerald stem — confirms the website goal synced to the app.
  3. **Stage 3 (Onboarding Screens 2 & 3 — KYC Prep & Input):** Sprout surrounded by a geometric hexagonal shield halo — communicates regulated security.
  4. **Stage 4 (Onboarding Screen 4 — Anti-Freeze Verification):** Sunlit leaves with pulsing concentric kinetic rings — visually proves the app is actively syncing with registries and has not crashed.
  5. **Stage 5 (Onboarding Screen 5 — First ₹100 Invested):** Full two-leaf emerald bloom topped with a golden crown facet.

---

## 4. Screen-by-Screen Layout Specifications

### PART A: Responsive Website Homepage (Desktop `1440px` & Mobile `390px`)

#### 1. Top Floating Navigation Bar
- **Left:** Minimal geometric seed icon + **Sprout 2.0** wordmark + pill badge `SEBI Regulated • AMFI ARN-294810`.
- **Center (Desktop) / Top Strip (Mobile):** Calm Community Milestone Pill (replaces stressful live stock ticker): Pulsing green dot + *"14,280 first-time investors planted their first ₹100 this week"*.
- **Right:** Bilingual toggle button `[ EN | हिंदी ]` + Primary pill CTA `Start with ₹100`.

#### 2. Above-the-Fold Hero Section (12-Column Asymmetric Grid on Desktop, Stacked Single-Column on Mobile)
- **Left Column (7 Cols — Narrative & Connected Goal Picker):**
  - Eyebrow Tag: `BUILT FOR INDIA'S FIRST-TIME INVESTORS`
  - Headline: *"Plant your first ₹100. Watch your wealth grow quietly."*
  - Subtitle: *"No confusing stock charts. No intimidating jargon. Pick a starter goal below, verify your PAN in 60 seconds, and build your habit."*
  - **Step 1 Goal Selector (3 Interactive Cards, `min-height: 56px`):**
    - Card A (Selected default, `#0A2118` background, white text): **Emergency Cushion** • `₹100/wk` (`Liquid Mutual Fund • Low Volatility`)
    - Card B (`#FFFFFF` background): **Next Milestone** • `₹250/wk` (`Balanced Hybrid Fund • Steady Pace`)
    - Card C (`#FFFFFF` background): **Long-Term Wealth** • `₹500/wk` (`Nifty 50 Index Fund • Market Linked`)
  - **Primary CTA (`54px` height, `#0A2118` fill, `16px` bold text):** `Continue with this ₹100 Goal →`
  - **Upfront KYC Expectation Pill (Directly below CTA in warm amber `#FEF3C7`):** `⏱ Takes ~2 mins • Keep your PAN & mobile linked for DigiLocker OTP handy.` (Pre-solves the 62% KYC drop-off before app launch).

- **Right Column (5 Cols — Interactive 3D Koru Stage & ₹100 Habit Calculator Card):**
  - Elevated white card (`#FFFFFF`, `24px` border-radius, `1px` `#DFDCD0` border).
  - Top header with **KORU 3D Mascot Stage** (`144x144px` dark obsidian rounded container with 3D perspective tilt).
  - **Interactive Weekly Habit Slider:** Range `₹100` to `₹1,000` (`48px` touch track).
  - **Rolling Odometer Output Box (`#F6F4EE` fill):**
    - Left stat: `Total Contributed (5 Yrs)` → `₹26,000`
    - Right stat: `Estimated Market Value (11% p.a. illustrative)` → `~₹34,450` in `#10B981`.
  - **3-Step Connected Journey Strip at Bottom of Card:** `1. Pick ₹100 on Web ✓` → `2. 60s DigiLocker KYC` → `3. 1-Tap UPI Bloom`.

#### 3. Pinned Bottom Compliance Bar (Visible Without Scrolling on All Viewports)
- Docked at `bottom: 0`, full width, `#0A2118` background, `#F6F4EE` text at `12.5px`:
  *"REGULATORY RISK DISCLAIMER: Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance does not indicate future returns."*
- **Strict Copy Rule:** Zero instances of the words `"guaranteed"`, `"safe"`, or `"risk-free"`.

---

### PART B: The 5 Connected App Onboarding Screens (`390x844px` Mobile Frames)

Every screen shares a consistent top bar (`Back Button 44x44px` | `STEP X OF 5` | `5-Segment Progress Bar` | `Synced ₹100/wk Pill`), the evolving **KORU** mascot header, and the pinned `12.5px` SEBI Risk Disclaimer at the bottom.

#### Screen 1: Web-to-App Goal Handoff (Koru Stage 2 — Rooted Sprout)
- **Purpose:** Eliminates cold start by carrying over the exact goal chosen on the homepage.
- **Headline:** *"Your Emergency Cushion goal is ready to take root."*
- **Synced Summary Card:** Displays `SYNCED FROM WEBSITE` badge, `Emergency Cushion • ₹100 / week`, and `Liquid Mutual Fund • Low Volatility`.
- **Primary Button (`52px` height):** `Proceed to Quick KYC Check →`

#### Screen 2: "Zero-Surprise" KYC Readiness Checklist (Koru Stage 3 — Shielded Stem)
- **Purpose:** Directly solves Customer Support complaint #1 (*"I didn't know I needed my PAN and Aadhaar ready"*).
- **Headline:** *"Before we begin: 2 things to keep nearby"*
- **Subtitle:** *"We check upfront so you never get stuck halfway through."*
- **Interactive Checklist Cards (`56px` height each):**
  1. `[✓]` *"My 10-character PAN number (Physical card or photo on phone)"*
  2. `[✓]` *"Active mobile phone to receive DigiLocker verification OTP"*
- **Primary Button (`52px` height):** `I Have Both Ready — Enter Details →`
- **Secondary Edge-Case Action (`48px` height, outlined):** `Don't have my PAN right now — Save my ₹100 goal & remind me at 8 PM`

#### Screen 3: Frictionless Guided KYC Input (Koru Stage 3 — Shielded Stem)
- **Purpose:** Fast, error-proof regulatory verification with zero scary legal jargon.
- **Headline:** *"Regulated Investor Verification"*
- **Input 1 (`52px` height, monospace uppercase):** `Permanent Account Number (PAN)` → Value: `ABCDE1234F` with green inline badge `✓ Valid Format`.
- **Input 2 (`52px` height, numeric keypad):** `Last 4 digits of Government ID for DigiLocker OTP` → Placeholder: `XXXX`.
- **Trust Note Pill:** `🔒 256-bit Encrypted • Direct SEBI KRA & DigiLocker Check`
- **Primary Button (`52px` height):** `Verify Instantly with DigiLocker →`

#### Screen 4: The "Anti-Freeze" Live Verification Tracker (Koru Stage 4 — Pulsing Sunlit Leaf)
- **Purpose:** Directly solves Customer Support complaint #2 (*"The app asked me to wait and I thought it crashed"*).
- **Top Status Header:** *"Verifying your investor profile..."* + Live Heartbeat Pill `Elapsed: 5s / ~10s`.
- **Reassurance Banner:** *"Please stay on this screen. The app has NOT froze—we are syncing live with central registries."*
- **Live 3-Step Telemetry Card:**
  - `[✓ Emerald Check]` `1. Validating PAN status with NSDL Registry (Complete)`
  - `[⟳ Amber Spinner]` `2. Fetching verified KYC record via DigiLocker (In progress...)`
  - `[○ Muted Circle]` `3. Activating your zero-commission mutual fund folio`
- **Edge-Case Fallback Card (Slow 4G / Registry Timeout State):** Shows a calm amber recovery box: *"Registry taking longer than 12s? Your PAN is safely queued. Retry live sync or get an instant WhatsApp alert when approved."*

#### Screen 5: First ₹100 UPI Investment & Full Bloom (Koru Stage 5 — Blooming Crown)
- **Purpose:** Converts KYC completion into the first ₹100 investment and places Marketing's referral request at the moment of peak delight.
- **Celebration Badge:** `✓ KYC Verified • Folio #SP-884920 Active`
- **Headline:** *"You’re verified! Plant your first ₹100."*
- **Order Card:** `Emergency Cushion Basket • First Contribution: ₹100 via Instant UPI`.
- **Primary CTA (`54px` height, Mint Jade `#10B981` fill):** `Pay ₹100 via UPI & Bloom Your Koru →`
- **Post-Investment Referral Card (Unlocked upon payment):** `🎁 Gift a ₹50 starter seed to a friend — Share your invite link`.