'use client'

import { useSlide } from '../context/SlideContext'

export function Progress() {
  const { current, total } = useSlide()
  const pct = total > 0 ? ((current + 1) / total) * 100 : 0

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '10px 28px',
      background: 'rgba(13, 13, 15, 0.85)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(240, 237, 232, 0.06)',
      zIndex: 1000,
    }}>
      <div style={{
        flex: 1,
        height: 2,
        background: 'rgba(240, 237, 232, 0.08)',
        borderRadius: 1,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: '#CC785C',
          borderRadius: 1,
          transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>
      <span style={{
        fontSize: 13,
        fontWeight: 500,
        color: '#6B6760',
        fontFamily: 'var(--font-geist-mono)',
        whiteSpace: 'nowrap',
      }}>
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}