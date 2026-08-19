'use client'

import { Flex } from '../ui/Flex'
import { GridLayout } from '../ui/GridLayout'
import { Heading } from '../ui/Heading'

interface GridProps {
  title?: string
  cols?: number
  children?: React.ReactNode
}

export function Grid({ title, cols = 2, children }: GridProps) {
  return (
    <Flex direction="col" gap={5} style={{ height: '100%', justifyContent: 'center', width: '100%', maxWidth: 1100 }}>
      {title && <Heading size="xl" weight="bold" serif>{title}</Heading>}
      <GridLayout cols={cols} gap={4}>
        {children}
      </GridLayout>
    </Flex>
  )
}