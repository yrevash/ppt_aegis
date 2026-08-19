/** The four layers, from the Aegis README architecture diagram. */

export interface Layer {
  n: string
  title: string
  path: string
  stack: string
  parts: string[]
}

export const LAYERS: Layer[] = [
  {
    n: '1',
    title: 'Console',
    path: 'web/',
    stack: 'Next.js · React · TypeScript',
    parts: ['Four role portals', 'REST and SSE client'],
  },
  {
    n: '2',
    title: 'Composition root',
    path: 'backend/src/app',
    stack: 'FastAPI · app factory',
    parts: ['Endpoints, JWT, RBAC', 'Tenant scoping', 'Background sweepers'],
  },
  {
    n: '3',
    title: 'Importable core',
    path: 'aegis/src/aegis',
    stack: '18 packages',
    parts: ['agent · gateway · guardrails', 'retrieval · memory · ml', 'governance · ops · evals · trace'],
  },
  {
    n: '4',
    title: 'Stores and sinks',
    path: 'native local installs',
    stack: 'No Docker · no GPU · no WSL',
    parts: ['Postgres · Neo4j · Redis', 'Embedded vectors', 'Arize Phoenix'],
  },
]

export const ADAPTER_SEAM = {
  title: 'Domain adapter',
  path: 'backend/src/app/adapter/',
  note: 'The only seam that changes per domain. The core never learns the domain.',
}
