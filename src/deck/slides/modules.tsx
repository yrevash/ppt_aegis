import { GatewayLedger } from '@/components/panels/GatewayLedger'
import { LoopCycle } from '@/components/panels/LoopCycle'
import { ModuleMatrix } from '@/components/panels/ModuleMatrix'
import { RetrievalFusion } from '@/components/panels/RetrievalFusion'
import { SignalPanel } from '@/components/panels/SignalPanel'
import { INPUT_RAILS, OUTPUT_RAILS } from '@/deck/content/guardrails'
import { MODULE_COUNT } from '@/deck/content/modules'
import { Badge, Flex, Grid, Heading, Panel, Reveal, SlideHeader, Stat, Text } from '@/engine/ui'
import type { SlideSpec } from '@/engine/types/slide'

const MEMORY_LANES = [
  { name: 'Episodic', what: 'What happened on this run, and on the ones before it.' },
  { name: 'Semantic', what: 'Durable facts about the domain, scoped to the tenant that owns them.' },
  { name: 'Procedural', what: 'How to act: playbooks the agent has learned or been given.' },
]

const MULTIMODAL = [
  {
    name: 'Aegis Voice',
    tech: 'hosted Whisper via LiteLLM',
    body: 'Speech to text, chunked on silence. The transcript then goes through the same six input rails as typed text, so voice is not a way around the guardrails.',
  },
  {
    name: 'Aegis Vision',
    tech: 'Llama-3.2-90B-Vision + Presidio',
    body: 'The injection screen runs ahead of the model, not after it: hygiene, screen, image-PII redaction, then the vision call, then the output rails.',
  },
  {
    name: 'Aegis Forecast',
    tech: 'Nixtla statsforecast + conformal',
    body: 'AutoARIMA and AutoETS with interval coverage measured on held-out windows, feeding the budget burn-down projection.',
  },
]

const GOVERNANCE = [
  { name: 'Tenancy', detail: 'Postgres row-level security. Isolation is enforced by the database, not by remembering to add a WHERE clause.' },
  { name: 'Identity', detail: 'JWT with role-scoped claims. Four platform roles plus per-tenant admins.' },
  { name: 'Budgets', detail: 'Per-tenant, checked before spend, with a durable usage ledger behind every call.' },
  { name: 'Audit', detail: 'Append-only. A row per consequential action, joined to the trace that produced it.' },
]

export const moduleSlides: SlideSpec[] = [
  {
    id: 'catalogue',
    title: 'Fifteen modules, each with its tech named',
    section: 'modules',
    steps: 5,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Fifteen modules, each with its tech named"
          lede="Every capability is a branded module paired with the real technology underneath. Branding, never hiding. This is the live manifest served at GET /platform/capabilities, and a test asserts every module path actually imports."
          meta={<Badge variant="accent">{MODULE_COUNT} modules</Badge>}
        />
        <ModuleMatrix revealed={step} />
      </>
    ),
  },

  {
    id: 'gateway',
    title: 'Aegis Gateway',
    section: 'modules',
    render: () => (
      <>
        <SlideHeader
          title="Aegis Gateway"
          lede="One chokepoint for every model call in the platform. This is the module that makes cost a property of the system rather than a surprise."
          meta={<Badge variant="quiet" mono>LiteLLM</Badge>}
        />
        <GatewayLedger />
      </>
    ),
  },

  {
    id: 'retrieval',
    title: 'Aegis Retrieval',
    section: 'modules',
    render: () => (
      <>
        <SlideHeader
          title="Aegis Retrieval"
          lede="Three retrievers with different failure modes, fused rather than chosen between. Vector misses exact identifiers, BM25 misses paraphrase, and graph catches the relationship neither of them sees."
          meta={<Badge variant="quiet" mono>Neo4j/LightRAG + NanoVectorDB</Badge>}
        />
        <RetrievalFusion />
      </>
    ),
  },

  {
    id: 'signal',
    title: 'Aegis Signal',
    section: 'modules',
    render: () => (
      <>
        <SlideHeader
          title="Aegis Signal"
          lede="The ML signal is evidence for the planner, never a gate. It arrives as an interval with its drivers attached."
          meta={<Badge variant="quiet" mono>XGBoost + MAPIE + SHAP</Badge>}
        />
        <SignalPanel />
      </>
    ),
  },

  {
    id: 'guardrails',
    title: 'Aegis Guardrails',
    section: 'modules',
    steps: 2,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Aegis Guardrails"
          lede="Six rails on the way in, three on the way out. Each one reports its own verdict, so a blocked run says which rail stopped it rather than failing anonymously."
          meta={<Badge variant="quiet" mono>programmatic + NeMo Colang</Badge>}
        />
        <Grid cols="1.35fr 1fr" gap={24} style={{ flex: 1, minHeight: 0, alignContent: 'center' }}>
          <Reveal at={0} step={step}>
            <Text size="xs" label tone="teal" style={{ marginBottom: 10 }}>
              Input rails · fail closed
            </Text>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {INPUT_RAILS.map((rail, i) => (
                <li
                  key={rail.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '20px minmax(0, 1fr)',
                    gap: 11,
                    alignItems: 'baseline',
                    padding: '8px 11px',
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--surface)',
                    border: '1px solid var(--teal-edge)',
                  }}
                >
                  <Text as="span" size="xs" mono tone="teal">
                    {i + 1}
                  </Text>
                  <div style={{ minWidth: 0 }}>
                    <Text as="span" size="sm" tone="ink">
                      {rail.name}
                    </Text>
                    <Text size="xs" tone="muted" style={{ marginTop: 1 }}>
                      {rail.note}
                    </Text>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal at={1} step={step}>
            <Text size="xs" label tone="amber" style={{ marginBottom: 10 }}>
              Output rails
            </Text>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {OUTPUT_RAILS.map((rail) => (
                <li
                  key={rail.id}
                  style={{
                    padding: '9px 11px',
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--surface)',
                    border: '1px solid var(--amber-edge)',
                  }}
                >
                  <Text as="span" size="sm" tone="ink">
                    {rail.name}
                  </Text>
                  <Text size="xs" tone="muted" style={{ marginTop: 2 }}>
                    {rail.note}
                  </Text>
                </li>
              ))}
            </ol>
            <Panel variant="outline" pad={13} style={{ marginTop: 12 }}>
              <Text size="xs" tone="soft">
                When the injection classifier is unavailable the run is refused, not waved through. Availability is
                not a reason to lower the bar.
              </Text>
            </Panel>
          </Reveal>
        </Grid>
      </>
    ),
  },

  {
    id: 'memory',
    title: 'Aegis Memory and Cache',
    section: 'modules',
    render: () => (
      <>
        <SlideHeader
          title="Aegis Memory and Cache"
          lede="Three kinds of recall, one semantic cache. Both are tenant-scoped by the same row-level security that protects everything else."
          meta={<Badge variant="quiet" mono>Postgres + Chroma · Redis</Badge>}
        />
        <Flex direction="col" gap={16} justify="center" style={{ flex: 1, minHeight: 0 }}>
          <Grid cols={3} gap={13}>
            {MEMORY_LANES.map((lane) => (
              <Panel key={lane.name} pad={17}>
                <Heading as="h3" size="md">
                  {lane.name}
                </Heading>
                <Text size="sm" tone="soft" style={{ marginTop: 7 }}>
                  {lane.what}
                </Text>
              </Panel>
            ))}
          </Grid>

          <Grid cols={2} gap={22} style={{ flex: 1, minHeight: 0 }}>
            <Panel pad={18}>
              <Text size="xs" label tone="accent" style={{ marginBottom: 9 }}>
                Bitemporal and consolidated
              </Text>
              <Text size="sm" tone="soft">
                A fact carries both when it was true and when the system learned it. That is what lets a run be
                replayed with the knowledge it actually had, rather than with everything known today.
              </Text>
            </Panel>
            <Panel pad={18} style={{ borderColor: 'var(--teal-edge)' }}>
              <Text size="xs" label tone="teal" style={{ marginBottom: 9 }}>
                Aegis Cache
              </Text>
              <Text size="sm" tone="soft">
                Keyed on what the query means, not on its exact bytes, so two phrasings of the same question hit
                the same entry. On Windows this is Memurai: same wire protocol, same port, no config change.
              </Text>
            </Panel>
          </Grid>
        </Flex>
      </>
    ),
  },

  {
    id: 'loop',
    title: 'Aegis Loop',
    section: 'modules',
    steps: 4,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Aegis Loop"
          lede="The system improves itself on a measured cycle rather than on someone's hunch about which prompt got worse."
          meta={<Badge variant="quiet" mono>native</Badge>}
        />
        <LoopCycle revealed={step} />
      </>
    ),
  },

  {
    id: 'multimodal',
    title: 'Voice, vision and forecast',
    section: 'modules',
    steps: 3,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Voice, vision and forecast"
          lede="Three modules the README's older twelve-module table predates. Each one enters through the same rails as text, which is the whole reason they could be added at all."
        />
        <Flex direction="col" gap={15} justify="center" style={{ flex: 1 }}>
          {MULTIMODAL.map((module, i) => (
            <Reveal key={module.name} at={i + 1} step={step}>
              <Panel pad={19}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
                  <Heading as="h3" size="md">
                    {module.name}
                  </Heading>
                  <Text as="span" size="xs" mono tone="muted">
                    {module.tech}
                  </Text>
                </div>
                <Text size="sm" tone="soft" style={{ marginTop: 8 }}>
                  {module.body}
                </Text>
              </Panel>
            </Reveal>
          ))}
        </Flex>
      </>
    ),
  },

  {
    id: 'governance',
    title: 'Governance and trace',
    section: 'modules',
    render: () => (
      <>
        <SlideHeader
          title="Governance and trace"
          lede="The two modules an enterprise security review actually reads."
          meta={
            <>
              <Badge variant="quiet" mono>Postgres RLS + JWT</Badge>
              <Badge variant="quiet" mono>OTel to Phoenix</Badge>
            </>
          }
        />
        <Grid cols={2} gap={24} style={{ flex: 1, minHeight: 0, alignContent: 'center' }}>
          <Flex direction="col" gap={10}>
            {GOVERNANCE.map((item) => (
              <div
                key={item.name}
                style={{ paddingBottom: 10, borderBottom: '1px solid var(--hairline)' }}
              >
                <Text as="span" size="sm" weight="semibold" tone="ink">
                  {item.name}
                </Text>
                <Text size="sm" tone="soft" style={{ marginTop: 3 }}>
                  {item.detail}
                </Text>
              </div>
            ))}
          </Flex>

          <Flex direction="col" gap={14}>
            <Panel pad={18} style={{ borderColor: 'var(--accent-edge)' }}>
              <Text size="xs" label tone="accent" style={{ marginBottom: 9 }}>
                Glass-box tracing
              </Text>
              <Text size="sm" tone="soft">
                Every run exports a span tree: which specialist handled the turn, what each retriever returned,
                what the gate decided, what each tool cost. A trace is the unit an incident review works from.
              </Text>
            </Panel>
            <Grid cols={2} gap={16}>
              <Stat value="OWASP" label="Agentic Top-10" note="Mapped in docs/security/" />
              <Stat value="9" label="Decision records" note="docs/adr/" />
            </Grid>
            <Panel variant="outline" pad={15}>
              <Text size="xs" tone="muted">
                There is a threat model in the repository, and it is a document rather than a slide bullet.
              </Text>
            </Panel>
          </Flex>
        </Grid>
      </>
    ),
  },
]
