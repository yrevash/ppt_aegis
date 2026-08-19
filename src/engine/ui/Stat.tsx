import { TONE } from './Text'

interface StatProps {
  value: string
  label: string
  tone?: keyof typeof TONE
  /** Optional qualifier, e.g. where the number comes from. */
  note?: string
}

/**
 * A single figure. Numbers are mono and tabular so columns of them line up.
 */
export function Stat({ value, label, tone = 'ink', note }: StatProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
      <span
        style={{
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: 30,
          lineHeight: 1.05,
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: TONE[tone],
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 10.5,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
        }}
      >
        {label}
      </span>
      {note ? <span style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>{note}</span> : null}
    </div>
  )
}
