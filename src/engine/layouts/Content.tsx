'use client'

import { Flex } from '../ui/Flex'
import { Heading } from '../ui/Heading'
import { Text } from '../ui/Text'

interface ContentProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export function Content({ title, subtitle, children }: ContentProps) {
  return (
    <Flex direction="col" gap={5} style={{ height: '100%', justifyContent: 'center', width: '100%', maxWidth: 900 }}>
      <Flex direction="col" gap={2}>
        <Heading size="xl" weight="bold" serif>{title}</Heading>
        {subtitle && <Text size="lg" color="soft">{subtitle}</Text>}
      </Flex>
      <Flex direction="col" gap={4} style={{ flex: 1, overflow: 'hidden' }}>
        {children}
      </Flex>
    </Flex>
  )
}