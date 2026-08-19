'use client'

import { useMemo } from 'react'
import { ReactFlow, MarkerType, type Edge, type Node } from '@xyflow/react'
import { nodeTypes, STATIC_FLOW_PROPS, type FlowNodeData } from './FlowNode'

type N = Node<FlowNodeData>

const NODES: N[] = [
  { id: 'browser', type: 'aegis', position: { x: 150, y: 0 }, data: { label: 'Browser', sub: 'HTTPS · JWT · SSE', tone: 'quiet', width: 180 } },
  { id: 'l1', type: 'aegis', position: { x: 150, y: 84 }, data: { label: '1 · Console', sub: 'web/ · Next.js · React', tone: 'accent', width: 180 } },
  { id: 'l2', type: 'aegis', position: { x: 150, y: 168 }, data: { label: '2 · Composition root', sub: 'backend/src/app · FastAPI', tone: 'accent', width: 180 } },
  { id: 'l3', type: 'aegis', position: { x: 150, y: 252 }, data: { label: '3 · Importable core', sub: 'aegis/src/aegis · 18 packages', tone: 'teal', width: 180 } },
  { id: 'l4', type: 'aegis', position: { x: 150, y: 336 }, data: { label: '4 · Stores and sinks', sub: 'Postgres · Neo4j · Redis', tone: 'teal', width: 180 } },
  { id: 'adapter', type: 'aegis', position: { x: 452, y: 258 }, data: { label: 'Domain adapter', sub: 'app/adapter/ · 10 pieces', tone: 'amber', dashed: true, width: 170 } },
]

const arrow = { type: MarkerType.ArrowClosed, width: 13, height: 13, color: 'rgba(240,237,232,0.34)' }

const EDGES: Edge[] = [
  { id: 'b-l1', source: 'browser', target: 'l1', label: 'fetch + SSE' },
  { id: 'l1-l2', source: 'l1', target: 'l2', label: 'REST' },
  { id: 'l2-l3', source: 'l2', target: 'l3', label: 'imports · injected deps' },
  { id: 'l3-l4', source: 'l3', target: 'l4', label: 'async drivers' },
].map((e) => ({
  ...e,
  type: 'smoothstep',
  markerEnd: arrow,
  style: { stroke: 'rgba(240,237,232,0.2)', strokeWidth: 1.2 },
  labelStyle: { fill: '#6b6760', fontSize: 9.5, fontFamily: 'var(--font-geist-mono), monospace' },
  labelBgStyle: { fill: '#0d0d0f' },
  labelBgPadding: [4, 2] as [number, number],
}))

EDGES.push({
  id: 'adapter-l2',
  source: 'adapter',
  target: 'l2',
  type: 'smoothstep',
  animated: true,
  markerEnd: arrow,
  style: { stroke: 'rgba(232,165,90,0.42)', strokeWidth: 1.2, strokeDasharray: '4 4' },
  // No edge label here: it overlapped the composition-root node, and the
  // panel beside the diagram already says what this seam is.
})

/**
 * The four-layer architecture. React Flow earns its place here because the
 * graph branches: the adapter enters at layer 2 while the main spine runs
 * top to bottom.
 */
export function ArchitectureFlow() {
  const nodes = useMemo(() => NODES, [])
  const edges = useMemo(() => EDGES, [])

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.09 }}
        {...STATIC_FLOW_PROPS}
      />
    </div>
  )
}
