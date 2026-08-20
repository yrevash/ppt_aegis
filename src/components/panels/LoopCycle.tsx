'use client'

import { Panel, Text } from '@/engine/ui'

const PHASES = [
  { n: '01', name: 'Trace', detail: 'Every run exports a span tree through OpenTelemetry to Phoenix.' },
  { n: '02', name: 'Eval', detail: 'RAGAS-style proxies plus an LLM judge score the trace and the answer.' },
  { n: '03', name: 'Diagnose', detail: 'Regressions are attributed to a prompt, a retriever or a model change.' },
  { n: '04', name: 'Release', detail: 'A tiered gate promotes the change, or refuses to.' },
]

/**
 * The self-improvement loop. Drawn as a cycle rather than a list because the
 * output of release is the input of the next trace.
 */
export function LoopCycle({ revealed }: { revealed: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1, minHeight: 0, justifyContent: 'center' }}>
      <ol
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 12,
        }}
      >
        {PHASES.map((phase, i) => {
          const lit = i < revealed
          return (
            <li
              key={phase.n}
              style={{
                position: 'relative',
                padding: '15px 15px 17px',
                borderRadius: 'var(--r-md)',
                background: lit ? 'var(--surface)' : 'transparent',
                border: `1px solid ${lit ? 'var(--accent-edge)' : 'var(--hairline)'}`,
                opacity: lit ? 1 : 0.3,
                transition: 'opacity 400ms var(--ease-out), border-color 400ms var(--ease-out), background 400ms var(--ease-out)',
                minWidth: 0,
              }}
            >
              <Text as="span" size="xs" mono tone={lit ? 'accent' : 'faint'}>
                {phase.n}
              </Text>
              <Text as="span" size="base" weight="semibold" tone="ink" style={{ display: 'block', marginTop: 6 }}>
                {phase.name}
              </Text>
              <Text size="xs" tone="soft" style={{ marginTop: 6 }}>
                {phase.detail}
              </Text>
            </li>
          )
        })}
      </ol>

      {/* Closes the loop back to the start. */}
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          opacity: revealed >= 4 ? 1 : 0.25,
          transition: 'opacity 400ms var(--ease-out)',
        }}
      >
        <span style={{ flex: 1, height: 1, background: 'var(--accent-edge)' }} />
        <Text as="span" size="xs" mono tone="accent">
          the next run is traced too
        </Text>
        <span style={{ flex: 1, height: 1, background: 'var(--accent-edge)' }} />
      </div>

      <Panel variant="outline" pad={15}>
        <Text size="sm" tone="soft">
          A CI regression gate runs the same evaluation on retrieval quality, so a change that quietly makes
          answers worse fails the build instead of shipping and being noticed a week later.
        </Text>
      </Panel>
    </div>
  )
}
