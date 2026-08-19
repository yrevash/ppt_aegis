'use client'

import { Flex } from '../ui/Flex'
import { Heading } from '../ui/Heading'
import { Text } from '../ui/Text'

interface SplitProps {
  title?: string
  left?: React.ReactNode
  right?: React.ReactNode
  children?: React.ReactNode
}

export function Split({ title, left, right, children }: SplitProps) {
  return (
    <Flex direction="col" gap={5} style={{ height: '100%', justifyContent: 'center', width: '100%', maxWidth: 1100 }}>
      {title && <Heading size="xl" weight="bold" serif>{title}</Heading>}
      <Flex gap={8} style={{ flex: 1, alignItems: 'flex-start', width: '100%', minHeight: 0 }}>
        <Flex direction="col" gap={4} style={{ flex: 1, minWidth: 0 }}>
          {left}
        </Flex>
        <Flex direction="col" gap={4} style={{ flex: 1, minWidth: 0 }}>
          {right}
        </Flex>
      </Flex>
    </Flex>
  )
}