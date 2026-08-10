import React, { useState } from 'react';
export function Button({ variant = 'primary', size = 'md', disabled = false, children, style, ...rest }) {
  const [hover, setHover] = useState(false);
  const pad = size === 'sm' ? '8px 18px' : size === 'lg' ? '14px 34px' : '11px 26px';
  const fs = size === 'sm' ? 16 : 18;
  const variants = {
    primary: { background: hover ? 'var(--button-bg-hover)' : 'var(--button-bg)', color: 'var(--button-text)', border: '1px solid transparent', borderRadius: 'var(--button-radius)' },
    inverted: { background: hover ? 'transparent' : '#fff', color: hover ? '#fff' : 'var(--avd-slate)', border: '1px solid #fff', borderRadius: 'var(--button-radius-dark)' },
  };
  return (
    <button type="button" disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ fontFamily: 'var(--font-family)', fontSize: fs, fontWeight: 500, lineHeight: 1.2, padding: pad, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.45 : 1, transition: 'background .15s,color .15s', display: 'inline-block', ...variants[variant], ...style }}
      {...rest}>{children}</button>
  );
}
