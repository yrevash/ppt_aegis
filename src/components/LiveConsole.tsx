'use client'

import { useEffect, useState, useRef } from 'react'
import { Heading } from '@/engine/ui/Heading'
import { Text } from '@/engine/ui/Text'
import { Badge } from '@/engine/ui/Badge'
import { Flex } from '@/engine/ui/Flex'
import { Card } from '@/engine/ui/Card'

interface LogLine {
  id: number
  type: 'system' | 'tool' | 'agent' | 'user' | 'result'
  text: string
  time: string
}

const script: LogLine[] = [
  { id: 1, type: 'system', text: '[console] Aegis Gateway initialized — model: claude-sonnet-4', time: '14:23:01' },
  { id: 2, type: 'system', text: '[console] Tenant: northwind · Budget: $12.50 remaining', time: '14:23:01' },
  { id: 3, type: 'user', text: '> Analyze the recent supply chain disruption and recommend countermeasures.', time: '14:23:05' },
  { id: 4, type: 'system', text: '[guardrails] Input passed 6/6 checks · no PII, no injection, schema valid', time: '14:23:06' },
  { id: 5, type: 'tool', text: '⟳ Router → specialist: supply_chain_analyst', time: '14:23:06' },
  { id: 6, type: 'tool', text: '⟳ Memory recall: 12 relevant episodes retrieved (234ms)', time: '14:23:07' },
  { id: 7, type: 'tool', text: '⟳ Retrieval: vector + graph + BM25 · 47 chunks · RRF rerank (1.2s)', time: '14:23:08' },
  { id: 8, type: 'tool', text: '⟳ ML Signal: conformal interval [0.72, 0.94] · SHAP top driver: port_congestion_risk', time: '14:23:09' },
  { id: 9, type: 'tool', text: '⟳ Plan generated — 3 actions, risk tier: medium', time: '14:23:10' },
  { id: 10, type: 'system', text: '[gate] ⚠ Human approval requested — risk tier: medium', time: '14:23:10' },
  { id: 11, type: 'system', text: '[gate] ✓ Approved by admin@northwind', time: '14:23:14' },
  { id: 12, type: 'tool', text: '⟳ Action 1/3: diversify_supplier_pool · idempotent ✓', time: '14:23:15' },
  { id: 13, type: 'tool', text: '⟳ Action 2/3: adjust_safety_stock · reversible ✓ · (890ms)', time: '14:23:16' },
  { id: 14, type: 'tool', text: '⟳ Action 3/3: schedule_reroute · audited ✓ · (1.1s)', time: '14:23:17' },
  { id: 15, type: 'agent', text: 'Analysis complete. Three countermeasures deployed. Full trace: trace-id-8f3a', time: '14:23:18' },
  { id: 16, type: 'system', text: '[audit] Run logged · 6 checkpoints passed · cost: $0.38', time: '14:23:18' },
]

const colorMap: Record<string, { fg: string; bg: string; prefix: string }> = {
  system: { fg: '#6B6760', bg: 'transparent', prefix: '' },
  tool: { fg: '#5DB8A6', bg: 'rgba(93,184,166,0.06)', prefix: '' },
  agent: { fg: '#E8A55A', bg: 'rgba(232,165,90,0.06)', prefix: '' },
  user: { fg: '#CC785C', bg: 'rgba(204,120,92,0.06)', prefix: '▸ ' },
  result: { fg: '#F0EDE8', bg: 'rgba(240,237,232,0.04)', prefix: '' },
}

export function LiveConsole() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= script.length) return prev
        return prev + 1
      })
    }, 600)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleLines])

  return (
    <Flex direction="col" gap={4} style={{ height: '100%', width: '100%', maxWidth: 900 }}>
      <Flex gap={3} align="center" justify="between">
        <Heading size="lg" weight="bold" serif>Live Agent Console</Heading>
        <Flex gap={2}>
          <Badge variant="accent">Live</Badge>
          <Badge variant="ghost">northwind tenant</Badge>
        </Flex>
      </Flex>

      <Card p={0} variant="overlay" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Console header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 16px', borderBottom: '1px solid rgba(240,237,232,0.06)',
          fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#6B6760',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#5DB8A6', boxShadow: '0 0 6px rgba(93,184,166,0.4)' }} />
          <span>Aegis v2.4 · Session active · Latency: 142ms</span>
        </div>

        {/* Console body */}
        <div ref={containerRef} style={{
          flex: 1, overflow: 'auto', padding: '14px 16px',
          fontFamily: 'var(--font-geist-mono)', fontSize: 12, lineHeight: 1.7,
        }}>
          {script.slice(0, visibleLines).map((line, i) => {
            const c = colorMap[line.type]
            const isNew = i === visibleLines - 1
            return (
              <div key={line.id} style={{
                padding: '3px 8px', marginBottom: 2, borderRadius: 4,
                background: c.bg, color: c.fg,
                opacity: isNew ? 1 : 0.75,
                transition: 'opacity 0.3s',
              }}>
                <span style={{ color: '#6B6760', marginRight: 8, fontSize: 10 }}>{line.time}</span>
                {c.prefix}{line.text}
                {isNew && <span style={{ marginLeft: 6, animation: 'blink 1s step-end infinite' }}>▌</span>}
              </div>
            )
          })}
        </div>

        {/* Trust checkpoints footer */}
        <div style={{
          display: 'flex', gap: 4, padding: '10px 16px',
          borderTop: '1px solid rgba(240,237,232,0.06)', justifyContent: 'center',
        }}>
          {['Input ✓', 'Retrieval ✓', 'ML Signal ✓', 'Human Gate ✓', 'Governance ✓', 'Audit ✓'].map((check, i) => (
            <span key={i} style={{
              fontSize: 10, fontFamily: 'var(--font-geist-mono)',
              color: visibleLines > 9 + i ? '#5DB872' : '#3D3D3A',
              background: visibleLines > 9 + i ? 'rgba(93,184,114,0.1)' : 'rgba(240,237,232,0.03)',
              padding: '3px 8px', borderRadius: 4,
              transition: 'all 0.5s',
            }}>
              {check}
            </span>
          ))}
        </div>
      </Card>

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </Flex>
  )
}