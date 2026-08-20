# Aegis pitch deck

A twelve-slide jury pitch deck for [Aegis](https://github.com/yrevash/aegis),
built as a Next.js app with React Three Fiber backdrops and React Flow diagrams.

```bash
npm install
npm run dev     # http://localhost:3000
```

## Controls

| Key | Action |
|---|---|
| `→` `↓` `Space` `PageDown` | Next reveal, then next slide |
| `←` `↑` `Backspace` `PageUp` | Previous |
| `Home` / `End` | First / last slide |
| `O` | All slides, jump to any |
| `F` | Fullscreen |
| `?` | Keyboard shortcuts |
| `Esc` | Close a panel |

Wheel, trackpad and touch swipe work too. USB presenter clickers emit
`PageUp` / `PageDown`, so they drive the deck without configuration.

## The deck

| # | Slide | Visual |
|---|---|---|
| 1 | Aegis | Falcon mark over the orbiting shield scene |
| 2 | Agents act. Nobody can say why. | The four unanswerable questions |
| 3 | So we built the instrumentation first | Bounded, explained, gated, traced |
| 4 | One core, any domain | React Flow graph: spine, core frame, stores, the adapter seam |
| 5 | Twelve stages, one request | The request path, folded across two rows, revealed three at a time |
| 6 | Six gates before anything real happens | CSS 3D plates the action passes through |
| 7 | The model never gets the last word | Conformal interval and SHAP drivers |
| 8 | Watch one run | A recorded run replayed line by line |
| 9 | Fifteen modules, every one named honestly | The manifest, grouped by category |
| 10 | New domain in ten files | The ten adapter pieces |
| 11 | It runs, and it is tested | Counts and the three run modes |
| 12 | Autonomy you can audit | Close |

## How it is put together

```
src/
  engine/          the deck runtime, domain-free
    components/    Deck, Stage, SlideShell, chrome, overview, help
    store/         slide + step state (zustand)
    ui/            Heading, Text, Badge, Panel, Stat, Reveal, layout primitives
  deck/
    content/       the facts, mirrored from the aegis repository
    slides/        the twelve slide specs
  components/
    flow/          React Flow nodes and the two graph diagrams
    panels/        the gauntlet, run replay, module matrix, signal panel
  scenes/          React Three Fiber backdrops, one per section
```

**Slides are specs, not JSX scattered across a page.** Each entry in
`src/deck/slides/` declares its id, title, section and reveal-step count, and
its index comes from its position in the array. Adding or reordering a slide
cannot desynchronise the navigation, the progress chrome or the 3D backdrop.

**The stage is a fixed 1280x720 surface scaled to the viewport**, the way
reveal.js and Slidev work. A slide that fits while you are authoring it fits on
any projector, and there is no reflow to test at every resolution.

**Content is sourced, not restated.** `src/deck/content/` mirrors the Aegis
repository: the module manifest from `backend/src/app/capabilities.py`, the rail
names from `aegis/src/aegis/guardrails/pipeline.py`, the request path and trust
stack from the README. Note the deck says **fifteen** modules: the Aegis README
still says twelve, which predates Voice, Vision and Forecast landing in the
manifest.

**Demo data is labelled as demo data.** The run on slide 8 is a recorded
transcript and says so on the panel. Aegis stamps its own screenshots with an
offline-data banner, and a deck that dressed a scripted replay up as a live
production feed would undercut the claim the product is making.

## Accessibility and motion

- Inactive slides are `inert` and `aria-hidden`, so screen readers and keyboard
  focus only ever reach the slide on stage.
- Slide changes are announced through a polite live region; there is a skip
  link and a visible focus ring throughout.
- `prefers-reduced-motion` collapses slide transitions and staged reveals,
  holds the 3D scenes still, and prints the run transcript at once instead of
  typing it out.

## Design resources

This repository is set up to use three of the four frontend design resources
from the project brief, and `AGENTS.md` describes the workflow:

- `design-taste-frontend` and `redesign-existing-projects` are installed under
  `.claude/skills/` and pinned in `skills-lock.json`.
- `DESIGN.md` holds the Claude-inspired visual system. Its palette and type
  scale drive the tokens at the top of `src/app/globals.css`, adapted to a
  dark canvas.
- The **Vercel Web Interface Guidelines are not installed**: the installer at
  `vercel.com` is blocked by this environment's egress policy, so
  `/web-interface-guidelines` is unavailable here. Its review pass was applied
  by hand (semantics, focus states, contrast, touch targets, reduced motion,
  live regions, layout stability). Run the installer on an unrestricted machine
  to add the command itself.

## Checks

```bash
npx tsc --noEmit
npx eslint .
npm run build
```
