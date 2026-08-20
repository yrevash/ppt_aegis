'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'

export interface FlowNodeData extends Record<string, unknown> {
  label: string
  sub?: string
  tone?: 'accent' | 'teal' | 'amber' | 'quiet'
  dashed?: boolean
  width?: number
  /** Compact nodes tighten padding. */
  small?: boolean
  /** Opens a gap at the vertical centre so an incoming arrow clears the text. */
  spaced?: boolean
}

export interface FrameNodeData extends Record<string, unknown> {
  label: string
  width: number
  height: number
}

const tones = {
  accent: { border: 'var(--accent-edge)', bg: 'rgba(204, 120, 92, 0.13)', fg: 'var(--accent)' },
  teal: { border: 'var(--teal-edge)', bg: 'rgba(93, 184, 166, 0.11)', fg: 'var(--teal)' },
  amber: { border: 'var(--amber-edge)', bg: 'rgba(232, 165, 90, 0.11)', fg: 'var(--amber)' },
  quiet: { border: 'var(--hairline-strong)', bg: 'rgba(22, 22, 26, 0.92)', fg: 'var(--ink)' },
}

/** A deck-styled node. None of React Flow's default chrome is kept. */
export function FlowNode({ data }: NodeProps) {
  const d = data as FlowNodeData
  const tone = tones[d.tone ?? 'quiet']

  return (
    <div
      style={{
        width: d.width ?? 128,
        padding: d.spaced ? '13px 12px' : d.small ? '7px 10px' : '9px 12px',
        borderRadius: 'var(--r-sm)',
        border: `1px ${d.dashed ? 'dashed' : 'solid'} ${tone.border}`,
        background: tone.bg,
        boxShadow: '0 1px 10px rgba(9, 8, 7, 0.5)',
      }}
    >
      <Handle id="in-l" type="target" position={Position.Left} isConnectable={false} />
      <Handle id="in-r" type="target" position={Position.Right} isConnectable={false} />
      <Handle id="in-t" type="target" position={Position.Top} isConnectable={false} />
      <Handle id="in-b" type="target" position={Position.Bottom} isConnectable={false} />

      <div
        style={{
          fontSize: d.small ? 11 : 12,
          fontWeight: 500,
          lineHeight: 1.25,
          color: d.tone && d.tone !== 'quiet' ? tone.fg : 'var(--ink)',
        }}
      >
        {d.label}
      </div>
      {d.sub ? (
        <div
          style={{
            marginTop: d.spaced ? 11 : 3,
            fontSize: 9,
            lineHeight: 1.3,
            fontFamily: 'var(--font-geist-mono), monospace',
            color: 'var(--ink-muted)',
          }}
        >
          {d.sub}
        </div>
      ) : null}

      <Handle id="out-r" type="source" position={Position.Right} isConnectable={false} />
      <Handle id="out-l" type="source" position={Position.Left} isConnectable={false} />
      <Handle id="out-t" type="source" position={Position.Top} isConnectable={false} />
      <Handle id="out-b" type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  )
}

/** A labelled container that groups child nodes, e.g. the importable core. */
export function FrameNode({ data }: NodeProps) {
  const d = data as FrameNodeData
  return (
    <div
      style={{
        width: d.width,
        height: d.height,
        borderRadius: 'var(--r-md)',
        border: '1px solid var(--hairline-strong)',
        background: 'rgba(240, 237, 232, 0.022)',
      }}
    >
      <Handle id="in-l" type="target" position={Position.Left} isConnectable={false} />
      <Handle id="out-r" type="source" position={Position.Right} isConnectable={false} />
      <span
        style={{
          position: 'absolute',
          top: -8,
          left: 12,
          padding: '0 7px',
          background: '#0d0d0f',
          fontSize: 9.5,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
        }}
      >
        {d.label}
      </span>
    </div>
  )
}

export const nodeTypes = { aegis: FlowNode, frame: FrameNode }

/** Diagrams, not editable canvases. */
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
