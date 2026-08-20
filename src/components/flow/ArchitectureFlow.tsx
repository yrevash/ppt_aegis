'use client'

import { useMemo } from 'react'
import { ReactFlow, MarkerType, type Edge, type Node } from '@xyflow/react'
import { nodeTypes, STATIC_FLOW_PROPS } from './FlowNode'

/**
 * The platform as a graph: a request enters on the left, crosses the core, and
 * lands in the stores on the right, with the domain adapter feeding the
 * composition root from below.
 *
 * The core is drawn as a labelled frame with its packages inside, because the
 * single most important architectural claim is that those packages are one
 * importable unit that never learns the domain.
 */

const F_X = 480
const F_Y = 10

const NODES: Node[] = [
  // The frame is declared before its children so React Flow can parent them.
  {
    id: 'core',
    type: 'frame',
    position: { x: F_X, y: F_Y },
    data: { label: 'Importable core · aegis/src/aegis', width: 452, height: 204 },
    selectable: false,
    draggable: false,
  },

  { id: 'browser', type: 'aegis', position: { x: 0, y: 120 }, data: { label: 'Browser', sub: 'JWT · SSE', tone: 'quiet', width: 106, small: true } },
  { id: 'console', type: 'aegis', position: { x: 146, y: 120 }, data: { label: 'Console', sub: 'web/ · Next.js', tone: 'accent', width: 118, small: true } },
  { id: 'api', type: 'aegis', position: { x: 306, y: 120 }, data: { label: 'FastAPI', sub: 'JWT · RBAC · tenant', tone: 'accent', width: 132, small: true } },

  // Core packages. Top row is the decision path, bottom row is what feeds it.
  { id: 'rails', type: 'aegis', parentId: 'core', extent: 'parent', position: { x: 16, y: 28 }, data: { label: 'Guardrails', tone: 'teal', width: 120, small: true } },
  { id: 'router', type: 'aegis', parentId: 'core', extent: 'parent', position: { x: 166, y: 28 }, data: { label: 'Router', tone: 'teal', width: 120, small: true } },
  { id: 'signal', type: 'aegis', parentId: 'core', extent: 'parent', position: { x: 316, y: 28 }, data: { label: 'Signal', tone: 'teal', width: 120, small: true } },
  { id: 'retrieval', type: 'aegis', parentId: 'core', extent: 'parent', position: { x: 16, y: 112 }, data: { label: 'Retrieval', tone: 'teal', width: 120, small: true } },
  { id: 'memory', type: 'aegis', parentId: 'core', extent: 'parent', position: { x: 166, y: 112 }, data: { label: 'Memory', tone: 'teal', width: 120, small: true } },
  { id: 'gateway', type: 'aegis', parentId: 'core', extent: 'parent', position: { x: 316, y: 112 }, data: { label: 'Gateway', tone: 'teal', width: 120, small: true } },

  { id: 'gate', type: 'aegis', position: { x: 980, y: 54 }, data: { label: 'Human gate', sub: 'by risk tier', tone: 'amber', width: 136, small: true } },
  { id: 'action', type: 'aegis', position: { x: 980, y: 136 }, data: { label: 'Domain action', sub: 'typed · reversible', tone: 'amber', width: 136, small: true } },

  { id: 'adapter', type: 'aegis', position: { x: 288, y: 252 }, data: { label: 'Domain adapter', sub: '10 pieces · the only seam', tone: 'amber', dashed: true, width: 172 } },

  // Stores sit directly under whichever package talks to them, so the edges
  // drop straight down instead of crossing each other.
  { id: 'neo4j', type: 'aegis', position: { x: 496, y: 252 }, data: { label: 'Neo4j', sub: 'graph', tone: 'quiet', width: 112, small: true } },
  { id: 'postgres', type: 'aegis', position: { x: 646, y: 252 }, data: { label: 'Postgres', sub: 'RLS · audit', tone: 'quiet', width: 112, small: true } },
  { id: 'redis', type: 'aegis', position: { x: 796, y: 252 }, data: { label: 'Redis', sub: 'cache', tone: 'quiet', width: 112, small: true } },
  { id: 'phoenix', type: 'aegis', position: { x: 946, y: 252 }, data: { label: 'Phoenix', sub: 'traces', tone: 'quiet', width: 112, small: true } },
]

const ARROW = { type: MarkerType.ArrowClosed, width: 11, height: 11, color: 'rgba(240, 237, 232, 0.38)' }

/** Handles are always explicit: left to defaults, React Flow loops the edges. */
function edge(id: string, source: string, sourceHandle: string, target: string, targetHandle: string, opts: Partial<Edge> = {}): Edge {
  return {
    id,
    source,
    sourceHandle,
    target,
    targetHandle,
    type: 'smoothstep',
    markerEnd: ARROW,
    style: { stroke: 'rgba(240, 237, 232, 0.2)', strokeWidth: 1.2 },
    ...opts,
  }
}

const SPINE = {
  animated: true,
  style: { stroke: 'rgba(204, 120, 92, 0.55)', strokeWidth: 1.5 },
  markerEnd: { ...ARROW, color: 'rgba(204, 120, 92, 0.65)' },
}

const GATED = {
  animated: true,
  style: { stroke: 'rgba(232, 165, 90, 0.55)', strokeWidth: 1.5 },
  markerEnd: { ...ARROW, color: 'rgba(232, 165, 90, 0.65)' },
}

const EDGES: Edge[] = [
  // The request spine, animated so direction of travel is unmistakable.
  edge('e1', 'browser', 'out-r', 'console', 'in-l', SPINE),
  edge('e2', 'console', 'out-r', 'api', 'in-l', SPINE),
  edge('e3', 'api', 'out-r', 'rails', 'in-l', SPINE),
  edge('e4', 'rails', 'out-r', 'router', 'in-l', SPINE),
  edge('e5', 'router', 'out-r', 'signal', 'in-l', SPINE),

  // What the decision path reads from.
  edge('e6', 'router', 'out-b', 'retrieval', 'in-t'),
  edge('e7', 'retrieval', 'out-r', 'memory', 'in-l'),
  edge('e8', 'memory', 'out-r', 'gateway', 'in-l'),

  // The gate, then the action. Amber wherever it appears in the deck.
  edge('e9', 'signal', 'out-r', 'gate', 'in-l', GATED),
  edge('e10', 'gate', 'out-b', 'action', 'in-t', GATED),

  edge('e11', 'retrieval', 'out-b', 'neo4j', 'in-t'),
  edge('e12', 'memory', 'out-b', 'postgres', 'in-t'),
  edge('e13', 'gateway', 'out-b', 'redis', 'in-t'),
  edge('e14', 'action', 'out-b', 'phoenix', 'in-t'),

  // The seam, entering the composition root from below.
  edge('e15', 'adapter', 'out-t', 'api', 'in-b', {
    animated: true,
    style: { stroke: 'rgba(232, 165, 90, 0.5)', strokeWidth: 1.3, strokeDasharray: '5 4' },
    markerEnd: { ...ARROW, color: 'rgba(232, 165, 90, 0.6)' },
  }),
]

export function ArchitectureFlow() {
  const nodes = useMemo(() => NODES, [])
  const edges = useMemo(() => EDGES, [])

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0 }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.06 }} {...STATIC_FLOW_PROPS} />
    </div>
  )
}
