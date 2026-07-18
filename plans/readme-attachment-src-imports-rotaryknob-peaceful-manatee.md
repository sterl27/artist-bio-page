# Plan: Write README for RotaryKnob Component

## Context
The user has a custom `RotaryKnob` React component at `src/imports/RotaryKnob.tsx` — a fully-featured audio-style rotary knob with Framer Motion animations, circular drag, keyboard support, and accessibility attributes. There is no dedicated README for it. The request is to create one.

## What to Create
A new file: **`src/imports/README_RotaryKnob.md`**

## Content Outline

### 1. Header & Overview
- Component name, one-line description
- Screenshot/demo placeholder note

### 2. Props Table
Document every prop from the `RotaryKnobProps` interface:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Controlled value (within min–max) |
| `onChange` | `(value: number) => void` | — | Called on every value change |
| `label` | `string` | `undefined` | Text label rendered below knob |
| `size` | `number` | `58` | Knob diameter in px |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Increment per keyboard/drag step |
| `showValue` | `boolean` | `true` | Show numeric value below knob |
| `color` | `string` | `'#D4AF37'` | Accent color (indicator dot, glow, value text) |
| `className` | `string` | `''` | Extra Tailwind/CSS class on wrapper |
| `dragMode` | `'circular' \| 'vertical'` | `'circular'` | Drag interaction style |

### 3. Usage Example
Minimal controlled usage snippet + a more complete example with all props.

### 4. Drag Modes Explained
- **circular** (default): Drag around the knob's center; mimics a real hardware knob. Recommended.
- **vertical**: Drag up/down; easier on a trackpad. Fallback for accessibility needs.

### 5. Keyboard Controls
- `ArrowUp` / `ArrowRight` → increment by `step`
- `ArrowDown` / `ArrowLeft` → decrement by `step`
- `Shift` + any arrow → 5× increment

### 6. Accessibility
- `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label`
- Fully keyboard navigable; focusable via `tabIndex={0}`

### 7. Dependencies
- `react` (hooks: useRef, useState, useCallback, useEffect)
- `framer-motion` (motion, useMotionValue, useTransform, useSpring)

### 8. Notes / Caveats
- `'use client'` directive present — for Next.js App Router compatibility
- Pointer capture used for smooth circular drag even when pointer leaves knob
- Spring physics: stiffness 320, damping 26, mass 0.55 — tweak in source if needed
- 270° rotation range (−135° to +135°), matching classic hardware knobs

## File to Create
`src/imports/README_RotaryKnob.md`

## Verification
- Read the file after creation and confirm all props match the actual interface in `RotaryKnob.tsx`
- Confirm usage example would compile (imports match the named export `RotaryKnob`)
