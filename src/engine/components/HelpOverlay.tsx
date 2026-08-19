'use client'

import { useSlideStore } from '../store/slide-store'

const SHORTCUTS: [string, string][] = [
  ['→  ↓  Space', 'Next step or slide'],
  ['←  ↑  Backspace', 'Previous step or slide'],
  ['Home / End', 'First / last slide'],
  ['O', 'All slides'],
  ['F', 'Fullscreen'],
  ['?', 'This panel'],
  ['Esc', 'Close panel'],
]

export function HelpOverlay() {
  const open = useSlideStore((s) => s.helpOpen)
  const close = useSlideStore((s) => s.closeOverlays)

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-overview)' as unknown as number,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(9, 9, 11, 0.86)',
        backdropFilter: 'blur(16px)',
        padding: 24,
      }}
    >
      <div
        style={{
          width: 'min(420px, 100%)',
          padding: '26px 28px',
          borderRadius: 'var(--r-lg)',
          border: '1px solid var(--hairline-strong)',
          background: 'var(--surface-raised)',
          boxShadow: 'var(--shadow-lift)',
        }}
      >
        <h2
          style={{
            margin: '0 0 18px',
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 21,
            fontWeight: 600,
            color: 'var(--ink)',
          }}
        >
          Keyboard shortcuts
        </h2>
        <dl style={{ margin: 0, display: 'grid', gap: 11 }}>
          {SHORTCUTS.map(([keys, action]) => (
            <div key={keys} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <dt
                style={{
                  flex: '0 0 140px',
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: 11.5,
                  color: 'var(--accent)',
                }}
              >
                {keys}
              </dt>
              <dd style={{ margin: 0, fontSize: 13.5, color: 'var(--ink-soft)' }}>{action}</dd>
            </div>
          ))}
        </dl>
        <button
          onClick={close}
          autoFocus
          style={{
            marginTop: 22,
            padding: '8px 16px',
            fontSize: 12.5,
            color: 'var(--ink)',
            border: '1px solid var(--hairline-strong)',
            borderRadius: 'var(--r-sm)',
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}
