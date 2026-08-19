import { ArchitectureFlow } from '@/components/flow/ArchitectureFlow'
import { PipelineFlow } from '@/components/flow/PipelineFlow'
import { RunReplay } from '@/components/panels/RunReplay'
import { SignalPanel } from '@/components/panels/SignalPanel'
import { TrustGauntlet } from '@/components/panels/TrustGauntlet'
import { Badge, SlideHeader, Text } from '@/engine/ui'
import type { SlideSpec } from '@/engine/types/slide'

export const act2Slides: SlideSpec[] = [
  {
    id: 'architecture',
    title: 'One core, any domain',
    section: 'system',
    render: () => (
      <>
        <SlideHeader
          title="One core, any domain"
          meta={
            <>
              <Badge variant="teal">18 packages</Badge>
              <Badge variant="amber">1 seam</Badge>
            </>
          }
        />
        <ArchitectureFlow />
      </>
    ),
  },

  {
    id: 'request-path',
    title: 'Twelve stages, one request',
    section: 'system',
    steps: 4,
    render: ({ step }) => (
      <>
        <SlideHeader
          title="Twelve stages, one request"
          meta={<Badge variant="quiet" mono>POST /query</Badge>}
        />
        <PipelineFlow revealed={step * 3} />
        <Text size="sm" tone="soft" style={{ marginTop: 10, textAlign: 'center', flexShrink: 0 }}>
          The run stops at the gate and checkpoints durably. Approval resumes it on any worker.
        </Text>
      </>
    ),
  },

  {
    id: 'trust',
    title: 'Six gates before anything real happens',
    section: 'system',
    steps: 6,
    render: ({ step }) => (
      <>
        <SlideHeader title="Six gates before anything real happens" />
        <TrustGauntlet revealed={step} />
      </>
    ),
  },

  {
    id: 'signal',
    title: 'The model never gets the last word',
    section: 'system',
    render: () => (
      <>
        <SlideHeader
          title="The model never gets the last word"
          meta={<Badge variant="quiet" mono>XGBoost + MAPIE + SHAP</Badge>}
        />
        <SignalPanel />
        <Text size="sm" tone="soft" style={{ marginTop: 14, textAlign: 'center' }}>
          ML informs, it never gates. The gate fires on the tool&apos;s risk tier, never on model confidence.
        </Text>
      </>
    ),
  },

  {
    id: 'live-run',
    title: 'Watch one run',
    section: 'system',
    render: ({ isActive }) => (
      <>
        <SlideHeader
          title="Watch one run"
          meta={<Badge variant="amber" mono>the gate is the moment</Badge>}
        />
        <RunReplay playing={isActive} />
      </>
    ),
  },
]
