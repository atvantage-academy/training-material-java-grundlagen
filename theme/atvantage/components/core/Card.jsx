import React from 'react';
export function Card({ title, children, href, linkLabel = 'Mehr dazu', shadow = false, style }) {
  return (
    <div style={{ background: 'var(--color-surface-card)', borderRadius: 'var(--radius-dark)', padding: '28px 28px 24px', boxShadow: shadow ? 'var(--shadow)' : 'none', fontFamily: 'var(--font-family)', ...style }}>
      {title && <h5 style={{ margin: '0 0 12px', fontSize: 'var(--h5-base)', fontWeight: 600, color: 'var(--color-orange)', lineHeight: 1.2 }}>{title}</h5>}
      <div style={{ fontSize: 'var(--text-size)', lineHeight: 'var(--text-line-height)', color: 'var(--color-text)' }}>{children}</div>
      {href && <a href={href} style={{ display: 'inline-block', marginTop: 14, color: 'var(--color-link)', fontWeight: 500, textDecoration: 'none' }}>{linkLabel} →</a>}
    </div>
  );
}
