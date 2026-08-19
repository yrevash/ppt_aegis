'use client'

import { TRUST_STACK } from '@/deck/content/trust'
import { Text } from '@/engine/ui'

/**
 * The six checkpoints as plates an action has to pass through.
 *
 * Drawn in CSS 3D rather than as a list: the point being made is that these
 * are sequential barriers in front of a real action, and a stack of receding
 * plates says that in one glance where six bullet points do not.
 */
export function TrustGauntlet({ revealed }: { revealed: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22, flex: 1, minHeight: 0, justifyContent: 'center' }}>
      <div
        style={{
          position: 'relative',
          height: 300,
          perspective: 1500,
          perspectiveOrigin: '50% 45%',
        }}
      >
        {/* The beam the action travels along. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: 1,
            background: 'linear-gradient(to right, transparent, var(--accent-edge) 12%, var(--accent-edge) 88%, transparent)',
          }}
        />

        <ol
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
            gap: 14,
            height: '100%',
            transformStyle: 'preserve-3d',
          }}
        >
          {TRUST_STACK.map((checkpoint, i) => {
            const passed = i < revealed
            return (
              <li
                key={checkpoint.n}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '18px 10px',
                  borderRadius: 'var(--r-md)',
                  border: `1px solid ${passed ? 'var(--teal-edge)' : 'var(--hairline)'}`,
                  background: passed
                    ? 'linear-gradient(160deg, rgba(93, 184, 166, 0.14), rgba(93, 184, 166, 0.03))'
                    : 'linear-gradient(160deg, rgba(240, 237, 232, 0.035), rgba(240, 237, 232, 0.008))',
                  boxShadow: passed
                    ? 'inset 0 1px 0 rgba(240, 237, 232, 0.09), 0 18px 44px rgba(9, 8, 7, 0.55)'
                    : 'inset 0 1px 0 rgba(240, 237, 232, 0.05), 0 14px 34px rgba(9, 8, 7, 0.45)',
                  // Each plate is turned and pushed back a little further, so
                  // the row reads as depth rather than as six flat cards.
                  transform: `rotateY(-19deg) translateZ(${-i * 26}px) translateX(${i * 5}px)`,
                  transformStyle: 'preserve-3d',
                  opacity: passed ? 1 : 0.42,
                  transition: 'opacity 420ms var(--ease-out), border-color 420ms var(--ease-out), background 420ms var(--ease-out)',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: 22,
                    lineHeight: 1,
                    color: passed ? 'var(--teal)' : 'var(--ink-faint)',
                    transition: 'color 420ms',
                  }}
                >
                  {checkpoint.n}
                </span>
                <span
                  style={{
                    marginTop: 12,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    lineHeight: 1.25,
                  }}
                >
                  {checkpoint.name}
                </span>
                <span style={{ marginTop: 9, fontSize: 10.5, lineHeight: 1.4, color: 'var(--ink-muted)' }}>
                  {checkpoint.evidence}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <Text size="sm" tone="soft">
          Each plate is a separate mechanism with its own failure mode, and each one leaves an artefact behind.
        </Text>
        <Text size="xs" mono tone="teal" style={{ flexShrink: 0 }}>
          {Math.min(revealed, 6)} / 6 cleared
        </Text>
      </div>
    </div>
  )
}
