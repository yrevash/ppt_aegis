'use client'

import { Flex } from '../ui/Flex'
import { Text } from '../ui/Text'

interface QuoteProps {
  text: string
  attribution?: string
  children?: React.ReactNode
}

export function Quote({ text, attribution, children }: QuoteProps) {
  return (
    <Flex direction="col" align="center" justify="center" gap={5} style={{ textAlign: 'center', height: '100%', maxWidth: 750 }}>
      <Text
        size="lg"
        color="ink"
        style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
          lineHeight: 1.25,
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontStyle: 'italic',
        }}
      >
        &ldquo;{text}&rdquo;
      </Text>
      {attribution && <Text size="base" color="muted" tracking="wide" uppercase>— {attribution}</Text>}
      {children}
    </Flex>
  )
}