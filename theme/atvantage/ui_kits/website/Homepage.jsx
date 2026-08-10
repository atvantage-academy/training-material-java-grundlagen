const useState = React.useState;

function Placeholder({ label, style }) {
  return <div style={{ background: 'var(--avd-gray-card)', color: 'var(--avd-gray-metatext)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, textAlign: 'center', padding: 12, boxSizing: 'border-box', ...style }}>{label}</div>;
}

function NavLink({ children, active, onClick }) {
  const [h, setH] = useState(false);
  return <a href="#" onClick={e => { e.preventDefault(); onClick && onClick(); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ color: active || h ? 'var(--avd-orange)' : 'var(--color-headline)', fontWeight: 500, fontSize: 17, textDecoration: 'none' }}>{children}</a>;
}

export function Homepage() {
  const { Button, Card, Tag } = window.ATVANTAGEDesignSystem_019e07;
  const [nav, setNav] = useState('Leistungen');
  const leistungen = [
    { t: 'Digital & Business Innovation', d: 'Digitaler Wandel bedeutet Veränderung. Wir begleiten Sie dabei, die besten Lösungen zu finden – klar, nachvollziehbar und partnerschaftlich.' },
    { t: 'AI, Data & Analytics', d: 'Mit unserer Expertise stärken wir Ihre Entscheidungsfähigkeit, optimieren Prozesse und erschließen neue Umsatz- und Wachstumspotenziale.' },
    { t: 'Digital Process Management', d: 'Indem wir Ihre digitalen Abläufe optimieren, machen wir sie zum Wachstumstreiber, der Qualität und Exzellenz konsequent vereint.' },
    { t: 'Technology Adoption & Integration', d: 'Neue Technologien sollten sinnvoll ausgewählt, wirksam integriert und zielgerichtet eingesetzt werden. Wir helfen Ihnen dabei.' },
  ];
  const referenzen = [
    { t: 'Rodenstock: Moderne Technologien und KI für Beratersoftware', d: 'Machbarkeitsstudie für ein Konzept einer Beratungssoftware mit modernen Technologien und KI.' },
    { t: 'Negotiation Bot: Effizient verhandeln & bis zu 15 % sparen', d: 'Effizientere Prozesse und spürbare Entlastung des Einkaufs bei einem Technologiekonzern.' },
    { t: 'Data Fabric im Krankenhaus – Agaplesion', d: 'Komplexe Analysen, mehr Transparenz in der Patientenversorgung, Grundlage für KI-Anwendungen.' },
  ];
  const px = 'max(var(--content-inline-padding),calc((100% - 1200px)/2))';
  return (
    <div style={{ fontFamily: 'var(--font-family)', color: 'var(--color-text)', background: '#fff' }}>
      <div style={{ background: 'var(--avd-gray-metanav)', color: 'var(--avd-gray-metatext)', fontSize: 14, display: 'flex', gap: 24, padding: `6px ${px}` }}>
        <span>ATVANTAGE ist Teil der TIMETOACT GROUP</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 18 }}><a href="#" style={{ color: 'inherit' }}>Technologien</a><a href="#" style={{ color: 'inherit' }}>Blog</a><a href="#" style={{ color: 'inherit' }}>Standorte</a></span>
      </div>
      <header style={{ height: 'var(--topnav-height)', display: 'flex', alignItems: 'center', gap: 32, padding: `0 ${px}`, borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: '#fff', zIndex: 5 }}>
        <img src="../../assets/logo-orange.svg" alt="ATVANTAGE" style={{ height: 22 }} />
        <nav style={{ display: 'flex', gap: 26, marginLeft: 'auto' }}>
          {['Leistungen', 'Branchen', 'Referenzen', 'Karriere', 'Über uns'].map(l => <NavLink key={l} active={nav === l} onClick={() => setNav(l)}>{l}</NavLink>)}
        </nav>
        <Button size="sm">Kontakt</Button>
      </header>
      <section style={{ padding: `5rem ${px}`, display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: '2rem', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 'calc(var(--h1-base)*1.5)', lineHeight: 1.1 }}>Technologie verändert die Welt. In Co&#8209;Creation gestalten wir sie wirksam.</h1>
          <p style={{ fontSize: 'var(--text-size-hero)', maxWidth: 560 }}>Durch ganzheitliche Beratung und passgenaue digitale Lösungen machen wir unsere Kunden effizienter, Prozesse und Abläufe smarter und ermöglichen Wachstum in neuen Geschäftsfeldern.</p>
          <Button>Jetzt beraten lassen</Button>
        </div>
        <Placeholder label="Hero-Foto (atv-index-hero-1.png) — echtes Asset anfragen" style={{ height: 340, borderRadius: 8 }} />
      </section>
      <section style={{ background: 'var(--color-surface-blue)', padding: `4rem ${px}` }}>
        <h4 style={{ fontSize: 24, fontWeight: 500 }}>Fünf Logos. Eine Vision.</h4>
        <p style={{ maxWidth: 760 }}>Die Unternehmen <b>ARS</b>, <b>brainbits</b>, <b>X&#8209;INTEGRATE</b>, <b>JOIN (+)</b> und <b>TIMETOACT Software & Consulting</b> bündeln ihre Kräfte und treten ab sofort gemeinsam als <b>ATVANTAGE</b> auf.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
          {['TIMETOACT', 'ARS', 'brainbits', 'JOIN (+)', 'X-INTEGRATE'].map(n => <Placeholder key={n} label={n + ' (Logo, grau)'} style={{ height: 64, borderRadius: 5, background: '#fff' }} />)}
        </div>
      </section>
      <section style={{ padding: `5rem ${px}` }}>
        <h2>In diesen Bereichen schätzen Kunden unsere Expertise besonders:</h2>
        <p style={{ maxWidth: 700 }}>Wir begleiten Sie partnerschaftlich in einem End-to-End-Prozess. Für nachhaltige digitale Lösungen, die uns alle weiterbringen.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
          {leistungen.map(x => <Card key={x.t} title={x.t} href="#">{x.d}</Card>)}
        </div>
      </section>
      <section style={{ background: 'var(--avd-slate)', color: '#fff', padding: `4rem ${px}`, textAlign: 'center' }}>
        <h3 style={{ color: '#fff', maxWidth: 820, margin: '0 auto 1.5rem', lineHeight: 1.25 }}>Sie haben eine klare Vision, suchen Orientierung oder stehen ganz am Anfang? Wir helfen Ihnen, den richtigen Kurs zu setzen.</h3>
        <Button variant="inverted">Jetzt beraten lassen</Button>
      </section>
      <section style={{ padding: `5rem ${px}` }}>
        <h2>Neues gestaltet – passgenau</h2>
        <p style={{ maxWidth: 700 }}>So erleichtern unsere Lösungen den Alltag der Menschen und machen Unternehmen erfolgreicher. Tag für Tag:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginTop: '2rem' }}>
          {referenzen.map(x => (
            <div key={x.t} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Placeholder label="Referenz-Bild" style={{ height: 150, borderRadius: 8 }} />
              <div><Tag>Referenz</Tag></div>
              <h5 style={{ margin: 0, color: 'var(--color-orange)' }}>{x.t}</h5>
              <p style={{ margin: 0, fontSize: 16 }}>{x.d}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2.5rem' }}><Button>Weitere Referenzen entdecken</Button></div>
      </section>
      <footer style={{ background: 'var(--avd-gray-footer)', color: '#fff', padding: `3rem ${px} 2rem` }}>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <img src="../../assets/logo-white.svg" alt="ATVANTAGE" style={{ height: 20 }} />
          <nav style={{ display: 'flex', gap: 22 }}>{['Branchen', 'Leistungen', 'Karriere', 'Über uns'].map(l => <a key={l} href="#" style={{ color: '#fff', fontSize: 16 }}>{l}</a>)}</nav>
          <span style={{ marginLeft: 'auto', fontSize: 16 }}>Folgen Sie uns! · LinkedIn · YouTube</span>
        </div>
      </footer>
      <div style={{ background: 'var(--avd-gray-footer-accent)', padding: `14px ${px}`, display: 'flex', gap: 20, fontSize: 14, color: '#ccc' }}>
        <span>© 2026 ATVANTAGE GmbH</span><a href="#" style={{ color: '#ccc' }}>Impressum</a><a href="#" style={{ color: '#ccc' }}>Datenschutz</a>
      </div>
    </div>
  );
}
