import React from 'react';
export function Tag({ tone = 'neutral', children, style }) {
  const tones = {
    neutral: { background: 'var(--avd-gray-metanav)', color: 'var(--avd-gray-metatext)' },
    orange: { background: 'var(--avd-orange)', color: '#fff' },
    slate: { background: 'var(--avd-slate)', color: '#fff' },
    blue: { background: 'var(--avd-blue-light)', color: 'var(--avd-slate)' },
  };
  return <span style={{ display: 'inline-block', fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: 500, lineHeight: 1, padding: '6px 12px', borderRadius: 'var(--radius)', ...tones[tone], ...style }}>{children}</span>;
}
