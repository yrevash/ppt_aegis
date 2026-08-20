'use client'

import { Panel, Text } from '@/engine/ui'

const SOURCES = [
  { name: 'Vector', tech: 'embedded NanoVectorDB', hits: 24, tone: 'accent' as const },
  { name: 'Graph', tech: 'Neo4j / LightRAG', hits: 11, tone: 'teal' as const },
  { name: 'BM25', tech: 'lexical', hits: 12, tone: 'amber' as const },
]

const TONE_FG = { accent: 'var(--accent)', teal: 'var(--teal)', amber: 'var(--amber)' }
const TONE_EDGE = { accent: 'var(--accent-edge)', teal: 'var(--teal-edge)', amber: 'var(--amber-edge)' }

const STEPS = [
  { label: 'RRF', detail: 'Reciprocal rank fusion over the three result sets' },
  { label: 'Rerank', detail: 'LLM rerank of the fused candidates' },
  { label: 'Cite', detail: 'Every claim in the answer carries its source' },
]

/** Three retrievers, one fused and reranked result set, citations at the end. */
export function RetrievalFusion() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, minHeight: 0, justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        {SOURCES.map((source) => (
          <Panel key={source.name} pad={14} style={{ borderColor: TONE_EDGE[source.tone] }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
              <Text as="span" size="base" weight="semibold" style={{ color: TONE_FG[source.tone] }}>
                {source.name}
              </Text>
              <Text as="span" size="xs" mono tone="muted">
                {source.hits} chunks
              </Text>
            </div>
            <Text size="xs" mono tone="muted" style={{ marginTop: 5 }}>
              {source.tech}
            </Text>
          </Panel>
        ))}
      </div>

      <div aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', color: 'var(--ink-faint)', fontSize: 13 }}>
        ↓
      </div>

      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9, flex: 1, minHeight: 0 }}>
        {STEPS.map((step, i) => (
          <li
            key={step.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '92px minmax(0, 1fr)',
              gap: 16,
              alignItems: 'baseline',
              padding: '11px 14px',
              borderRadius: 'var(--r-sm)',
              background: i === STEPS.length - 1 ? 'var(--accent-dim)' : 'var(--surface)',
              border: `1px solid ${i === STEPS.length - 1 ? 'var(--accent-edge)' : 'var(--hairline)'}`,
            }}
          >
            <Text as="span" size="sm" mono tone={i === STEPS.length - 1 ? 'accent' : 'ink'}>
              {step.label}
            </Text>
            <Text as="span" size="sm" tone="soft">
              {step.detail}
            </Text>
          </li>
        ))}
      </ol>

      <Text size="xs" tone="muted">
        Chunk counts are from the recorded demo run shown earlier in this deck.
      </Text>
    </div>
  )
}
