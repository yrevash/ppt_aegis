/**
 * The rails, as declared in `aegis/src/aegis/guardrails/pipeline.py`.
 * Names are the ones the pipeline reports, so a slide and a blocked-run record
 * use the same vocabulary.
 */

export interface Rail {
  id: string
  name: string
  note: string
}

export const INPUT_RAILS: Rail[] = [
  { id: 'input_schema', name: 'Schema and format', note: 'Shape and size before anything reads the content' },
  { id: 'denylist', name: 'Denied terms and screened patterns', note: 'Cheap deterministic screen, runs first' },
  { id: 'pii', name: 'PII detection', note: 'Regex and Presidio detectors' },
  { id: 'injection', name: 'Prompt injection', note: 'Classifier verdict, fails closed when unavailable' },
  { id: 'content_safety', name: 'Content safety', note: 'Category checks on the incoming turn' },
  { id: 'topical', name: 'Topical', note: 'Is this even in scope for the deployment' },
]

export const OUTPUT_RAILS: Rail[] = [
  { id: 'output_schema', name: 'Answer format and leak markers', note: 'Shape, length, and prompt-leak markers' },
  { id: 'grounding', name: 'Grounding', note: 'Is the answer supported by what was retrieved' },
  { id: 'custom', name: 'Custom rails', note: 'Per-deployment additions' },
]
