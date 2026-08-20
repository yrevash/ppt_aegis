'use client'

import { TRUST_STACK } from '@/deck/content/trust'
import { Text } from '@/engine/ui'

/**
 * The six checkpoints, as a ladder. Each rung names the mechanism and the
 * artefact it leaves behind, because "we have guardrails" is a claim and
 * "here is the row it wrote" is evidence.
 */
export function TrustLadder({ revealed }: { revealed: number }) {
  return (
    <ol
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '12px 26px',
        flex: 1,
        minHeight: 0,
        alignContent: 'center',
      }}
    >
      {TRUST_STACK.map((checkpoint, i) => {
        const lit = i < revealed
        return (
          <li
            key={checkpoint.n}
            style={{
              display: 'grid',
              gridTemplateColumns: '32px minmax(0, 1fr)',
              gap: 14,
              alignItems: 'start',
              paddingBottom: 12,
              borderBottom: '1px solid var(--hairline)',
              opacity: lit ? 1 : 0.26,
              transform: lit ? 'translateX(0)' : 'translateX(-6px)',
              transition: 'opacity 400ms var(--ease-out), transform 400ms var(--ease-out)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 17,
                lineHeight: 1.15,
                color: lit ? 'var(--accent)' : 'var(--ink-faint)',
                transition: 'color 400ms',
              }}
            >
              {checkpoint.n}
            </span>
            <div style={{ minWidth: 0 }}>
              <Text as="span" size="base" weight="semibold" tone="ink" style={{ display: 'block' }}>
                {checkpoint.name}
              </Text>
              <Text size="sm" tone="soft" style={{ marginTop: 3 }}>
                {checkpoint.mechanism}
              </Text>
              <Text size="xs" mono tone="teal" style={{ marginTop: 6 }}>
                leaves: {checkpoint.evidence}
              </Text>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
