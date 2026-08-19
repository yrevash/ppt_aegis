'use client'

import { AEGIS_MODULES, CATEGORY_LABEL, type ModuleCategory } from '@/deck/content/modules'
import { Text } from '@/engine/ui'

const ORDER: ModuleCategory[] = ['runtime', 'knowledge', 'trust', 'ops', 'platform']

/**
 * All fifteen modules, grouped by the category the manifest assigns them.
 *
 * The columns are deliberately uneven, because the manifest is uneven: Trust
 * carries five modules and Operations carries two. Padding them to a tidy
 * three-by-five grid would misrepresent where the work actually went.
 */
export function ModuleMatrix({ revealed }: { revealed: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
        gap: 12,
        alignItems: 'start',
        alignContent: 'center',
        flex: 1,
        minHeight: 0,
      }}
    >
      {ORDER.map((category, columnIndex) => {
        const modules = AEGIS_MODULES.filter((m) => m.category === category)
        const lit = columnIndex < revealed
        return (
          <section
            key={category}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              opacity: lit ? 1 : 0.24,
              transform: lit ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 420ms var(--ease-out), transform 420ms var(--ease-out)',
              minWidth: 0,
            }}
          >
            <header style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
              <Text as="span" size="xs" label tone="accent">
                {CATEGORY_LABEL[category]}
              </Text>
              <Text as="span" size="xs" mono tone="faint">
                {modules.length}
              </Text>
            </header>
            <div aria-hidden="true" style={{ height: 1, background: 'var(--hairline)' }} />

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {modules.map((module) => (
                <li
                  key={module.key}
                  style={{
                    padding: '9px 10px',
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--surface)',
                    border: '1px solid var(--hairline)',
                    minWidth: 0,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <Text as="span" size="xs" weight="semibold" tone="ink" style={{ fontSize: 12 }}>
                      {module.name.replace('Aegis ', '')}
                    </Text>
                    {module.status === 'optional' ? (
                      <Text as="span" size="xs" mono tone="faint" style={{ fontSize: 9 }}>
                        opt
                      </Text>
                    ) : null}
                  </div>
                  {/* The honest tech, never hidden behind the branded name. */}
                  <Text as="span" size="xs" mono tone="muted" style={{ fontSize: 9.5, display: 'block', marginTop: 3, lineHeight: 1.35 }}>
                    {module.tech}
                  </Text>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
