'use client'

import { useEffect, useRef, useState } from 'react'
import { Badge, Panel, Text } from '@/engine/ui'
import { useReducedMotion } from '@/engine/hooks/useReducedMotion'

type LineKind = 'system' | 'rail' | 'tool' | 'gate' | 'agent'

interface LogLine {
  t: string
  kind: LineKind
  text: string
}

/**
 * A recorded run, replayed line by line.
 *
 * Labelled as recorded demo data on purpose. Aegis stamps its own screenshots
 * with an offline-data banner and leaves it uncropped, and a deck that dresses
 * a scripted replay up as a live production feed would undercut the exact
 * claim the product is making.
 */
const RUN: LogLine[] = [
  { t: '14:23:01', kind: 'system', text: 'gateway ready · role to model routing active · tenant northwind' },
  { t: '14:23:01', kind: 'system', text: 'budget check: enforced before spend, not after' },
  { t: '14:23:05', kind: 'agent', text: '> Analyse the supply disruption and recommend countermeasures.' },
  { t: '14:23:06', kind: 'rail', text: 'guard_input: injection, PII, schema, scope · 4/4 pass' },
  { t: '14:23:06', kind: 'tool', text: 'route: supervisor selected specialist supply_chain_analyst' },
  { t: '14:23:07', kind: 'tool', text: 'recall_memory: 12 episodes, tenant scoped (234 ms)' },
  { t: '14:23:08', kind: 'tool', text: 'retrieve: vector + graph + BM25 · 47 chunks · RRF then rerank (1.2 s)' },
  { t: '14:23:09', kind: 'tool', text: 'ml_predict: interval [0.72, 0.94] · top driver port_congestion_risk' },
  { t: '14:23:10', kind: 'tool', text: 'plan: 3 typed actions · highest risk tier medium' },
  { t: '14:23:10', kind: 'gate', text: 'gate: approval required · run checkpointed to approvals inbox' },
  { t: '14:23:14', kind: 'gate', text: 'gate: approved by admin@northwind · run resumed' },
  { t: '14:23:15', kind: 'tool', text: 'act 1/3 diversify_supplier_pool · idempotent · audited' },
  { t: '14:23:16', kind: 'tool', text: 'act 2/3 adjust_safety_stock · reversible · audited (890 ms)' },
  { t: '14:23:17', kind: 'tool', text: 'act 3/3 schedule_reroute · reversible · audited (1.1 s)' },
  { t: '14:23:18', kind: 'rail', text: 'guard_output: content and schema rails pass' },
  { t: '14:23:18', kind: 'system', text: 'persist_memory · trace exported · audit row appended' },
]

const KIND: Record<LineKind, { fg: string; bg: string }> = {
  system: { fg: 'var(--ink-muted)', bg: 'transparent' },
  rail: { fg: 'var(--teal)', bg: 'var(--teal-dim)' },
  tool: { fg: 'var(--ink-soft)', bg: 'transparent' },
  gate: { fg: 'var(--amber)', bg: 'var(--amber-dim)' },
  agent: { fg: 'var(--accent)', bg: 'var(--accent-dim)' },
}

const CHECKPOINTS = ['input', 'retrieval', 'signal', 'gate', 'governance', 'audit']

export function RunReplay({ playing }: { playing: boolean }) {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(0)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Off stage the replay rewinds, so it always starts from the top when the
  // presenter arrives. Adjusting state during render on a prop change is the
  // documented pattern for this; doing it from an effect would render the stale
  // transcript for a frame first.
  const [wasPlaying, setWasPlaying] = useState(playing)
  if (wasPlaying !== playing) {
    setWasPlaying(playing)
    setVisible(0)
  }

  useEffect(() => {
    // With reduced motion the transcript is simply present, so there is no
    // timer to run at all.
    if (!playing || reducedMotion) return
    const id = setInterval(() => {
      setVisible((n) => (n >= RUN.length ? n : n + 1))
    }, 520)
    return () => clearInterval(id)
  }, [playing, reducedMotion])

  // With reduced motion the whole run is shown at once rather than typed out.
  const shown = reducedMotion ? RUN.length : visible

  useEffect(() => {
    const node = bodyRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [shown])

  const reachedGate = shown >= 10

  return (
    <Panel
      variant="inset"
      pad={0}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '9px 14px',
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        <Text size="xs" mono tone="muted">
          aegis 0.1.0 · POST /query · trace 8f3a
        </Text>
        <Badge variant="amber" mono>
          Recorded run · demo data
        </Badge>
      </div>

      <div
        ref={bodyRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 14px',
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: 11.5,
          lineHeight: 1.75,
          minHeight: 0,
        }}
      >
        {RUN.slice(0, shown).map((line, i) => {
          const style = KIND[line.kind]
          const isLast = i === shown - 1
          return (
            <div
              key={`${line.t}-${i}`}
              style={{
                display: 'flex',
                gap: 10,
                padding: '2px 7px',
                borderRadius: 'var(--r-xs)',
                background: style.bg,
                color: style.fg,
                opacity: isLast ? 1 : 0.82,
              }}
            >
              <span style={{ color: 'var(--ink-faint)', flexShrink: 0 }}>{line.t}</span>
              <span style={{ minWidth: 0 }}>
                {line.text}
                {isLast && !reducedMotion ? (
                  <span style={{ marginLeft: 6, animation: 'caret-blink 1s step-end infinite' }}>▌</span>
                ) : null}
              </span>
            </div>
          )
        })}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '9px 14px',
          borderTop: '1px solid var(--hairline)',
        }}
      >
        {CHECKPOINTS.map((name, i) => {
          const passed = shown > 4 + i * 2
          return (
            <span
              key={name}
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 9.5,
                fontFamily: 'var(--font-geist-mono), monospace',
                padding: '3px 6px',
                borderRadius: 'var(--r-xs)',
                color: passed ? 'var(--success)' : 'var(--ink-faint)',
                background: passed ? 'rgba(93, 184, 114, 0.1)' : 'rgba(240, 237, 232, 0.03)',
                transition: 'color 420ms, background 420ms',
              }}
            >
              {passed ? '✓ ' : ''}
              {name}
            </span>
          )
        })}
      </div>

      <span className="sr-only" aria-live="polite">
        {reachedGate ? 'Replay reached the human approval gate.' : ''}
      </span>
    </Panel>
  )
}
