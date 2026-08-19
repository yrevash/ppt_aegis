'use client'

import { useSlideStore } from '../store/slide-store'
import type { Section } from '../types/slide'

const btn: React.CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: 30,
  height: 26,
  borderRadius: 'var(--r-sm)',
  color: 'var(--ink-muted)',
  transition: 'color var(--dur-ui), background var(--dur-ui)',
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The bar along the bottom of the deck: section-segmented progress, position,
 * and the controls a presenter needs when they are driving with a mouse rather
 * than a clicker.
 */
export function PresenterChrome({ sections }: { sections: Section[] }) {
  const slides = useSlideStore((s) => s.slides)
  const current = useSlideStore((s) => s.current)
  const next = useSlideStore((s) => s.next)
  const prev = useSlideStore((s) => s.prev)
  const goTo = useSlideStore((s) => s.goTo)
  const toggleOverview = useSlideStore((s) => s.toggleOverview)
  const toggleHelp = useSlideStore((s) => s.toggleHelp)

  const total = slides.length
  const activeSection = slides[current]?.section

  return (
    <div
      style={{
        position: 'fixed',
        insetInline: 0,
        bottom: 0,
        zIndex: 'var(--z-chrome)' as unknown as number,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '9px 22px',
        background: 'rgba(13, 13, 15, 0.78)',
        backdropFilter: 'blur(18px)',
        borderTop: '1px solid var(--hairline)',
      }}
    >
      <nav aria-label="Deck sections" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {sections.map((section) => {
          const indices = slides
            .map((s, i) => (s.section === section.id ? i : -1))
            .filter((i) => i >= 0)
          if (indices.length === 0) return null

          const isActive = section.id === activeSection
          const first = indices[0]
          const done = current > indices[indices.length - 1]
          const within = indices.indexOf(current)
          const fill = done ? 1 : isActive ? (within + 1) / indices.length : 0

          return (
            <button
              key={section.id}
              onClick={() => goTo(first)}
              aria-label={`Jump to ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                // Width follows the label, not the slide count, so the
                // labels never run into each other.
                minWidth: Math.max(34, indices.length * 13),
                padding: 0,
              }}
            >
              <span
                style={{
                  fontSize: 9.5,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  color: isActive ? 'var(--accent)' : 'var(--ink-faint)',
                  transition: 'color var(--dur-ui)',
                }}
              >
                {section.label}
              </span>
              <span
                style={{
                  display: 'block',
                  height: 2,
                  borderRadius: 1,
                  background: 'rgba(240, 237, 232, 0.09)',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    height: '100%',
                    width: `${fill * 100}%`,
                    background: isActive ? 'var(--accent)' : 'var(--ink-faint)',
                    transition: 'width var(--dur-slide) var(--ease-out)',
                  }}
                />
              </span>
            </button>
          )
        })}
      </nav>

      <span style={{ flex: 1 }} />

      <span
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: 11.5,
          color: 'var(--ink-muted)',
          whiteSpace: 'nowrap',
        }}
      >
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <button onClick={prev} disabled={current === 0} aria-label="Previous slide" style={{ ...btn, opacity: current === 0 ? 0.3 : 1 }}>
          <Chevron dir="left" />
        </button>
        <button
          onClick={next}
          disabled={current === total - 1}
          aria-label="Next slide"
          style={{ ...btn, opacity: current === total - 1 ? 0.3 : 1 }}
        >
          <Chevron dir="right" />
        </button>
        <button onClick={toggleOverview} aria-label="Show all slides" style={btn}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <button onClick={toggleHelp} aria-label="Keyboard shortcuts" style={btn}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M9.4 9.2a2.7 2.7 0 1 1 3.4 2.6c-.5.2-.8.7-.8 1.2v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1.1" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  )
}
