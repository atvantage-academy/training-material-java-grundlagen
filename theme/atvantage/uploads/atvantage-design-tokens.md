# ATVANTAGE Design Tokens

Extrahiert aus dem Inline-CSS von www.atvantage.com (Stand: Juli 2026).
Quelle ist ein Pimcore-Theming-System mit sechs Sektions-Themes (`.stylesheet_*`).
Vier davon sind der aktuelle ATVANTAGE-Look (Outfit, Orange-Akzente), zwei sind
TIMETOACT-Altbestand (Inter, TTA-Blau). Dieses Dokument beschreibt den
ATVANTAGE-Look; der Altbestand ist am Ende separat vermerkt.

## Farben

### Kernpalette

| Token | Wert | Verwendung |
|---|---|---|
| Anthrazit (Text) | `#343E3F` | Fließtext, primäre Buttons |
| Fast-Schwarz (Headlines) | `#1A2627` | Überschriften H1–H6 |
| Blaugrau (Akzent) | `#303E4F` | Akzentfarbe, dunkle Sektions-Hintergründe |
| Orange (Standard) | `#FF5401` | Links, aktive Zustände, Icons, Card-Headlines, Logo |
| Weiß | `#FFFFFF` | Hintergrund, invertierter Text |

### Sekundär / Flächen

| Token | Wert | Verwendung |
|---|---|---|
| Hellblau (Sektion) | `#DDE4EE` | Hervorgehobene Sektions-Hintergründe |
| Hellgrau (Card) | `#EDEDED` / `#EEEEEE` | Card-Hintergründe |
| Hellgrau (Metanav) | `#F4F4F4` | Meta-Navigation |
| Mittelgrau | `#909090` | Akzent grau |
| Grau (Footer) | `#5F5F5F` | Footer, Schatten, sekundärer Text |
| Dunkelgrau (Footer-Akzent) | `#373737` | Footer-Akzentfläche |
| Grau (Metanav-Text) | `#707173` | Meta-Navigation, Affiliation-Leiste |
| Grau (Hover-Button) | `#4D5657` | Button-Hover |
| Rot (Danger) | `#EE1919` | Fehler/Warnung |

## Typografie

**Schriftfamilie:** Outfit (durchgängig für Text und Headlines).
Geladen als Webfont; Fallback `sans-serif`.

**Fließtext:**

| Eigenschaft | Wert |
|---|---|
| Größe | 1.125 rem (18 px); große Hero-Sektionen: 1.35 rem |
| Gewicht | 400 |
| Zeilenhöhe | 1.62 |
| Absatzabstand | 20 px |

**Headlines** (Farbe `#1A2627`, Gewicht 500 in Content-Sektionen, Basis 600):

| Ebene | Mobile | Desktop (skaliert per calc) |
|---|---|---|
| H1 | 38 px | Basis × 1.5 bis × 2 je Breakpoint |
| H2 | 34 px | Basis × 1.28 bis × 1.71 |
| H3 | 28 px | Basis × 1.2 bis × 1.8, Zeilenhöhe 85 % |
| H5 | 22 px | Basis × 1.2 |

Desktop-Größen werden nicht fest gesetzt, sondern aus der Mobile-Basis
per `calc()` an drei Breakpoints hochskaliert.

## Buttons

| Eigenschaft | Wert |
|---|---|
| Hintergrund | `#343E3F` (Anthrazit) |
| Text | `#FFFFFF` |
| Hover | `#4D5657` |
| Border-Radius | 5 px (Standard), 8 px auf dunklen Sektionen |

Auf dunklem Hintergrund (`#303E4F`) invertiert: weißer Button,
Text `#303E4F`, Hover transparent-weiß mit weißem Rahmen.

## Layout & Spacing

| Token | Wert |
|---|---|
| Content-Padding horizontal | 24 px |
| Sektions-Padding vertikal | 5–6 rem (Standard), 1 rem (kompakt) |
| Modul-Abstand | 1 rem (Standard), 2 rem (global default) |
| Top-Navigation Höhe | 80 px |
| Schatten | `0 0 10px #5F5F5F` |

**Breakpoints:** 576 / 768 / 992 / 1200 / 1440 / 2000 px

## Konsolidierter Token-Block (CSS)

```css
:root {
  /* Farben */
  --color-text: #343e3f;
  --color-headline: #1a2627;
  --color-accent: #303e4f;
  --color-orange: #ff5401;
  --color-link: var(--color-orange);
  --color-icon: var(--color-orange);
  --color-background: #ffffff;
  --color-surface-blue: #dde4ee;
  --color-surface-card: #ededed;
  --color-footer: #5f5f5f;
  --color-danger: #ee1919;

  /* Typografie */
  --font-family: 'Outfit', sans-serif;
  --text-size: 1.125rem;
  --text-weight: 400;
  --text-line-height: 1.62;

  /* Komponenten */
  --button-bg: #343e3f;
  --button-text: #ffffff;
  --button-bg-hover: #4d5657;
  --button-radius: 5px;

  /* Layout */
  --content-inline-padding: 24px;
  --section-padding-block: 5rem;
  --shadow: 0 0 10px #5f5f5f;
}
```

## Hinweise / offene Punkte

1. **Zwei Markenwelten im CSS.** Die Themes `stylesheet_88621` und
   `stylesheet_88624` nutzen Inter statt Outfit und TIMETOACT-Blau
   `#004C91` für Buttons, Icons und Card-Headlines — vermutlich
   Altbestand oder Gruppen-Kontext. Für das ATVANTAGE-Design-System
   ignorieren, sofern nicht bewusst als Sub-Brand gewünscht.
2. **Montserrat-Fallback im Base-Layer** (`h1–h6 { font-family:
   Montserrat, ... }`) wird von den Theme-Variablen überschrieben —
   Altlast, nicht übernehmen.
3. **Orange konsolidiert auf `#FF5401`** (verbindlicher Standard).
   Abweichende Bestandswerte, die bei Gelegenheit nachgezogen werden
   sollten: Website-CSS nutzt `#F08225` (Links) und `#EE6419` (Icons),
   der ursprüngliche Logo-Export `#EB5B29`.
4. Herausgefiltert wurden: SVG-Data-URIs (Chevrons, Icons),
   tta-iconfont, Marketing-Form-Styles (Dynamics), Cookie-Banner,
   Social-Media-Markenfarben, Swiper-Interna.
