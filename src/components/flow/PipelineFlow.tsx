'use client'

import { useMemo } from 'react'
import { ReactFlow, MarkerType, type Edge, type Node } from '@xyflow/react'
import { PIPELINE, STAGE_TONE } from '@/deck/content/pipeline'
import { nodeTypes, STATIC_FLOW_PROPS } from './FlowNode'

/**
 * The twelve stages as a graph that snakes across two rows, with the gate
 * pulled out below the spine so the interrupt reads as a branch rather than
 * as one box among twelve.
 */

const COLS = 6
const COL_W = 158
const ROW_H = 190

const ARROW = { type: MarkerType.ArrowClosed, width: 11, height: 11, color: 'rgba(240, 237, 232, 0.34)' }

function position(i: number): { x: number; y: number } {
  const row = Math.floor(i / COLS)
  const col = i % COLS
  // Second row runs right to left, so the path folds instead of jumping back.
  const x = row % 2 === 0 ? col * COL_W : (COLS - 1 - col) * COL_W
  return { x, y: row * ROW_H }
}

export function PipelineFlow({ revealed }: { revealed: number }) {
  const nodes = useMemo<Node[]>(
    () =>
      PIPELINE.map((stage, i) => {
        const lit = i < revealed
        const tone = STAGE_TONE[stage.kind]
        const pos = position(i)
        return {
          id: stage.id,
          type: 'aegis',
          position: pos,
          data: {
            label: stage.label,
            sub: stage.module,
            tone: lit ? tone : 'quiet',
            width: 132,
            spaced: true,
          },
          style: {
            opacity: lit ? 1 : 0.26,
            transition: 'opacity 380ms cubic-bezier(0.22, 1, 0.36, 1)',
          },
          selectable: false,
          draggable: false,
        }
      }),
    [revealed],
  )

  const edges = useMemo<Edge[]>(() => {
    const out: Edge[] = []
    for (let i = 0; i < PIPELINE.length - 1; i++) {
      const from = PIPELINE[i]
      const to = PIPELINE[i + 1]
      const lit = i + 1 < revealed
      const rowFrom = Math.floor(i / COLS)
      const rowTo = Math.floor((i + 1) / COLS)
      const wraps = rowFrom !== rowTo
      const rightward = rowFrom % 2 === 0

      out.push({
        id: `${from.id}-${to.id}`,
        source: from.id,
        target: to.id,
        // On the right-to-left row the handles flip, otherwise every edge
        // would loop around the node it is trying to reach.
        sourceHandle: wraps ? 'out-b' : rightward ? 'out-r' : 'out-l',
        targetHandle: wraps ? 'in-t' : rightward ? 'in-l' : 'in-r',
        type: 'smoothstep',
        animated: lit,
        markerEnd: ARROW,
        style: {
          stroke: lit ? 'rgba(204, 120, 92, 0.5)' : 'rgba(240, 237, 232, 0.12)',
          strokeWidth: 1.3,
        },
      })
    }
    return out
  }, [revealed])

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0 }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.08 }} {...STATIC_FLOW_PROPS} />
    </div>
  )
}
