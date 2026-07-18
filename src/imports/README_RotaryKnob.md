# RotaryKnob

A reusable, accessible React rotary knob component styled for audio/music UIs. Features spring-based animation via Framer Motion, circular and vertical drag modes, keyboard navigation, and full ARIA slider semantics.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | **Required.** Controlled value within `min`–`max`. |
| `onChange` | `(value: number) => void` | — | **Required.** Called on every value change. |
| `label` | `string` | `undefined` | Text label rendered below the knob. |
| `size` | `number` | `58` | Knob diameter in px. |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |
| `step` | `number` | `1` | Increment applied per keyboard press or drag unit. |
| `showValue` | `boolean` | `true` | Show the numeric value below the knob. |
| `color` | `string` | `'#D4AF37'` | Accent color for the indicator dot, active glow, and value text. |
| `className` | `string` | `''` | Additional CSS/Tailwind class applied to the outer wrapper. |
| `dragMode` | `'circular' \| 'vertical'` | `'circular'` | Drag interaction style (see below). |

## Usage

### Minimal

```tsx
import { useState } from 'react';
import { RotaryKnob } from '../imports/RotaryKnob';

function Example() {
  const [volume, setVolume] = useState(50);
  return <RotaryKnob value={volume} onChange={setVolume} />;
}
```

### Full example

```tsx
import { useState } from 'react';
import { RotaryKnob } from '../imports/RotaryKnob';

function MixerChannel() {
  const [gain, setGain] = useState(75);

  return (
    <RotaryKnob
      value={gain}
      onChange={setGain}
      label="GAIN"
      size={72}
      min={0}
      max={100}
      step={1}
      showValue={true}
      color="#D4AF37"
      dragMode="circular"
      className="my-4"
    />
  );
}
```

## Drag Modes

**`circular`** (default, recommended)  
Drag around the knob's center point, exactly like a physical hardware knob. The pointer is captured so the gesture stays smooth even when the cursor moves away from the knob.

**`vertical`**  
Drag up to increase, down to decrease. Easier with a trackpad and useful as an accessibility fallback. Uses Framer Motion's `drag="y"` under the hood.

## Keyboard Controls

| Key | Action |
|-----|--------|
| `ArrowUp` / `ArrowRight` | Increase by `step` |
| `ArrowDown` / `ArrowLeft` | Decrease by `step` |
| `Shift` + any arrow | Increase/decrease by `step × 5` |

The knob must be focused (`tabIndex={0}`) — click it or Tab to it first.

## Accessibility

- `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- `aria-label` set from the `label` prop
- Fully keyboard navigable

## Dependencies

- `react` — `useRef`, `useState`, `useCallback`, `useEffect`
- `framer-motion` — `motion`, `useMotionValue`, `useTransform`, `useSpring`

## Notes

- The `'use client'` directive at the top of the file makes the component compatible with Next.js App Router.
- Rotation travel is **270°** (−135° to +135°), matching classic audio hardware.
- Spring physics defaults: `stiffness: 320`, `damping: 26`, `mass: 0.55`. Edit these directly in `RotaryKnob.tsx` if you need a snappier or more sluggish feel.
