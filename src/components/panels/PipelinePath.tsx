'use client'

import { PIPELINE, STAGE_TONE, type StageKind } from '@/deck/content/pipeline'
import { Text } from '@/engine/ui'

const TONE_COLOR = { accent: 'var(--accent)', teal: 'var(--teal)', amber: 'var(--amber)' } as const
const TONE_EDGE = { accent: 'var(--accent-edge)', teal: 'var(--teal-edge)', amber: 'var(--amber-edge)' } as const
const TONE_FILL = { accent: 'var(--accent-dim)', teal: 'var(--teal-dim)', amber: 'var(--amber-dim)' } as const

// Grouped to match the three colours actually in play. Five entries across
// three tones made the legend look like it encoded more than it did.
const LEGEND: { kind: StageKind; label: string }[] = [
  { kind: 'rail', label: 'Guardrails' },
  { kind: 'think', label: 'Reasoning and knowledge' },
  { kind: 'gate', label: 'Gate and action' },
]

/**
 * The twelve stages of a request, walked one at a time.
 *
 * Drawn by hand rather than with React Flow: the path is strictly linear, and
 * a fixed six-by-two grid reads far better from the back of a room than
 * auto-routed edges would.
 */
export function PipelinePath({ revealed }: { revealed: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minHeight: 0, flex: 1, justifyContent: 'center' }}>
      <ol
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          gap: 10,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {PIPELINE.map((stage, i) => {
          const tone = STAGE_TONE[stage.kind]
          const lit = i < revealed
          return (
            <li
              key={stage.id}
              style={{
                padding: '10px 11px',
                borderRadius: 'var(--r-sm)',
                border: `1px solid ${lit ? TONE_EDGE[tone] : 'var(--hairline)'}`,
                background: lit ? TONE_FILL[tone] : 'transparent',
                opacity: lit ? 1 : 0.34,
                transition: 'opacity 340ms var(--ease-out), background 340ms var(--ease-out), border-color 340ms var(--ease-out)',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontFamily: 'var(--font-geist-mono), monospace',
                  color: lit ? TONE_COLOR[tone] : 'var(--ink-faint)',
                  marginBottom: 4,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-geist-mono), monospace',
                  color: lit ? 'var(--ink)' : 'var(--ink-muted)',
                  overflowWrap: 'anywhere',
                  lineHeight: 1.3,
                }}
              >
                {stage.label}
              </div>
              <div style={{ marginTop: 5, fontSize: 9.5, color: 'var(--ink-muted)' }}>{stage.module}</div>
            </li>
          )
        })}
      </ol>

      {/* The gate is the load-bearing stage, so it gets its own line rather
          than being one tile among twelve. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          padding: '13px 16px',
          borderRadius: 'var(--r-md)',
          border: '1px solid var(--amber-edge)',
          background: 'var(--amber-dim)',
          opacity: revealed >= 7 ? 1 : 0.28,
          transition: 'opacity 420ms var(--ease-out)',
        }}
      >
        <Text size="xs" mono tone="amber" style={{ flexShrink: 0, paddingTop: 1 }}>
          07 gate
        </Text>
        <Text size="sm" tone="soft">
          The human gate fires on the tool&apos;s risk tier, never on model confidence. A gated run checkpoints
          durably and resumes on any worker from a persisted approvals-inbox row.
        </Text>
      </div>

      <ul style={{ display: 'flex', gap: 16, listStyle: 'none', margin: 0, padding: 0 }}>
        {LEGEND.map(({ kind, label }) => (
          <li key={kind} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              aria-hidden="true"
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: TONE_FILL[STAGE_TONE[kind]],
                border: `1px solid ${TONE_EDGE[STAGE_TONE[kind]]}`,
              }}
            />
            <Text size="xs" tone="muted">
              {label}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  )
}
