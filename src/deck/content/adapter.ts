/**
 * Ten pieces: eight modules plus two content directories.
 * `__init__.py` is not a piece, it is the registry, and
 * `backend/tests/adapter/test_piece_manifest.py` counts what is on disk and
 * fails if any document disagrees.
 */

export interface AdapterPiece {
  n: number
  file: string
  defines: string
}

export const ADAPTER_PIECES: AdapterPiece[] = [
  { n: 1, file: 'schema.py', defines: 'Entities and enums, the shared vocabulary' },
  { n: 2, file: 'ml_spec.py', defines: 'FEATURES, TARGET, and the prediction narrative' },
  { n: 3, file: 'generator.py', defines: 'Synthetic records: procedural, LLM, templated fallback' },
  { n: 4, file: 'tools.py', defines: 'Domain actions: typed, idempotent, reversible, risk-tiered' },
  { n: 5, file: 'personas.py', defines: 'Who is served: data scope and tool allowlist' },
  { n: 6, file: 'prompts.py', defines: 'The system prompt per persona' },
  { n: 7, file: 'memory_spec.py', defines: 'What counts as a durable fact, and its scope' },
  { n: 8, file: 'roster.py', defines: 'Which specialists the supervisor may route to' },
  { n: 9, file: 'corpus/', defines: 'Seed knowledge documents' },
  { n: 10, file: 'skills/', defines: 'Procedural how-to-act playbooks' },
]
