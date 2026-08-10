import React, { useState } from 'react';
export function Input({ label, error, style, ...rest }) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: 'block', fontFamily: 'var(--font-family)', ...style }}>
      {label && <span style={{ display: 'block', fontSize: 16, fontWeight: 500, color: 'var(--color-headline)', marginBottom: 6 }}>{label}</span>}
      <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-family)', fontSize: 'var(--text-size)', color: 'var(--color-text)', padding: '10px 14px', background: '#fff', border: `1px solid ${error ? 'var(--color-danger)' : focus ? 'var(--avd-slate)' : 'var(--avd-gray-mid)'}`, borderRadius: 'var(--radius)', outline: 'none' }} {...rest} />
      {error && <span style={{ display: 'block', fontSize: 14, color: 'var(--color-danger)', marginTop: 5 }}>{error}</span>}
    </label>
  );
}
