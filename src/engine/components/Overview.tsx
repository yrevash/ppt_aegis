'use client'

import { useEffect, useRef } from 'react'
import { useSlideStore } from '../store/slide-store'
import type { Section } from '../types/slide'

/**
 * Jump-to-slide view. A long deck is unusable in Q&A without one: someone asks
 * about guardrails and the presenter should not have to arrow through eleven
 * slides to get there.
 */
export function Overview({ sections }: { sections: Section[] }) {
  const open = useSlideStore((s) => s.overviewOpen)
  const slides = useSlideStore((s) => s.slides)
  const current = useSlideStore((s) => s.current)
  const goTo = useSlideStore((s) => s.goTo)
  const close = useSlideStore((s) => s.closeOverlays)
  const activeRef = useRef<HTMLButtonElement>(null)

  // Move focus into the panel so keyboard users land on their current position.
  useEffect(() => {
    if (open) activeRef.current?.focus()
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="All slides"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-overview)' as unknown as number,
        background: 'rgba(9, 9, 11, 0.92)',
        backdropFilter: 'blur(20px)',
        overflowY: 'auto',
        padding: 'clamp(24px, 5vh, 56px) clamp(20px, 5vw, 72px)',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 28,
          gap: 16,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 26,
            fontWeight: 600,
            color: 'var(--ink)',
          }}
        >
          All slides
        </h2>
        <button
          onClick={close}
          style={{
            fontSize: 12,
            color: 'var(--ink-muted)',
            padding: '6px 12px',
            border: '1px solid var(--hairline)',
            borderRadius: 'var(--r-sm)',
          }}
        >
          Close
        </button>
      </header>

      {sections.map((section) => {
        const entries = slides
          .map((slide, index) => ({ slide, index }))
          .filter(({ slide }) => slide.section === section.id)
        if (entries.length === 0) return null

        return (
          <section key={section.id} style={{ marginBottom: 34 }}>
            <h3
              style={{
                margin: '0 0 12px',
                fontSize: 10.5,
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              {section.label}
            </h3>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 10,
              }}
            >
              {entries.map(({ slide, index }) => {
                const isCurrent = index === current
                return (
                  <li key={slide.id}>
                    <button
                      ref={isCurrent ? activeRef : undefined}
                      onClick={() => goTo(index)}
                      aria-current={isCurrent ? 'true' : undefined}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 10,
                        padding: '12px 14px',
                        textAlign: 'left',
                        borderRadius: 'var(--r-md)',
                        border: `1px solid ${isCurrent ? 'var(--accent-edge)' : 'var(--hairline)'}`,
                        background: isCurrent ? 'var(--accent-dim)' : 'var(--surface)',
                        color: isCurrent ? 'var(--ink)' : 'var(--ink-soft)',
                        transition: 'border-color var(--dur-ui), background var(--dur-ui), color var(--dur-ui)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-geist-mono), monospace',
                          fontSize: 10.5,
                          color: isCurrent ? 'var(--accent)' : 'var(--ink-faint)',
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: 13.5, lineHeight: 1.35 }}>{slide.title}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
