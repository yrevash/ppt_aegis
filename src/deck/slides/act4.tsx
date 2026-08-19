import { Badge, Flex, Grid, Heading, Panel, Text } from '@/engine/ui'
import type { SlideSpec } from '@/engine/types/slide'

export const act4Slides: SlideSpec[] = [
  {
    id: 'close',
    title: 'Autonomy you can audit',
    section: 'closing',
    render: () => (
      <Flex direction="col" align="center" justify="center" gap={0} style={{ height: '100%', textAlign: 'center' }}>
        <Heading as="h2" size="display" serif style={{ fontSize: 62 }}>
          Autonomy you can audit.
        </Heading>
        <Text size="lg" tone="soft" style={{ marginTop: 20, maxWidth: '56ch' }}>
          A package you import, not an application you fork. Point it at a new domain by writing one adapter.
        </Text>

        <Grid cols={3} gap={16} style={{ marginTop: 44, width: 760 }}>
          {[
            ['Repository', 'yrevash/aegis'],
            ['Start here', 'docs/learn/'],
            ['Extend it', 'SKILL.md'],
          ].map(([label, value]) => (
            <Panel key={label} variant="outline" pad={17}>
              <Text size="xs" label tone="muted" style={{ marginBottom: 7 }}>
                {label}
              </Text>
              <Text size="sm" mono tone="ink">
                {value}
              </Text>
            </Panel>
          ))}
        </Grid>

        <Flex gap={8} style={{ marginTop: 36 }}>
          <Badge variant="accent">Team Revo</Badge>
          <Badge variant="quiet">Thank you</Badge>
        </Flex>
      </Flex>
    ),
  },
]
