import type { ReactNode } from 'react'
import { Heading } from './Heading'
import { Text } from './Text'

interface SlideHeaderProps {
  title: string
  /** One line of framing under the title. Kept short. */
  lede?: string
  /** Badges or counts, right-aligned on the title line. */
  meta?: ReactNode
}

/**
 * The standard title block. Consistent placement across the deck means the
 * audience's eye lands in the same spot on every slide and only the content
 * below it has to be read fresh.
 */
export function SlideHeader({ title, lede, meta }: SlideHeaderProps) {
  return (
    <header style={{ marginBottom: 26, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24 }}>
        <Heading as="h2" size="xl" serif>
          {title}
        </Heading>
        {meta ? <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>{meta}</div> : null}
      </div>
      {lede ? (
        <Text size="base" tone="soft" style={{ marginTop: 10, maxWidth: '68ch' }}>
          {lede}
        </Text>
      ) : null}
      <div
        aria-hidden="true"
        style={{
          marginTop: 18,
          height: 1,
          background: 'linear-gradient(to right, var(--accent-edge), var(--hairline) 42%, transparent)',
        }}
      />
    </header>
  )
}
