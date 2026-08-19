import { ADAPTER_PIECES } from '@/deck/content/adapter'
import { LIVE_SURFACES, PORTALS, PROOF_POINTS, RUN_MODES } from '@/deck/content/proof'
import { Badge, Flex, Grid, Panel, Reveal, SlideHeader, Stat, Text } from '@/engine/ui'
import type { SlideSpec } from '@/engine/types/slide'

const TONE_EDGE = { teal: 'var(--teal-edge)', accent: 'var(--accent-edge)', amber: 'var(--amber-edge)' }
const TONE_FG = { teal: 'var(--teal)', accent: 'var(--accent)', amber: 'var(--amber)' }

export const proofSlides: SlideSpec[] = [
  {
    id: 'portals',
    title: 'Four portals, one console',
    section: 'proof',
    render: () => (
      <>
        <SlideHeader
          title="Four portals, one console"
          lede="Every claim the platform makes has a screen behind it. Each role sees a focused subset rather than one dashboard with everything switched off."
        />
        <Flex direction="col" gap={22} justify="center" style={{ flex: 1, minHeight: 0 }}>
          <Grid cols={4} gap={13}>
            {PORTALS.map((portal) => (
              <Panel key={portal.role} pad={17}>
                <Text as="span" size="sm" mono tone="accent">
                  {portal.role}
                </Text>
                <Text size="sm" tone="soft" style={{ marginTop: 9 }}>
                  {portal.focus}
                </Text>
              </Panel>
            ))}
          </Grid>

          <div>
            <Text size="xs" label tone="accent" style={{ marginBottom: 10 }}>
              Surfaces behind the claims
            </Text>
            <Grid cols={3} gap={13}>
              {[
                ['Command centre', 'Spend, approvals, security posture, latency'],
                ['Knowledge graph', 'The entities a run touched, read from Neo4j'],
                ['Guardrails', 'Six layers, each with its own pass or block record'],
                ['Memory', 'Episodic, semantic and procedural recall'],
                ['Agent trace', 'The span tree for a single run'],
                ['Red team', 'Adversarial probes and what they got through'],
              ].map(([name, detail]) => (
                <div key={name} style={{ paddingBottom: 9, borderBottom: '1px solid var(--hairline)' }}>
                  <Text as="span" size="sm" weight="medium" tone="ink">
                    {name}
                  </Text>
                  <Text size="xs" tone="muted" style={{ marginTop: 2 }}>
                    {detail}
                  </Text>
                </div>
              ))}
            </Grid>
          </div>
        </Flex>
      </>
    ),
  },

  {
    id: 'adapter',
    title: 'Pointing Aegis at a new domain',
    section: 'proof',
    steps: 1,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Pointing Aegis at a new domain"
          lede="Ten pieces in one directory. Nothing else in the repository changes, because the core only ever reaches the domain through injected callables."
          meta={<Badge variant="amber" mono>backend/src/app/adapter/</Badge>}
        />
        <Flex direction="col" gap={18} justify="center" style={{ flex: 1, minHeight: 0 }}>
          <Grid cols={2} gap="12px 30px" style={{ alignContent: 'start' }}>
            {ADAPTER_PIECES.map((piece) => (
              <div
                key={piece.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '20px 132px minmax(0, 1fr)',
                  gap: 12,
                  alignItems: 'baseline',
                  paddingBottom: 8,
                  borderBottom: '1px solid var(--hairline)',
                }}
              >
                <Text as="span" size="xs" mono tone="faint">
                  {String(piece.n).padStart(2, '0')}
                </Text>
                <Text as="span" size="sm" mono tone="accent">
                  {piece.file}
                </Text>
                <Text as="span" size="xs" tone="soft">
                  {piece.defines}
                </Text>
              </div>
            ))}
          </Grid>

          <Reveal at={1} step={step}>
            <Panel variant="accent" pad={16}>
              <Text size="sm" tone="ink">
                A test counts the pieces on disk and fails if any document disagrees with it. The contract cannot
                drift from the documentation without the build going red.
              </Text>
              <Text size="xs" mono tone="muted" style={{ marginTop: 7 }}>
                backend/tests/adapter/test_piece_manifest.py
              </Text>
            </Panel>
          </Reveal>
        </Flex>
      </>
    ),
  },

  {
    id: 'run-modes',
    title: 'Three run modes',
    section: 'proof',
    steps: 3,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Three run modes"
          lede="A demo never depends on infrastructure being healthy. If the databases are down, the talk still happens."
        />
        <Flex direction="col" gap={20} justify="center" style={{ flex: 1, minHeight: 0 }}>
          <Grid cols={3} gap={14}>
            {RUN_MODES.map((mode, i) => (
              <Reveal key={mode.id} at={i + 1} step={step}>
                <Panel pad={19} style={{ height: '100%', borderColor: TONE_EDGE[mode.tone] }}>
                  <Text as="span" size="lg" mono style={{ color: TONE_FG[mode.tone], fontSize: 20 }}>
                    {mode.id}
                  </Text>
                  <Text size="sm" tone="ink" style={{ marginTop: 11 }}>
                    {mode.what}
                  </Text>
                  <div aria-hidden="true" style={{ height: 1, background: 'var(--hairline)', margin: '13px 0' }} />
                  <Text size="xs" label tone="muted" style={{ marginBottom: 5 }}>
                    Needs
                  </Text>
                  <Text size="xs" tone="soft">
                    {mode.needs}
                  </Text>
                </Panel>
              </Reveal>
            ))}
          </Grid>

          <Panel variant="outline" pad={17}>
            <Text size="sm" tone="soft">
              No Docker, no GPU, no WSL anywhere. Every store is a native local install, which is the difference
              between a judge being able to run this and a judge taking your word for it.
            </Text>
          </Panel>
        </Flex>
      </>
    ),
  },

  {
    id: 'verification',
    title: 'What is actually verified',
    section: 'proof',
    render: () => (
      <>
        <SlideHeader
          title="What is actually verified"
          lede="Counts from the repository, not from a pitch. Both suites run on a laptop with no services up."
        />
        <Flex direction="col" gap={26} justify="center" style={{ flex: 1, minHeight: 0 }}>
          <Grid cols={4} gap={20}>
            {PROOF_POINTS.map((point) => (
              <Stat key={point.label} value={point.value} label={point.label} note={point.note} tone="accent" />
            ))}
          </Grid>

          <Grid cols={2} gap={24} style={{ flex: 1, minHeight: 0 }}>
            <Panel variant="inset" pad={18}>
              <Text size="xs" label tone="accent" style={{ marginBottom: 11 }}>
                The two commands
              </Text>
              <Text size="sm" mono tone="ink" style={{ lineHeight: 2 }}>
                cd backend &amp;&amp; pytest -q
                <br />
                cd web &amp;&amp; tsc --noEmit &amp;&amp; next build
              </Text>
              <Text size="xs" tone="muted" style={{ marginTop: 11 }}>
                A reviewer can reproduce every number on this slide in under a minute.
              </Text>
            </Panel>

            <div>
              <Text size="xs" label tone="accent" style={{ marginBottom: 11 }}>
                Self-describing surfaces
              </Text>
              <Flex direction="col" gap={9}>
                {LIVE_SURFACES.map((surface) => (
                  <div key={surface.route} style={{ paddingBottom: 8, borderBottom: '1px solid var(--hairline)' }}>
                    <Text as="span" size="xs" mono tone="teal">
                      {surface.route}
                    </Text>
                    <Text size="xs" tone="soft" style={{ marginTop: 3 }}>
                      {surface.what}
                    </Text>
                  </div>
                ))}
              </Flex>
            </div>
          </Grid>
        </Flex>
      </>
    ),
  },
]
