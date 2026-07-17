# Prompt Library Extracted From Prompts.docx

## Purpose

This reference stores the concrete prompt patterns extracted from the source document. It keeps the main SKILL.md short while preserving the practical cases the user wants Codex to recognize.

## Core Prompt Patterns

### 1. Website breakdown

Use when the user wants a structured analysis of an interface.

Expected output themes:
- layout structure
- section order
- navigation
- typography
- color system
- spacing and rhythm
- image treatment
- cards and content blocks
- buttons and CTAs
- overall design feel

### 2. Full-width responsive layout fix

Use when the user asks to keep design intact but fix width, scaling, or desktop behavior.

Typical constraints:
- keep design, colors, typography, structure, animations and content unchanged
- remove narrow outer wrappers
- make the page full-width / full-screen
- support 1440px, 1600px, and 1920px
- preserve mobile and tablet behavior

### 3. Asset folder integration

Use when the project gets a new assets directory or file updates.

Typical tasks:
- detect new assets
- confirm additions, moves, renames, and deletions
- update HTML/CSS/JS references
- notify about unused or broken assets

### 4. Hero layering refactor

Use when the hero section needs a subject in front of large background text.

Typical rules:
- center the subject
- place headline text behind the subject
- use position and z-index correctly
- keep the subject in full color if requested
- keep the text large and responsive

### 5. Hero typography refinement

Use when the user wants the hero text bigger, wider, or better aligned.

Typical rules:
- increase the dominant background word
- align smaller support text to the top-left of the main word
- preserve layering
- keep typography responsive

### 6. Mobile responsiveness pass

Use when only mobile and tablet behavior should change.

Typical constraints:
- keep the desktop design intact
- convert multi-column layouts into single-column layouts on small screens
- use media queries
- keep navigation usable on mobile
- keep carousels touch-friendly

### 7. WordPress theme conversion

Use when the user wants the site converted into a modular WordPress theme.

Typical constraints:
- preserve design exactly
- create the standard theme file structure
- enqueue CSS and JS properly
- move reusable sections into template parts
- support menus, featured images, logo, widgets, and Gutenberg blocks

## Design Breakdown Contract

For any design review, the response should be explicit and developer-friendly. The document strongly favors a professional design-review tone over vague inspiration.

## Notes

These patterns are intentionally broad enough to cover many UI tasks while still being specific enough to trigger the skill for real frontend work.
