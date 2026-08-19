'use client'

import { useState, useCallback } from 'react'
import { Deck } from '@/engine/components/Deck'
import { Slide } from '@/engine/components/Slide'
import { ThreeCanvas } from '@/engine/components/ThreeCanvas'
import { ThreeSceneRenderer } from '@/engine/components/ThreeSceneRenderer'
import { threeTunnel } from '@/engine/context/ThreeContext'
import { Cover } from '@/engine/layouts/Cover'
import { Flex } from '@/engine/ui/Flex'
import { Heading } from '@/engine/ui/Heading'
import { Text } from '@/engine/ui/Text'
import { Badge } from '@/engine/ui/Badge'
import { PipelineFlow } from '@/components/PipelineFlow'
import { ArchitectureFlow } from '@/components/ArchitectureFlow'
import { LiveConsole } from '@/components/LiveConsole'
import { LiveMetrics } from '@/components/LiveMetrics'
import { exampleAdapter } from '@/adapters/example-adapter'
import type { ThreeSceneName } from '@/engine/types/slide'

export default function Presentation() {
  const slides = exampleAdapter.generateSlides()
  const [activeScene, setActiveScene] = useState<ThreeSceneName>('ring')

  const handleSceneChange = useCallback((scene: ThreeSceneName) => {
    setActiveScene(scene)
  }, [])

  return (
    <Deck slides={slides} onThreeSceneChange={handleSceneChange}>
      <ThreeCanvas />
      <threeTunnel.In>
        <ThreeSceneRenderer key={activeScene} sceneName={activeScene} />
      </threeTunnel.In>

      {/* ===== PAGE 0: HERO — FALCON ===== */}
      <Slide index={0}>
        <Flex direction="col" align="center" justify="center" gap={6} style={{ height: '100%', textAlign: 'center' }}>
          <img
            src="/falcon-logo.jpg"
            alt="Aegis Falcon"
            style={{
              width: '200px',
              height: 'auto',
              filter: 'drop-shadow(0 0 40px rgba(204,120,92,0.3))',
              marginBottom: 8,
            }}
          />
          <Heading size="xl" weight="bold" serif>Aegis</Heading>
          <Text size="lg" color="soft" style={{ maxWidth: '65%' }}>
            A domain-agnostic enterprise agentic-AI platform
          </Text>
          <Flex gap={3}>
            <Badge variant="accent">Zero Trust</Badge>
            <Badge variant="teal">Explainable</Badge>
            <Badge variant="amber">Auditable</Badge>
          </Flex>
          <Text size="base" color="muted" style={{ fontStyle: 'italic' }}>
            Team Revo · Autonomy you can audit.
          </Text>
        </Flex>
      </Slide>

      {/* ===== PAGE 1: LIVE METRICS & SIGNALS ===== */}
      <Slide index={1}>
        <LiveMetrics />
      </Slide>

      {/* ===== PAGE 2: LIVE PIPELINE (React Flow) ===== */}
      <Slide index={2}>
        <Flex direction="col" gap={4} style={{ height: '100%', width: '100%' }}>
          <Flex align="center" justify="between" style={{ paddingLeft: 6 }}>
            <Heading size="lg" weight="bold" serif>Request Pipeline</Heading>
            <Badge variant="accent">Live</Badge>
          </Flex>
          <PipelineFlow />
        </Flex>
      </Slide>

      {/* ===== PAGE 3: FULL ARCHITECTURE (React Flow) ===== */}
      <Slide index={3}>
        <Flex direction="col" gap={4} style={{ height: '100%', width: '100%' }}>
          <Flex align="center" justify="between" style={{ paddingLeft: 6 }}>
            <Heading size="lg" weight="bold" serif>System Architecture</Heading>
            <Flex gap={2}>
              <Badge variant="teal">4 Layers</Badge>
              <Badge variant="ghost">18 Packages</Badge>
            </Flex>
          </Flex>
          <ArchitectureFlow />
        </Flex>
      </Slide>

      {/* ===== PAGE 4: LIVE AGENT CONSOLE ===== */}
      <Slide index={4}>
        <LiveConsole />
      </Slide>

      {/* ===== PAGE 5: THANK YOU ===== */}
      <Slide index={5}>
        <Flex direction="col" align="center" justify="center" gap={5} style={{ height: '100%', textAlign: 'center' }}>
          <Heading size="display" weight="bold" serif>Thank You</Heading>
          <Text size="lg" color="soft">Autonomy you can audit. Built by Team Revo.</Text>
          <Flex gap={3} style={{ marginTop: 8 }}>
            <Badge variant="accent">github.com/yrevash/aegis</Badge>
            <Badge variant="ghost">12 modules · 1,316 tests</Badge>
          </Flex>
          <Text size="sm" color="muted" mono>6 trust checkpoints · 3 run modes · No Docker</Text>
        </Flex>
      </Slide>
    </Deck>
  )
}