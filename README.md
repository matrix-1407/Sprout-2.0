# Sprout 2.0

Production interactive prototype for a regulated Indian micro-investing onboarding journey. The current foundation follows the **Sovereign Botanical Craft** design system and is implemented with pure JavaScript, React 18, Vite, JSX, Tailwind CSS, and `lucide-react`.

## Current implementation

- Responsive Sprout 2.0 homepage for desktop and explicit 390px mobile preview
- Interactive micro-goal cards that synchronize the selected goal and weekly amount with onboarding
- Continuous homepage-to-app journey with exact selected goal, amount, and language handoff
- Five-screen connected onboarding flow inside a realistic 395px mobile frame
- Screen jumper for evaluator walkthroughs and animated card transitions
- Goal handoff, KYC readiness checklist, guided PAN/last-four input, live verification, and first UPI contribution states
- Calm save-and-remind toast for missing PAN edge cases
- Live verification heartbeat with a simulated slow-4G/registry-delay recovery state
- Stage 5 KORU bloom celebration and post-investment referral unlock
- Sticky SEBI compliance bar pinned across homepage, onboarding, and gallery surfaces
- Director Dock evaluator HUD for surface, viewport, language, low-end device, and stakeholder callout controls
- Stitch UI Mockups gallery serving all four reference screenshots from `public/stitch-screens/`
- Vitest constraint and edge-case suite covering compliance copy, assembly, handoff, language, and PAN validation
- English/Hindi copy switching with zero reload and Devanagari typography support
- Sovereign Botanical Craft color tokens, typography, spacing, and accessibility-oriented touch targets
- KORU faceted jade-and-gold mascot foundation with five growth stages
- Desktop cursor-proximity tilt and specular highlight physics for KORU
- Mobile and low-end-device CSS float fallback with no mouse tracking
- Rolling Indian currency odometer for the ₹100–₹1,000 habit slider
- Reusable radial hover `SpotlightCard`
- PAN normalization and format validation
- DigiLocker last-four-digit validation without collecting a full government ID
- Automated compliance copy audit blocking forbidden financial-assurance wording
- Pinned regulatory disclaimer treatment

## Reference materials

The [`design-artifacts/`](./design-artifacts/) directory contains the approved design specification and four Stitch reference screens:

- English desktop end-to-end onboarding
- Hindi desktop bilingual onboarding
- English mobile onboarding
- Hindi mobile onboarding

## Development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Run the automated verification suite with:

```bash
npx vitest run
```

The application entry point is [`src/main.jsx`](./src/main.jsx). The connected views are [`src/components/HomepageView.jsx`](./src/components/HomepageView.jsx) and [`src/components/OnboardingFlow.jsx`](./src/components/OnboardingFlow.jsx), with shared UI primitives in [`src/components/ui/`](./src/components/ui/) and bilingual product data and validators in [`src/config/sproutStore.js`](./src/config/sproutStore.js).

## Compliance

The prototype copy is audited through `auditComplianceCopy()`. The audit rejects occurrences of `guaranteed`, `safe`, `risk-free`, and `risk free`. Investment projections shown in the prototype are illustrative only and are paired with the regulatory disclaimer.