'use client'

import { Heading } from '../ui/Heading'
import { Text } from '../ui/Text'
import { Badge } from '../ui/Badge'
import { Flex } from '../ui/Flex'

interface CoverProps {
  title: string
  subtitle?: string
  badge?: string
  children?: React.ReactNode
}

export function Cover({ title, subtitle, badge, children }: CoverProps) {
  return (
    <Flex direction="col" align="center" justify="center" gap={5} style={{ textAlign: 'center', height: '100%', width: '100%', maxWidth: 900 }}>
      {badge && <Badge variant="accent">{badge}</Badge>}
      <Heading size="display" weight="bold" serif>
        {title}
      </Heading>
      {subtitle && (
        <Text size="lg" color="soft" style={{ maxWidth: '75%' }}>
          {subtitle}
        </Text>
      )}
      {children}
    </Flex>
  )
}