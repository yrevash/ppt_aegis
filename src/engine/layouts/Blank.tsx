'use client'

interface BlankProps {
  children?: React.ReactNode
}

export function Blank({ children }: BlankProps) {
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}