'use client'

import { Panel, Text } from '@/engine/ui'

const ROUTING = [
  { role: 'supervisor', model: 'a strong reasoning model', why: 'Routing decisions are cheap but consequential' },
  { role: 'specialist', model: 'a mid-tier model', why: 'Most turns never need the frontier tier' },
  { role: 'rerank / judge', model: 'a small fast model', why: 'High call volume, narrow task' },
]

const ORDER = [
  { step: 'Budget check', detail: 'Per-tenant remaining spend, read before the call is made', tone: 'amber' as const },
  { step: 'Route', detail: 'Role decides the model, not the caller', tone: 'accent' as const },
  { step: 'Call', detail: 'Timeout and retry policy applied at the chokepoint', tone: 'accent' as const },
  { step: 'Ledger', detail: 'Durable usage row: tokens, cost, tenant, trace id', tone: 'teal' as const },
]

const TONE_FG = { accent: 'var(--accent)', teal: 'var(--teal)', amber: 'var(--amber)' }
const TONE_EDGE = { accent: 'var(--accent-edge)', teal: 'var(--teal-edge)', amber: 'var(--amber-edge)' }

/**
 * Every model call in the platform goes through one door, which is what makes
 * per-tenant budgets enforceable rather than advisory.
 */
export function GatewayLedger() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 22, flex: 1, minHeight: 0, alignContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minWidth: 0 }}>
        <Text size="xs" label tone="accent">
          Order of operations
        </Text>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ORDER.map((item, i) => (
            <li
              key={item.step}
              style={{
                display: 'grid',
                gridTemplateColumns: '22px minmax(0, 1fr)',
                gap: 12,
                alignItems: 'start',
                padding: '11px 13px',
                borderRadius: 'var(--r-sm)',
                background: 'var(--surface)',
                border: `1px solid ${TONE_EDGE[item.tone]}`,
              }}
            >
              <Text as="span" size="xs" mono style={{ color: TONE_FG[item.tone] }}>
                {i + 1}
              </Text>
              <div style={{ minWidth: 0 }}>
                <Text as="span" size="sm" weight="semibold" tone="ink" style={{ display: 'block' }}>
                  {item.step}
                </Text>
                <Text size="xs" tone="soft" style={{ marginTop: 2 }}>
                  {item.detail}
                </Text>
              </div>
            </li>
          ))}
        </ol>

        <Panel variant="accent" pad={13} style={{ marginTop: 3 }}>
          <Text size="sm" tone="ink">
            The budget is checked <strong style={{ color: 'var(--accent)' }}>before</strong> the spend, not
            reconciled after it. A tenant that is out of budget gets a refusal, not an invoice.
          </Text>
        </Panel>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minWidth: 0 }}>
        <Text size="xs" label tone="accent">
          Role to model routing
        </Text>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ROUTING.map((row) => (
            <li
              key={row.role}
              style={{
                padding: '11px 13px',
                borderRadius: 'var(--r-sm)',
                background: 'var(--surface)',
                border: '1px solid var(--hairline)',
                minWidth: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                <Text as="span" size="sm" mono tone="ink">
                  {row.role}
                </Text>
                <Text as="span" size="xs" tone="accent">
                  {row.model}
                </Text>
              </div>
              <Text size="xs" tone="muted" style={{ marginTop: 4 }}>
                {row.why}
              </Text>
            </li>
          ))}
        </ul>
        <Text size="xs" tone="muted" style={{ marginTop: 2 }}>
          Tiers are configured per deployment. The point is that the caller never picks the model, so cost cannot
          drift one call site at a time.
        </Text>
      </div>
    </div>
  )
}
