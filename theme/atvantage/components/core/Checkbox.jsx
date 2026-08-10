import React from 'react';
export function Checkbox({ label, checked = false, onChange, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-family)', fontSize: 16, color: 'var(--color-text)', cursor: 'pointer', ...style }}>
      <span onClick={() => onChange && onChange(!checked)} role="checkbox" aria-checked={checked}
        style={{ width: 20, height: 20, flex: 'none', borderRadius: 3, border: `1px solid ${checked ? 'var(--avd-orange)' : 'var(--avd-gray-mid)'}`, background: checked ? 'var(--avd-orange)' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, lineHeight: 1, transition: 'background .12s,border-color .12s' }}>{checked ? '✓' : ''}</span>
      <span onClick={() => onChange && onChange(!checked)}>{label}</span>
    </label>
  );
}
