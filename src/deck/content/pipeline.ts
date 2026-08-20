/**
 * The request path, verbatim from the Aegis README:
 *
 *   POST /query -> guard_input -> route -> recall_memory -> retrieve ->
 *   ml_predict -> plan -> gate -> (approval interrupt) -> act -> reflect ->
 *   generate -> guard_output -> persist_memory
 */

export type StageKind = 'rail' | 'think' | 'knowledge' | 'gate' | 'act'

export interface PipelineStage {
  id: string
  label: string
  kind: StageKind
  module: string
  detail: string
}

export const PIPELINE: PipelineStage[] = [
  { id: 'guard_input', label: 'guard_input', kind: 'rail', module: 'Guardrails', detail: 'Injection, PII, schema and topical scope. Fails closed.' },
  { id: 'route', label: 'route', kind: 'think', module: 'Router', detail: 'Supervisor picks the specialist for this turn.' },
  { id: 'recall_memory', label: 'recall_memory', kind: 'knowledge', module: 'Memory', detail: 'Episodic, semantic and procedural recall, scoped to the tenant.' },
  { id: 'retrieve', label: 'retrieve', kind: 'knowledge', module: 'Retrieval', detail: 'Vector, graph and BM25 fused via RRF, then reranked.' },
  { id: 'ml_predict', label: 'ml_predict', kind: 'think', module: 'Signal', detail: 'Prediction plus conformal interval and SHAP drivers.' },
  { id: 'plan', label: 'plan', kind: 'think', module: 'Router', detail: 'Evidence becomes a plan of typed tool calls.' },
  { id: 'gate', label: 'gate', kind: 'gate', module: 'Tools', detail: 'Human approval, fired by the tool risk tier. The run checkpoints here.' },
  { id: 'act', label: 'act', kind: 'act', module: 'Tools', detail: 'Typed, idempotent, reversible, audited domain actions.' },
  { id: 'reflect', label: 'reflect', kind: 'think', module: 'Router', detail: 'Reconcile results against the plan.' },
  { id: 'generate', label: 'generate', kind: 'think', module: 'Gateway', detail: 'The answer, with every claim cited.' },
  { id: 'guard_output', label: 'guard_output', kind: 'rail', module: 'Guardrails', detail: 'Output rails before a single token reaches the user.' },
  { id: 'persist_memory', label: 'persist_memory', kind: 'knowledge', module: 'Memory', detail: 'Durable facts written back, scoped and bitemporal.' },
]

export const STAGE_TONE: Record<StageKind, 'accent' | 'teal' | 'amber'> = {
  rail: 'teal',
  think: 'accent',
  knowledge: 'accent',
  gate: 'amber',
  act: 'amber',
}
