'use client'

import { useEffect, useMemo, useState } from 'react'
import { ReactFlow, Background, type Node, type Edge, MarkerType, useNodesState, useEdgesState } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const archNodes: Node[] = [
  { id: 'browser', type: 'default', position: { x: 50, y: 40 }, data: { label: 'Browser' }, style: nodeStyle('rgba(204,120,92,0.25)') },
  { id: 'console', type: 'default', position: { x: 50, y: 160 }, data: { label: 'Next.js Console' }, style: nodeStyle('rgba(204,120,92,0.2)') },
  { id: 'api', type: 'default', position: { x: 250, y: 60 }, data: { label: 'FastAPI Backend' }, style: nodeStyle('rgba(232,165,90,0.25)') },
  { id: 'gateway', type: 'default', position: { x: 250, y: 180 }, data: { label: 'Aegis Gateway' }, style: nodeStyle('rgba(232,165,90,0.2)') },
  { id: 'guardrails', type: 'default', position: { x: 450, y: 30 }, data: { label: 'Guardrails' }, style: nodeStyle('rgba(93,184,166,0.25)') },
  { id: 'router', type: 'default', position: { x: 450, y: 120 }, data: { label: 'Router' }, style: nodeStyle('rgba(93,184,166,0.2)') },
  { id: 'retrieval', type: 'default', position: { x: 450, y: 210 }, data: { label: 'Retrieval' }, style: nodeStyle('rgba(93,184,166,0.2)') },
  { id: 'memory', type: 'default', position: { x: 650, y: 60 }, data: { label: 'Memory' }, style: nodeStyle('rgba(204,120,92,0.2)') },
  { id: 'signal', type: 'default', position: { x: 650, y: 160 }, data: { label: 'ML Signal' }, style: nodeStyle('rgba(204,120,92,0.2)') },
  { id: 'tools', type: 'default', position: { x: 850, y: 60 }, data: { label: 'Tools / MCP' }, style: nodeStyle('rgba(232,165,90,0.25)') },
  { id: 'postgres', type: 'default', position: { x: 850, y: 180 }, data: { label: 'Postgres' }, style: nodeStyle('rgba(93,184,166,0.2)', true) },
  { id: 'neo4j', type: 'default', position: { x: 850, y: 260 }, data: { label: 'Neo4j' }, style: nodeStyle('rgba(93,184,166,0.2)', true) },
  { id: 'redis', type: 'default', position: { x: 650, y: 260 }, data: { label: 'Redis' }, style: nodeStyle('rgba(204,120,92,0.2)', true) },
  { id: 'phoenix', type: 'default', position: { x: 1050, y: 160 }, data: { label: 'Arize Phoenix' }, style: nodeStyle('rgba(232,165,90,0.15)', true) },
]

function nodeStyle(borderColor: string, small = false) {
  return {
    background: '#1A1A1E',
    color: '#F0EDE8',
    border: `1px solid ${borderColor}`,
    borderRadius: 10,
    width: small ? 110 : 140,
    textAlign: 'center' as const,
    padding: small ? '8px 12px' : '12px 16px',
    fontSize: small ? 11 : 13,
    fontWeight: 600,
    fontFamily: 'var(--font-geist-sans)',
  }
}

const archEdges: Edge[] = [
  { id: 'e-browser-console', source: 'browser', target: 'console', animated: true, style: { stroke: 'rgba(204,120,92,0.25)', strokeWidth: 2 }, markerEnd: marker('#CC785C') },
  { id: 'e-console-api', source: 'console', target: 'api', animated: true, style: { stroke: 'rgba(204,120,92,0.25)', strokeWidth: 2 }, markerEnd: marker('#CC785C') },
  { id: 'e-api-gateway', source: 'api', target: 'gateway', animated: true, style: { stroke: 'rgba(232,165,90,0.3)', strokeWidth: 2.5 }, markerEnd: marker('#E8A55A') },
  { id: 'e-gateway-guardrails', source: 'gateway', target: 'guardrails', animated: true, style: { stroke: 'rgba(93,184,166,0.25)', strokeWidth: 2 }, markerEnd: marker('#5DB8A6') },
  { id: 'e-gateway-router', source: 'gateway', target: 'router', animated: true, style: { stroke: 'rgba(93,184,166,0.3)', strokeWidth: 2.5 }, markerEnd: marker('#5DB8A6') },
  { id: 'e-router-retrieval', source: 'router', target: 'retrieval', animated: true, style: { stroke: 'rgba(93,184,166,0.2)', strokeWidth: 2 }, markerEnd: marker('#5DB8A6') },
  { id: 'e-router-memory', source: 'router', target: 'memory', animated: true, style: { stroke: 'rgba(204,120,92,0.2)', strokeWidth: 2 }, markerEnd: marker('#CC785C') },
  { id: 'e-router-signal', source: 'router', target: 'signal', animated: true, style: { stroke: 'rgba(204,120,92,0.25)', strokeWidth: 2 }, markerEnd: marker('#CC785C') },
  { id: 'e-signal-tools', source: 'signal', target: 'tools', animated: true, style: { stroke: 'rgba(232,165,90,0.25)', strokeWidth: 2 }, markerEnd: marker('#E8A55A') },
  { id: 'e-retrieval-neo4j', source: 'retrieval', target: 'neo4j', animated: true, style: { stroke: 'rgba(93,184,166,0.2)', strokeWidth: 1.5, strokeDasharray: '5 5' }, markerEnd: marker('#5DB8A6') },
  { id: 'e-memory-postgres', source: 'memory', target: 'postgres', animated: true, style: { stroke: 'rgba(93,184,166,0.2)', strokeWidth: 1.5, strokeDasharray: '5 5' }, markerEnd: marker('#5DB8A6') },
  { id: 'e-memory-redis', source: 'memory', target: 'redis', animated: true, style: { stroke: 'rgba(204,120,92,0.2)', strokeWidth: 1.5, strokeDasharray: '5 5' }, markerEnd: marker('#CC785C') },
  { id: 'e-tools-phoenix', source: 'tools', target: 'phoenix', animated: true, style: { stroke: 'rgba(232,165,90,0.15)', strokeWidth: 1.5, strokeDasharray: '5 5' }, markerEnd: marker('#E8A55A') },
]

function marker(color: string) {
  return { type: MarkerType.ArrowClosed, color }
}

export function ArchitectureFlow() {
  const [nodes] = useNodesState(archNodes)
  const [edges] = useEdgesState(archEdges)
  const [activeEdges, setActiveEdges] = useState<Set<string>>(new Set())

  useEffect(() => {
    const edgeIds = archEdges.map(e => e.id)
    let idx = 0
    const timer = setInterval(() => {
      const batch = new Set<string>()
      for (let i = 0; i < 3; i++) {
        batch.add(edgeIds[(idx + i) % edgeIds.length])
      }
      setActiveEdges(batch)
      idx = (idx + 1) % edgeIds.length
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  const edgesWithPulse = useMemo(() =>
    edges.map(edge => ({
      ...edge,
      style: {
        ...edge.style,
        strokeWidth: activeEdges.has(edge.id) ? 3 : 2,
        opacity: activeEdges.has(edge.id) ? 0.7 : 0.3,
        transition: 'stroke-width 0.4s, opacity 0.4s',
      },
    })),
    [edges, activeEdges]
  )

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edgesWithPulse}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
        style={{ background: 'transparent' }}
      >
        <Background color="rgba(240,237,232,0.02)" gap={25} />
      </ReactFlow>
    </div>
  )
}