'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReactFlow, Background, Controls, type Node, type Edge, MarkerType, Position, useNodesState, useEdgesState } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const flowNodes: Node[] = [
  { id: 'input', type: 'default', position: { x: 60, y: 180 }, data: { label: 'Input Guard' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(204,120,92,0.3)', borderRadius: 8, width: 140, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
  { id: 'route', type: 'default', position: { x: 280, y: 50 }, data: { label: 'Router' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(232,165,90,0.3)', borderRadius: 8, width: 120, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
  { id: 'memory', type: 'default', position: { x: 280, y: 180 }, data: { label: 'Memory' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(93,184,166,0.3)', borderRadius: 8, width: 120, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
  { id: 'retrieval', type: 'default', position: { x: 280, y: 310 }, data: { label: 'Retrieval' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(204,120,92,0.3)', borderRadius: 8, width: 120, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
  { id: 'signal', type: 'default', position: { x: 480, y: 50 }, data: { label: 'ML Signal' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(93,184,166,0.3)', borderRadius: 8, width: 120, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
  { id: 'plan', type: 'default', position: { x: 480, y: 180 }, data: { label: 'Plan' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(232,165,90,0.3)', borderRadius: 8, width: 120, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
  { id: 'gate', type: 'default', position: { x: 480, y: 310 }, data: { label: 'Human Gate' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(204,120,92,0.5)', borderRadius: 8, width: 120, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
  { id: 'tools', type: 'default', position: { x: 680, y: 50 }, data: { label: 'Tools / MCP' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(232,165,90,0.3)', borderRadius: 8, width: 120, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
  { id: 'generate', type: 'default', position: { x: 680, y: 180 }, data: { label: 'Generate' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(93,184,166,0.3)', borderRadius: 8, width: 120, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
  { id: 'output', type: 'default', position: { x: 680, y: 310 }, data: { label: 'Output Guard' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(204,120,92,0.3)', borderRadius: 8, width: 120, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
  { id: 'audit', type: 'default', position: { x: 880, y: 180 }, data: { label: 'Audit Log' }, style: { background: '#1A1A1E', color: '#F0EDE8', border: '1px solid rgba(93,184,166,0.3)', borderRadius: 8, width: 120, textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600 } },
]

const flowEdges: Edge[] = [
  { id: 'e-input-route', source: 'input', target: 'route', animated: true, style: { stroke: 'rgba(204,120,92,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#CC785C' } },
  { id: 'e-input-memory', source: 'input', target: 'memory', animated: true, style: { stroke: 'rgba(93,184,166,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#5DB8A6' } },
  { id: 'e-input-retrieval', source: 'input', target: 'retrieval', animated: true, style: { stroke: 'rgba(204,120,92,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#CC785C' } },
  { id: 'e-route-signal', source: 'route', target: 'signal', animated: true, style: { stroke: 'rgba(232,165,90,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#E8A55A' } },
  { id: 'e-route-plan', source: 'route', target: 'plan', animated: true, style: { stroke: 'rgba(232,165,90,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#E8A55A' } },
  { id: 'e-memory-plan', source: 'memory', target: 'plan', animated: true, style: { stroke: 'rgba(93,184,166,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#5DB8A6' } },
  { id: 'e-retrieval-plan', source: 'retrieval', target: 'plan', animated: true, style: { stroke: 'rgba(204,120,92,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#CC785C' } },
  { id: 'e-signal-plan', source: 'signal', target: 'plan', animated: true, style: { stroke: 'rgba(93,184,166,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#5DB8A6' } },
  { id: 'e-plan-gate', source: 'plan', target: 'gate', animated: true, style: { stroke: 'rgba(204,120,92,0.5)', strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#CC785C' } },
  { id: 'e-gate-tools', source: 'gate', target: 'tools', animated: true, style: { stroke: 'rgba(232,165,90,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#E8A55A' } },
  { id: 'e-tools-generate', source: 'tools', target: 'generate', animated: true, style: { stroke: 'rgba(93,184,166,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#5DB8A6' } },
  { id: 'e-generate-output', source: 'generate', target: 'output', animated: true, style: { stroke: 'rgba(204,120,92,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#CC785C' } },
  { id: 'e-output-audit', source: 'output', target: 'audit', animated: true, style: { stroke: 'rgba(93,184,166,0.4)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#5DB8A6' } },
]

export function PipelineFlow() {
  const [nodes] = useNodesState(flowNodes)
  const [edges] = useEdgesState(flowEdges)

  const [pulseNode, setPulseNode] = useState(0)
  const nodeOrder = flowNodes.map(n => n.id)

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseNode(prev => (prev + 1) % nodeOrder.length)
    }, 800)
    return () => clearInterval(timer)
  }, [])

  const nodesWithPulse = useMemo(() =>
    nodes.map((node, i) => ({
      ...node,
      style: {
        ...node.style,
        boxShadow: i === pulseNode
          ? '0 0 16px rgba(204,120,92,0.3)'
          : 'none',
        transition: 'box-shadow 0.4s',
        borderColor: i === pulseNode
          ? 'rgba(204,120,92,0.6)'
          : (node.style as Record<string, string>).border,
      },
    })),
    [nodes, pulseNode]
  )

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodesWithPulse}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
        style={{ background: 'transparent' }}
      >
        <Background color="rgba(240,237,232,0.03)" gap={20} />
        <Controls
          showZoom={false}
          showFitView={false}
          style={{ background: '#141417', border: '1px solid rgba(240,237,232,0.08)', borderRadius: 8 }}
        />
      </ReactFlow>
    </div>
  )
}