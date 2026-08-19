'use client'

import { Panel, Text } from '@/engine/ui'

/** Illustrative values from the recorded demo run, not measured production output. */
const POINT = 0.83
const LOWER = 0.72
const UPPER = 0.94

const DRIVERS = [
  { name: 'port_congestion_risk', weight: 0.31, direction: 'up' as const },
  { name: 'supplier_concentration', weight: 0.22, direction: 'up' as const },
  { name: 'lead_time_variance', weight: 0.14, direction: 'up' as const },
  { name: 'safety_stock_cover', weight: -0.11, direction: 'down' as const },
]

const MAX_WEIGHT = 0.31

/**
 * What the ML signal hands to the planner: an interval, not a number, plus the
 * features that moved it.
 */
export function SignalPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, minHeight: 0, justifyContent: 'center' }}>
      <Panel pad={18}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <Text size="xs" label tone="accent">
            Conformal interval
          </Text>
          <Text size="xs" mono tone="muted">
            90% target coverage
          </Text>
        </div>

        {/* Number line. The band is the product; the point estimate is only
            the middle of it. */}
        <div style={{ position: 'relative', height: 42 }}>
          <div
            style={{
              position: 'absolute',
              insetInline: 0,
              top: 17,
              height: 3,
              borderRadius: 2,
              background: 'rgba(240, 237, 232, 0.08)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${LOWER * 100}%`,
              width: `${(UPPER - LOWER) * 100}%`,
              top: 12,
              height: 13,
              borderRadius: 'var(--r-xs)',
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent-edge)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${POINT * 100}%`,
              top: 6,
              width: 2,
              height: 25,
              background: 'var(--accent-strong)',
              transform: 'translateX(-1px)',
            }}
          />
          {[
            { at: LOWER, text: LOWER.toFixed(2) },
            { at: UPPER, text: UPPER.toFixed(2) },
          ].map((mark) => (
            <span
              key={mark.text}
              style={{
                position: 'absolute',
                left: `${mark.at * 100}%`,
                top: 29,
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 10,
                color: 'var(--ink-muted)',
              }}
            >
              {mark.text}
            </span>
          ))}
        </div>

        <Text size="sm" tone="soft" style={{ marginTop: 12 }}>
          The planner receives the whole band. A wide interval is a weaker argument for acting, and it says so in
          the plan rather than hiding inside a single confident-looking number.
        </Text>
      </Panel>

      <Panel pad={18}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 13 }}>
          <Text size="xs" label tone="accent">
            SHAP drivers
          </Text>
          <Text size="xs" mono tone="muted">
            demo run · illustrative
          </Text>
        </div>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {DRIVERS.map((driver) => {
            const magnitude = Math.abs(driver.weight) / MAX_WEIGHT
            const raises = driver.direction === 'up'
            return (
              <li key={driver.name} style={{ display: 'grid', gridTemplateColumns: '188px minmax(0, 1fr) 44px', gap: 12, alignItems: 'center' }}>
                <Text as="span" size="xs" mono tone="soft" style={{ overflowWrap: 'anywhere' }}>
                  {driver.name}
                </Text>
                <span
                  style={{
                    height: 7,
                    borderRadius: 2,
                    background: raises ? 'var(--accent)' : 'var(--teal)',
                    width: `${Math.max(magnitude * 100, 4)}%`,
                    opacity: 0.75,
                  }}
                />
                {/* Direction is stated in text as well as colour, so the chart
                    does not depend on hue alone. */}
                <Text as="span" size="xs" mono tone={raises ? 'accent' : 'teal'}>
                  {raises ? '+' : ''}
                  {driver.weight.toFixed(2)}
                </Text>
              </li>
            )
          })}
        </ul>
      </Panel>
    </div>
  )
}
