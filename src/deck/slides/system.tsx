import { ArchitectureFlow } from '@/components/flow/ArchitectureFlow'
import { PipelinePath } from '@/components/panels/PipelinePath'
import { RunReplay } from '@/components/panels/RunReplay'
import { TrustLadder } from '@/components/panels/TrustLadder'
import { LAYERS, ADAPTER_SEAM } from '@/deck/content/architecture'
import { Badge, Flex, Panel, SlideHeader, Text } from '@/engine/ui'
import type { SlideSpec } from '@/engine/types/slide'

export const systemSlides: SlideSpec[] = [
  {
    id: 'architecture',
    title: 'Four layers and one seam',
    section: 'system',
    render: () => (
      <>
        <SlideHeader
          title="Four layers and one seam"
          meta={
            <>
              <Badge variant="teal">18 core packages</Badge>
              <Badge variant="quiet">51 endpoints</Badge>
            </>
          }
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 26, flex: 1, minHeight: 0 }}>
          <div style={{ minHeight: 0, minWidth: 0 }}>
            <ArchitectureFlow />
          </div>

          <Flex direction="col" gap={10} justify="center" style={{ minWidth: 0 }}>
            {LAYERS.map((layer) => (
              <div
                key={layer.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '16px minmax(0, 1fr)',
                  gap: 11,
                  paddingBottom: 9,
                  borderBottom: '1px solid var(--hairline)',
                }}
              >
                <Text as="span" size="xs" mono tone="accent">
                  {layer.n}
                </Text>
                <div style={{ minWidth: 0 }}>
                  <Text as="span" size="sm" weight="semibold" tone="ink">
                    {layer.title}
                  </Text>
                  <Text size="xs" mono tone="muted" style={{ marginTop: 2 }}>
                    {layer.path}
                  </Text>
                  <Text size="xs" tone="soft" style={{ marginTop: 4 }}>
                    {layer.parts.join(' · ')}
                  </Text>
                </div>
              </div>
            ))}

            <Panel variant="accent" pad={13} style={{ borderColor: 'var(--amber-edge)', background: 'var(--amber-dim)' }}>
              <Text as="span" size="sm" weight="semibold" tone="amber">
                {ADAPTER_SEAM.title}
              </Text>
              <Text size="xs" tone="soft" style={{ marginTop: 5 }}>
                {ADAPTER_SEAM.note}
              </Text>
            </Panel>
          </Flex>
        </div>
      </>
    ),
  },

  {
    id: 'request-path',
    title: 'The request path',
    section: 'system',
    // Four steps, three stages at a time, so the path is walked rather than dumped.
    steps: 4,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="The request path"
          lede="One POST /query, twelve stages. The same path runs for every domain, because none of these stages know what the domain is."
          meta={<Badge variant="quiet" mono>POST /query</Badge>}
        />
        <PipelinePath revealed={step * 3} />
      </>
    ),
  },

  {
    id: 'trust-stack',
    title: 'Six checkpoints before a real action',
    section: 'system',
    steps: 6,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Six checkpoints before a real action"
          lede="Each one is a separate mechanism with its own failure mode, and each one leaves an artefact behind. That last part is what turns a claim into an audit."
        />
        <TrustLadder revealed={step} />
      </>
    ),
  },

  {
    id: 'run-replay',
    title: 'One run, end to end',
    section: 'system',
    render: ({ isActive }) => (
      <>
        <SlideHeader
          title="One run, end to end"
          lede="A recorded run replayed at reading speed. Watch it stop at the gate: that pause is a durable checkpoint, not a spinner."
        />
        <RunReplay playing={isActive} />
      </>
    ),
  },
]
