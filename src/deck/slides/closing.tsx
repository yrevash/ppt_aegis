import { Badge, Flex, Grid, Heading, Panel, Reveal, SlideHeader, Text } from '@/engine/ui'
import type { SlideSpec } from '@/engine/types/slide'

const RECAP = [
  { claim: 'Uncertainty-bounded', by: 'A conformal interval reaches the planner, not a bare number.' },
  { claim: 'Explainable', by: 'SHAP drivers on the signal, a citation on every retrieved claim.' },
  { claim: 'Guarded', by: 'Six input rails and three output rails, each reporting its own verdict.' },
  { claim: 'Human-approved', by: 'A gate on the tool risk tier, with a durable checkpoint behind it.' },
  { claim: 'Fully traced', by: 'An OpenTelemetry span tree and an append-only audit row per action.' },
]

export const closingSlides: SlideSpec[] = [
  {
    id: 'recap',
    title: 'The claim, and where it is kept',
    section: 'closing',
    steps: 5,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="The claim, and where it is kept"
          lede="Every autonomous action is uncertainty-bounded, explainable, guarded, human-approved and fully traced. Five words, five mechanisms."
        />
        <Flex direction="col" gap={14} justify="center" style={{ flex: 1 }}>
          {RECAP.map((row, i) => (
            <Reveal key={row.claim} at={i + 1} step={step}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '250px minmax(0, 1fr)',
                  gap: 26,
                  alignItems: 'baseline',
                  paddingBottom: 10,
                  borderBottom: '1px solid var(--hairline)',
                }}
              >
                <Heading as="h3" size="md" tone="accent">
                  {row.claim}
                </Heading>
                <Text size="base" tone="soft">
                  {row.by}
                </Text>
              </div>
            </Reveal>
          ))}
        </Flex>
      </>
    ),
  },

  {
    id: 'close',
    title: 'Thank you',
    section: 'closing',
    render: () => (
      <Flex direction="col" align="center" justify="center" gap={0} style={{ height: '100%', textAlign: 'center' }}>
        <Heading as="h2" size="display" serif>
          Autonomy you can audit.
        </Heading>
        <Text size="lg" tone="soft" style={{ marginTop: 18, maxWidth: '58ch' }}>
          The core is a package you import, not an application you fork. Point it at a new domain by writing one
          adapter, and the core never learns the domain.
        </Text>

        <Grid cols={3} gap={16} style={{ marginTop: 40, width: 720 }}>
          <Panel variant="outline" pad={15}>
            <Text size="xs" label tone="muted" style={{ marginBottom: 6 }}>
              Repository
            </Text>
            <Text size="sm" mono tone="ink">
              yrevash/aegis
            </Text>
          </Panel>
          <Panel variant="outline" pad={15}>
            <Text size="xs" label tone="muted" style={{ marginBottom: 6 }}>
              Start here
            </Text>
            <Text size="sm" mono tone="ink">
              docs/learn/
            </Text>
          </Panel>
          <Panel variant="outline" pad={15}>
            <Text size="xs" label tone="muted" style={{ marginBottom: 6 }}>
              Extend it
            </Text>
            <Text size="sm" mono tone="ink">
              SKILL.md
            </Text>
          </Panel>
        </Grid>

        <Flex gap={8} style={{ marginTop: 32 }}>
          <Badge variant="accent">Team Revo</Badge>
          <Badge variant="quiet">1,316 tests across both suites</Badge>
        </Flex>
      </Flex>
    ),
  },
]
