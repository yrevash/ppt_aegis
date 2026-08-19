'use client'

import { useEffect, useState, useRef } from 'react'
import { Heading } from '@/engine/ui/Heading'
import { Text } from '@/engine/ui/Text'
import { Card } from '@/engine/ui/Card'
import { Flex } from '@/engine/ui/Flex'
import { Badge } from '@/engine/ui/Badge'

function Metric({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setInterval(() => setV(value + (Math.random() - 0.5) * value * 0.1), 2000)
    return () => clearInterval(t)
  }, [value])
  return (
    <Card p={4} variant="overlay">
      <Flex direction="col" align="center" gap={2}>
        <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, fontFamily: 'var(--font-geist-mono)', color }}>
          {v.toFixed(0)}{unit}
        </span>
        <Text size="sm" color="muted" tracking="wide" uppercase>{label}</Text>
      </Flex>
    </Card>
  )
}

function Sparkline({ color, height = 40 }: { color: string; height?: number }) {
  // Deterministic seed data — no Math.random() for SSR stability
  const initialPoints = [0.42, 0.58, 0.31, 0.67, 0.45, 0.72, 0.39, 0.55, 0.63, 0.48, 0.51, 0.66, 0.44, 0.59, 0.37, 0.61, 0.43, 0.54, 0.68, 0.41]

  const [points, setPoints] = useState<number[]>(initialPoints)

  useEffect(() => {
    const t = setInterval(() => {
      setPoints(prev => [...prev.slice(1), 0.25 + Math.random() * 0.5])
    }, 400)
    return () => clearInterval(t)
  }, [])

  const maxH = height - 4
  const path = points.map((p, i) => `${(i / (points.length - 1)) * 100},${maxH - p * maxH}`).join(' ')

  // Use useMemo to prevent re-render issues
  const pathStr = path

  return (
    <svg width="100%" height={height} style={{ display: 'block' }} data-stable={pathStr.substring(0, 20)}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pathStr}
        style={{ opacity: 0.6 }}
      />
    </svg>
  )
}

export function LiveMetrics() {
  return (
    <Flex direction="col" gap={5} style={{ height: '100%', width: '100%', maxWidth: 900 }}>
      <Flex align="center" justify="between">
        <Heading size="lg" weight="bold" serif>System Activity</Heading>
        <Badge variant="accent">Live</Badge>
      </Flex>

      <Flex gap={4}>
        <Metric label="Requests/Min" value={342} unit="" color="#CC785C" />
        <Metric label="Avg Latency" value={142} unit="ms" color="#5DB8A6" />
        <Metric label="Guardrails Pass" value={99.7} unit="%" color="#E8A55A" />
        <Metric label="Active Tenants" value={24} unit="" color="#A09B93" />
      </Flex>

      <Flex gap={4} style={{ flex: 1 }}>
        <Card p={4} variant="overlay" style={{ flex: 1 }}>
          <Flex direction="col" gap={3}>
            <Flex align="center" justify="between">
              <Text size="sm" color="muted" tracking="wide" uppercase>Request Throughput</Text>
              <Text size="sm" color="accent" mono>342 req/min</Text>
            </Flex>
            <Sparkline color="#CC785C" height={60} />
          </Flex>
        </Card>
        <Card p={4} variant="overlay" style={{ flex: 1 }}>
          <Flex direction="col" gap={3}>
            <Flex align="center" justify="between">
              <Text size="sm" color="muted" tracking="wide" uppercase>Guardrail Pass Rate</Text>
              <Text size="sm" color="teal" mono>99.7%</Text>
            </Flex>
            <Sparkline color="#5DB8A6" height={60} />
          </Flex>
        </Card>
      </Flex>

      <Flex gap={4}>
        <Card p={4} variant="overlay" style={{ flex: 1 }}>
          <Flex direction="col" gap={2}>
            <Text size="sm" color="muted" tracking="wide" uppercase>Active Nodes</Text>
            <Flex gap={2} wrap>
              {['Gateway', 'Router', 'Memory', 'Retrieval', 'Signal', 'Guardrails', 'Tools'].map(n => (
                <Badge key={n} variant={n === 'Gateway' || n === 'Router' || n === 'Retrieval' || n === 'Tools' ? 'teal' : 'ghost'}>{n}</Badge>
              ))}
            </Flex>
          </Flex>
        </Card>
        <Card p={4} variant="overlay" style={{ flex: 1 }}>
          <Flex direction="col" gap={2}>
            <Text size="sm" color="muted" tracking="wide" uppercase>Recent Actions</Text>
            <Flex direction="col" gap={1}>
              {['diversify_supplier_pool ✓', 'adjust_safety_stock ✓', 'reroute_shipment ⏳'].map((a, i) => (
                <Text key={i} size="sm" color="ink" mono>{a}</Text>
              ))}
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  )
}