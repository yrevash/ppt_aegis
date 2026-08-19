import { ModuleMatrix } from '@/components/panels/ModuleMatrix'
import { ADAPTER_PIECES } from '@/deck/content/adapter'
import { MODULE_COUNT } from '@/deck/content/modules'
import { RUN_MODES } from '@/deck/content/proof'
import { Badge, Flex, Grid, Panel, Reveal, SlideHeader, Stat, Text } from '@/engine/ui'
import type { SlideSpec } from '@/engine/types/slide'

const TONE_EDGE = { teal: 'var(--teal-edge)', accent: 'var(--accent-edge)', amber: 'var(--amber-edge)' }
const TONE_FG = { teal: 'var(--teal)', accent: 'var(--accent)', amber: 'var(--amber)' }

export const act3Slides: SlideSpec[] = [
  {
    id: 'platform',
    title: 'Fifteen modules, every one named honestly',
    section: 'proof',
    steps: 5,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Fifteen modules, every one named honestly"
          meta={<Badge variant="accent">GET /platform/capabilities</Badge>}
        />
        <ModuleMatrix revealed={step} />
        <Text size="sm" tone="soft" style={{ marginTop: 16, textAlign: 'center' }}>
          The branded name always ships with the real technology underneath, and a test asserts every module path
          imports. {MODULE_COUNT} modules, no vapour.
        </Text>
      </>
    ),
  },

  {
    id: 'adapter',
    title: 'New domain in ten files',
    section: 'proof',
    steps: 1,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="New domain in ten files"
          meta={<Badge variant="amber" mono>app/adapter/</Badge>}
        />
        <Flex direction="col" gap={20} justify="center" style={{ flex: 1, minHeight: 0 }}>
          <Grid cols={5} gap={11}>
            {ADAPTER_PIECES.map((piece) => (
              <Panel key={piece.n} pad={14} style={{ height: '100%' }}>
                <Text as="span" size="xs" mono tone="faint">
                  {String(piece.n).padStart(2, '0')}
                </Text>
                <Text as="span" size="sm" mono tone="accent" style={{ display: 'block', marginTop: 7, overflowWrap: 'anywhere' }}>
                  {piece.file}
                </Text>
                <Text size="xs" tone="muted" style={{ marginTop: 6 }}>
                  {piece.defines}
                </Text>
              </Panel>
            ))}
          </Grid>

          <Reveal at={1} step={step}>
            <Panel variant="accent" pad={20}>
              <Text size="base" tone="ink" style={{ textAlign: 'center' }}>
                Nothing else in the repository changes. The core reaches the domain only through injected
                callables, and a test counts the pieces on disk so the contract cannot drift.
              </Text>
            </Panel>
          </Reveal>
        </Flex>
      </>
    ),
  },

  {
    id: 'proof',
    title: 'It runs, and it is tested',
    section: 'proof',
    steps: 3,
    render: ({ step }) => (
      <>
        <SlideHeader title="It runs, and it is tested" />
        <Flex direction="col" gap={26} justify="center" style={{ flex: 1, minHeight: 0 }}>
          <Grid cols={4} gap={20}>
            <Stat value="1,316" label="Tests passing" note="723 core · 593 backend" tone="accent" />
            <Stat value="51" label="Endpoints" note="OpenAPI at /docs" tone="accent" />
            <Stat value="18" label="Core packages" note="One contract each" tone="accent" />
            <Stat value="0" label="Docker, GPU, WSL" note="Native local installs" tone="accent" />
          </Grid>

          <Grid cols={3} gap={14}>
            {RUN_MODES.map((mode, i) => (
              <Reveal key={mode.id} at={i + 1} step={step}>
                <Panel pad={19} style={{ height: '100%', borderColor: TONE_EDGE[mode.tone] }}>
                  <Text as="span" size="lg" mono style={{ color: TONE_FG[mode.tone], fontSize: 21 }}>
                    {mode.id}
                  </Text>
                  <Text size="sm" tone="ink" style={{ marginTop: 10 }}>
                    {mode.what}
                  </Text>
                  <Text size="xs" tone="muted" style={{ marginTop: 9 }}>
                    Needs: {mode.needs}
                  </Text>
                </Panel>
              </Reveal>
            ))}
          </Grid>

          <Text size="sm" tone="soft" style={{ textAlign: 'center' }}>
            Three run modes, so a demo never depends on infrastructure being healthy.
          </Text>
        </Flex>
      </>
    ),
  },
]
