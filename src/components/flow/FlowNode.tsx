'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'

export interface FlowNodeData extends Record<string, unknown> {
  label: string
  sub?: string
  tone?: 'accent' | 'teal' | 'amber' | 'quiet'
  /** Renders the node as the dashed adapter seam rather than a solid box. */
  dashed?: boolean
  width?: number
}

const tones = {
  accent: { border: 'var(--accent-edge)', bg: 'var(--accent-dim)', fg: 'var(--accent)' },
  teal: { border: 'var(--teal-edge)', bg: 'var(--teal-dim)', fg: 'var(--teal)' },
  amber: { border: 'var(--amber-edge)', bg: 'var(--amber-dim)', fg: 'var(--amber)' },
  quiet: { border: 'var(--hairline-strong)', bg: 'rgba(20, 20, 23, 0.9)', fg: 'var(--ink-soft)' },
}

/**
 * A deck-styled React Flow node. React Flow's default node is a white rounded
 * rectangle with a border, which would read as a foreign object on this
 * surface, so none of the default styling is kept.
 */
export function FlowNode({ data }: NodeProps) {
  const d = data as FlowNodeData
  const tone = tones[d.tone ?? 'quiet']

  return (
    <div
      style={{
        width: d.width ?? 132,
        padding: '9px 12px',
        borderRadius: 'var(--r-sm)',
        border: `1px ${d.dashed ? 'dashed' : 'solid'} ${tone.border}`,
        background: tone.bg,
        textAlign: 'left',
      }}
    >
      <Handle id="in-l" type="target" position={Position.Left} isConnectable={false} />
      <Handle id="in-r" type="target" position={Position.Right} isConnectable={false} />
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 1.3,
          color: d.tone === 'quiet' ? 'var(--ink)' : tone.fg,
        }}
      >
        {d.label}
      </div>
      {d.sub ? (
        <div
          style={{
            marginTop: 3,
            fontSize: 9.5,
            lineHeight: 1.35,
            fontFamily: 'var(--font-geist-mono), monospace',
            color: 'var(--ink-muted)',
          }}
        >
          {d.sub}
        </div>
      ) : null}
      <Handle id="out-r" type="source" position={Position.Right} isConnectable={false} />
      <Handle id="out-l" type="source" position={Position.Left} isConnectable={false} />
    </div>
  )
}

export const nodeTypes = { aegis: FlowNode }

/** Interaction is off everywhere: these are diagrams, not editable canvases. */
export const STATIC_FLOW_PROPS = {
  nodesDraggable: false,
  nodesConnectable: false,
  elementsSelectable: false,
  panOnDrag: false,
  panOnScroll: false,
  zoomOnScroll: false,
  zoomOnPinch: false,
  zoomOnDoubleClick: false,
  preventScrolling: false,
  proOptions: { hideAttribution: true },
} as const
