/**
 * The Aegis module manifest.
 *
 * Mirrors `backend/src/app/capabilities.py` in the Aegis repository, which is
 * served publicly at `GET /platform/capabilities` and import-checked by
 * `tests/test_capabilities.py`. Each entry pairs the branded name with the
 * real technology underneath, which is the product's own rule: branding,
 * never hiding.
 *
 * Note the count. The Aegis README still says "the twelve modules"; the
 * manifest has carried fifteen since Voice, Vision and Forecast landed.
 */

export type ModuleCategory = 'runtime' | 'knowledge' | 'trust' | 'ops' | 'platform'
export type ModuleStatus = 'live' | 'optional'

export interface AegisModule {
  key: string
  name: string
  tech: string
  summary: string
  category: ModuleCategory
  modulePath: string
  status: ModuleStatus
}

export const CATEGORY_LABEL: Record<ModuleCategory, string> = {
  runtime: 'Runtime',
  knowledge: 'Knowledge',
  trust: 'Trust',
  ops: 'Operations',
  platform: 'Platform',
}

export const AEGIS_MODULES: AegisModule[] = [
  {
    key: 'gateway',
    name: 'Aegis Gateway',
    tech: 'LiteLLM',
    summary: 'Single model chokepoint: role routing, budgets, timeout, retry, usage ledger.',
    category: 'runtime',
    modulePath: 'app.core.llm',
    status: 'live',
  },
  {
    key: 'router',
    name: 'Aegis Router',
    tech: 'LangGraph',
    summary: 'Multi-agent supervisor that routes a turn to the right specialist.',
    category: 'runtime',
    modulePath: 'app.agent.router',
    status: 'live',
  },
  {
    key: 'voice',
    name: 'Aegis Voice',
    tech: 'hosted Whisper via LiteLLM',
    summary: 'Speech to text, chunked on silence, guarded by the full text rails.',
    category: 'runtime',
    modulePath: 'app.voice',
    status: 'live',
  },
  {
    key: 'memory',
    name: 'Aegis Memory',
    tech: 'Postgres + embedded Chroma',
    summary: 'Episodic, semantic and procedural recall. Bitemporal and consolidated.',
    category: 'knowledge',
    modulePath: 'app.memory',
    status: 'live',
  },
  {
    key: 'cache',
    name: 'Aegis Cache',
    tech: 'Redis',
    summary: 'Semantic response cache keyed on query meaning, not exact bytes.',
    category: 'knowledge',
    modulePath: 'app.retrieval.cache',
    status: 'live',
  },
  {
    key: 'retrieval',
    name: 'Aegis Retrieval',
    tech: 'Neo4j/LightRAG + NanoVectorDB',
    summary: 'Hybrid RAG: vector, graph and BM25 fused via RRF, then LLM rerank.',
    category: 'knowledge',
    modulePath: 'app.retrieval.pipeline',
    status: 'live',
  },
  {
    key: 'signal',
    name: 'Aegis Signal',
    tech: 'XGBoost + MAPIE + SHAP',
    summary: 'Ensemble with calibrated conformal intervals and SHAP drivers.',
    category: 'trust',
    modulePath: 'app.ml.model',
    status: 'live',
  },
  {
    key: 'guardrails',
    name: 'Aegis Guardrails',
    tech: 'programmatic + NeMo Colang',
    summary: 'Input and output rails: injection, PII, schema and content checks.',
    category: 'trust',
    modulePath: 'app.guardrails.rails',
    status: 'live',
  },
  {
    key: 'evals',
    name: 'Aegis Evals',
    tech: 'RAGAS-style proxies + LLM judge',
    summary: 'Trace-level and answer evaluation of each run.',
    category: 'trust',
    modulePath: 'app.eval.harness',
    status: 'live',
  },
  {
    key: 'vision',
    name: 'Aegis Vision',
    tech: 'Llama-3.2-90B-Vision + Presidio',
    summary: 'Image understanding with the injection screen ahead of the model.',
    category: 'trust',
    modulePath: 'app.vision',
    status: 'live',
  },
  {
    key: 'forecast',
    name: 'Aegis Forecast',
    tech: 'Nixtla statsforecast + conformal',
    summary: 'Forecasts whose interval coverage is measured on held-out windows.',
    category: 'trust',
    modulePath: 'app.forecast.service',
    status: 'optional',
  },
  {
    key: 'loop',
    name: 'Aegis Loop',
    tech: 'native',
    summary: 'LLM-Ops self-improvement: trace, eval, diagnose, tiered release.',
    category: 'ops',
    modulePath: 'app.ops.release',
    status: 'live',
  },
  {
    key: 'trace',
    name: 'Aegis Trace',
    tech: 'OpenTelemetry to Phoenix',
    summary: 'End-to-end, glass-box tracing of every run.',
    category: 'ops',
    modulePath: 'app.observability.otel',
    status: 'live',
  },
  {
    key: 'governance',
    name: 'Aegis Governance',
    tech: 'Postgres RLS + JWT',
    summary: 'Multi-tenant RBAC, budgets, row-level security and audit log.',
    category: 'platform',
    modulePath: 'app.core.governance',
    status: 'live',
  },
  {
    key: 'mcp',
    name: 'Aegis Tools / MCP',
    tech: 'native + MCP SDK',
    summary: 'Risk-tiered tool registry with a human gate, exposed over MCP.',
    category: 'platform',
    modulePath: 'app.mcp.server',
    status: 'optional',
  },
]

export const MODULE_COUNT = AEGIS_MODULES.length
