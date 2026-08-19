import { Flex, Grid, Heading, Panel, Reveal, SlideHeader, Text } from '@/engine/ui'
import type { SlideSpec } from '@/engine/types/slide'

const QUESTIONS = [
  { q: 'Why did it act?', gap: 'The plan is a prompt completion. Nothing records the evidence it rested on.' },
  { q: 'What did it read?', gap: 'Retrieval returns text. The citation trail back to a source document is not kept.' },
  { q: 'Who approved it?', gap: 'The tool call and the human decision live in different systems, if the second one exists.' },
  { q: 'What did it cost?', gap: 'Spend is reconciled from a provider bill, per key, long after the run is over.' },
]

const RULES = [
  {
    n: '01',
    rule: 'ML informs, it never gates.',
    body: 'The prediction and its conformal interval are evidence injected into the plan. The human gate fires on a tool’s risk tier, never on model confidence.',
    why: 'A confident model and a dangerous action are unrelated facts. Tying the gate to confidence means the system is most willing to act unsupervised exactly when it is most sure, which is precisely when a calibration error does the most damage.',
  },
  {
    n: '02',
    rule: 'A gated run checkpoints durably.',
    body: 'When the gate fires, the run persists to an approvals-inbox row and stops. Approval resumes it on any worker.',
    why: 'Holding a paused run in process memory means an approval that arrives after a deploy, a crash or a scale-down is lost. Durable checkpointing is what makes a human gate usable in production rather than a demo affordance.',
  },
]

export const problemSlides: SlideSpec[] = [
  {
    id: 'four-questions',
    title: 'Four questions a framework cannot answer',
    section: 'problem',
    steps: 4,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Four questions a framework cannot answer"
          lede="Every one of these has an owner in an enterprise: an auditor, a risk officer, a security reviewer, a finance team. A stack that cannot answer them does not get bought."
        />
        <Flex direction="col" gap={14} justify="center" style={{ flex: 1 }}>
          {QUESTIONS.map((item, i) => (
            <Reveal key={item.q} at={i + 1} step={step}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '250px minmax(0, 1fr)',
                  gap: 26,
                  alignItems: 'baseline',
                  paddingBottom: 11,
                  borderBottom: '1px solid var(--hairline)',
                }}
              >
                <Heading as="h3" size="lg" serif tone="ink" style={{ fontSize: 25 }}>
                  {item.q}
                </Heading>
                <Text size="base" tone="soft">
                  {item.gap}
                </Text>
              </div>
            </Reveal>
          ))}
        </Flex>
      </>
    ),
  },

  {
    id: 'two-rules',
    title: 'Two rules the whole design hangs on',
    section: 'problem',
    steps: 2,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Two rules the whole design hangs on"
          lede="Everything downstream is a consequence of these. They are the reason the architecture looks the way it does."
        />
        <Grid cols={2} gap={22} style={{ flex: 1, alignContent: 'center' }}>
          {RULES.map((rule, i) => (
            <Reveal key={rule.n} at={i + 1} step={step}>
              <Panel pad={22} style={{ height: '100%' }}>
                <Text size="xs" mono tone="accent">
                  {rule.n}
                </Text>
                <Heading as="h3" size="lg" serif style={{ marginTop: 10, fontSize: 24 }}>
                  {rule.rule}
                </Heading>
                <Text size="sm" tone="soft" style={{ marginTop: 12 }}>
                  {rule.body}
                </Text>
                <div aria-hidden="true" style={{ height: 1, background: 'var(--hairline)', margin: '15px 0' }} />
                <Text size="xs" label tone="accent" style={{ marginBottom: 7 }}>
                  Why it matters
                </Text>
                <Text size="sm" tone="muted">
                  {rule.why}
                </Text>
              </Panel>
            </Reveal>
          ))}
        </Grid>
      </>
    ),
  },
]
