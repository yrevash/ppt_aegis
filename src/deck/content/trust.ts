/** The six checkpoints between the model and a real action. */

export interface Checkpoint {
  n: string
  name: string
  mechanism: string
  /** What an auditor can point at afterwards. */
  evidence: string
}

export const TRUST_STACK: Checkpoint[] = [
  {
    n: '01',
    name: 'Input rails',
    mechanism: 'Injection classification, PII, schema, topical scope. Fails closed.',
    evidence: 'Per-layer pass or block record',
  },
  {
    n: '02',
    name: 'Retrieval',
    mechanism: 'Vector, graph and BM25 fused via RRF, then reranked.',
    evidence: 'Every claim carries its citation',
  },
  {
    n: '03',
    name: 'Signal',
    mechanism: 'Calibrated conformal interval plus SHAP drivers.',
    evidence: 'Interval and driver list on the run',
  },
  {
    n: '04',
    name: 'Human gate',
    mechanism: 'Fires on the tool risk tier, never on model confidence.',
    evidence: 'Named approver and timestamp',
  },
  {
    n: '05',
    name: 'Governance',
    mechanism: 'Budget enforced before spend. Postgres row-level security.',
    evidence: 'Usage ledger row per call',
  },
  {
    n: '06',
    name: 'Audit',
    mechanism: 'OpenTelemetry trace plus an append-only audit row.',
    evidence: 'Replayable end-to-end trace',
  },
]
