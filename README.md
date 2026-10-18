# Sprout 2.0

Production interactive prototype for a regulated Indian micro-investing onboarding journey. The current foundation follows the **Sovereign Botanical Craft** design system and is implemented with pure JavaScript, React 18, Vite, JSX, Tailwind CSS, and `lucide-react`.

## Current implementation

- Responsive Sprout 2.0 homepage shell for desktop and mobile layouts
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

The application entry point is [`src/main.jsx`](./src/main.jsx), with shared UI primitives in [`src/components/ui/`](./src/components/ui/) and bilingual product data and validators in [`src/config/sproutStore.js`](./src/config/sproutStore.js).

## Compliance

The prototype copy is audited through `auditComplianceCopy()`. The audit rejects occurrences of `guaranteed`, `safe`, `risk-free`, and `risk free`. Investment projections shown in the prototype are illustrative only and are paired with the regulatory disclaimer.