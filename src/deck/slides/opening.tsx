import Image from 'next/image'
import { Badge, Flex, Grid, Heading, Panel, Reveal, SlideHeader, Text } from '@/engine/ui'
import type { SlideSpec } from '@/engine/types/slide'

const PILLARS = [
  {
    claim: 'Cheap enough to scale',
    how: 'One gateway for every model call, with per-tenant budgets enforced before spend and a durable usage ledger behind them.',
  },
  {
    claim: 'Measurable enough to trust',
    how: 'Calibrated conformal intervals and SHAP drivers on the signal. An offline eval gate and a CI regression gate on retrieval.',
  },
  {
    claim: 'Secure enough to buy',
    how: 'Multi-tenant RBAC on Postgres row-level security, six guardrail layers, and an append-only audit log.',
  },
  {
    claim: 'It takes real actions',
    how: 'Typed, idempotent, reversible domain tools, behind a gate that fires on the risk tier of the tool being called.',
  },
]

export const openingSlides: SlideSpec[] = [
  {
    id: 'cover',
    title: 'Aegis',
    section: 'opening',
    render: () => (
      <Flex
        direction="col"
        align="center"
        justify="center"
        gap={0}
        style={{ height: '100%', textAlign: 'center' }}
      >
        <Image
          src="/falcon-logo.jpg"
          alt="The Aegis falcon mark"
          width={148}
          height={148}
          priority
          style={{
            borderRadius: '50%',
            filter: 'drop-shadow(0 0 44px rgba(204, 120, 92, 0.26))',
            marginBottom: 26,
          }}
        />
        <Heading as="h1" size="display" serif style={{ letterSpacing: '-0.035em' }}>
          Aegis
        </Heading>
        <Text size="lg" tone="ink" style={{ marginTop: 14, fontSize: 21 }}>
          Autonomy you can audit.
        </Text>
        <Text size="base" tone="soft" style={{ marginTop: 12, maxWidth: '54ch' }}>
          A domain-agnostic enterprise agentic-AI platform. Every autonomous action is uncertainty-bounded,
          explainable, guarded, human-approved and fully traced.
        </Text>
        <Flex gap={8} style={{ marginTop: 26 }}>
          <Badge variant="accent">15 modules</Badge>
          <Badge variant="teal">6 trust checkpoints</Badge>
          <Badge variant="amber">1 adapter per domain</Badge>
        </Flex>
        <Text size="xs" mono tone="muted" style={{ marginTop: 30 }}>
          Team Revo · github.com/yrevash/aegis
        </Text>
      </Flex>
    ),
  },

  {
    id: 'thesis',
    title: 'The instrumentation is the product',
    section: 'opening',
    steps: 4,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="The instrumentation is the product"
          lede="Most agent stacks are a framework plus glue. They can call tools, but they cannot tell you why they acted, what they read, who approved it, or what it cost. Aegis is built the other way around."
        />
        <Grid cols={2} gap={16} style={{ flex: 1, alignContent: 'center' }}>
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.claim} at={i + 1} step={step}>
              <Panel pad={18} style={{ height: '100%' }}>
                <Heading as="h3" size="md">
                  {pillar.claim}
                </Heading>
                <Text size="sm" tone="soft" style={{ marginTop: 8 }}>
                  {pillar.how}
                </Text>
              </Panel>
            </Reveal>
          ))}
        </Grid>
      </>
    ),
  },
]
