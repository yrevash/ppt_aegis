/** Run modes, verification counts and the console's role portals. */

export interface RunMode {
  id: string
  what: string
  needs: string
  tone: 'teal' | 'accent' | 'amber'
}

export const RUN_MODES: RunMode[] = [
  { id: 'safe', what: 'Console only, in-browser mock transport', needs: 'Nothing', tone: 'teal' },
  { id: 'lite', what: 'Real agent, no databases, SQLite audit', needs: 'A model API key', tone: 'accent' },
  { id: 'full', what: 'Everything, all three server stores', needs: 'Key, Postgres, Neo4j, Redis', tone: 'amber' },
]

export interface Portal {
  role: string
  focus: string
}

export const PORTALS: Portal[] = [
  { role: 'admin', focus: 'Spend, approvals, security posture, latency' },
  { role: 'ai_team', focus: 'Prompts, evals, release gates, the improvement loop' },
  { role: 'devops', focus: 'Stack versions, patch checks, runbook and diagnostics' },
  { role: 'client', focus: 'The scoped surface a tenant actually sees' },
]

export interface ProofPoint {
  value: string
  label: string
  note: string
}

export const PROOF_POINTS: ProofPoint[] = [
  { value: '723', label: 'Core tests', note: 'aegis/, the importable core' },
  { value: '593', label: 'Backend tests', note: 'backend/, 51 endpoints' },
  { value: '18', label: 'Core packages', note: 'One module contract each' },
  { value: '9', label: 'Decision records', note: 'docs/adr/' },
]

/** Self-describing surfaces a judge can hit without reading any code. */
export const LIVE_SURFACES: { route: string; what: string }[] = [
  { route: 'GET /platform/capabilities', what: 'The module manifest, as data. Public.' },
  { route: 'GET /docs', what: 'OpenAPI for all 51 endpoints' },
  { route: 'GET /about', what: 'What this build is and what it is running' },
]
