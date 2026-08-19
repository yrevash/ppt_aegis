import Image from 'next/image'
import { Badge, Flex, Grid, Heading, Panel, Reveal, SlideHeader, Text } from '@/engine/ui'
import type { SlideSpec } from '@/engine/types/slide'

const QUESTIONS = [
  { q: 'Why did it act?', gap: 'The plan is a completion. The evidence is gone.' },
  { q: 'What did it read?', gap: 'Text came back. The trail to the source did not.' },
  { q: 'Who approved it?', gap: 'The tool call and the human sit in different systems.' },
  { q: 'What did it cost?', gap: 'Reconciled from a provider bill, weeks later.' },
]

export const act1Slides: SlideSpec[] = [
  {
    id: 'cover',
    title: 'Aegis',
    section: 'opening',
    render: () => (
      <Flex direction="col" align="center" justify="center" gap={0} style={{ height: '100%', textAlign: 'center' }}>
        <Image
          src="/falcon-logo.jpg"
          alt="The Aegis falcon mark"
          width={132}
          height={132}
          priority
          style={{ borderRadius: '50%', filter: 'drop-shadow(0 0 46px rgba(204, 120, 92, 0.3))', marginBottom: 30 }}
        />
        <Heading as="h1" size="display" serif style={{ fontSize: 74, letterSpacing: '-0.038em' }}>
          Aegis
        </Heading>
        <Text size="lg" tone="ink" style={{ marginTop: 16, fontSize: 23 }}>
          Autonomy you can audit.
        </Text>
        <Flex gap={8} style={{ marginTop: 34 }}>
          <Badge variant="accent">Enterprise agentic AI</Badge>
          <Badge variant="teal">Every action traced</Badge>
          <Badge variant="amber">Any domain, one adapter</Badge>
        </Flex>
        <Text size="xs" mono tone="muted" style={{ marginTop: 38 }}>
          Team Revo
        </Text>
      </Flex>
    ),
  },

  {
    id: 'problem',
    title: 'Agents act. Nobody can say why.',
    section: 'problem',
    steps: 4,
    render: ({ step }) => (
      <>
        <SlideHeader title="Agents act. Nobody can say why." />
        <Flex direction="col" gap={22} justify="center" style={{ flex: 1, minHeight: 0 }}>
        <Grid cols={2} gap={18}>
          {QUESTIONS.map((item, i) => (
            <Reveal key={item.q} at={i + 1} step={step}>
              <Panel pad={26} style={{ height: '100%' }}>
                <Heading as="h3" size="lg" serif style={{ fontSize: 31 }}>
                  {item.q}
                </Heading>
                <Text size="base" tone="muted" style={{ marginTop: 12 }}>
                  {item.gap}
                </Text>
              </Panel>
            </Reveal>
          ))}
        </Grid>
        <Text size="sm" tone="soft" style={{ textAlign: 'center' }}>
          Four questions with four owners in every enterprise. A stack that cannot answer them does not get bought.
        </Text>
        </Flex>
      </>
    ),
  },

  {
    id: 'insight',
    title: 'So we built the instrumentation first',
    section: 'problem',
    steps: 4,
    render: ({ step }) => (
      <>
        <SlideHeader title="So we built the instrumentation first" />
        <Flex direction="col" gap={24} justify="center" style={{ flex: 1, minHeight: 0 }}>
        <Grid cols={4} gap={16}>
          {[
            { big: 'Bounded', small: 'A conformal interval, never a bare number' },
            { big: 'Explained', small: 'SHAP drivers, and a citation per claim' },
            { big: 'Gated', small: 'A human approves by tool risk tier' },
            { big: 'Traced', small: 'A span tree and an audit row per action' },
          ].map((item, i) => (
            <Reveal key={item.big} at={i + 1} step={step}>
              <Panel pad={22} style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Heading as="h3" size="lg" tone="accent" serif style={{ fontSize: 27 }}>
                  {item.big}
                </Heading>
                <Text size="sm" tone="soft">
                  {item.small}
                </Text>
              </Panel>
            </Reveal>
          ))}
        </Grid>
        <Panel variant="accent" pad={20}>
          <Text size="base" tone="ink" style={{ textAlign: 'center' }}>
            Most stacks are a framework plus glue. In Aegis the instrumentation <strong style={{ color: 'var(--accent)' }}>is</strong> the product.
          </Text>
        </Panel>
        </Flex>
      </>
    ),
  },
]
