/**
 * Content-/Teaser-Card: hellgraue Fläche, orange Headline, optionaler "Mehr dazu"-Link.
 * @startingPoint section="Components" subtitle="Teaser-Card mit oranger Headline" viewport="700x260"
 */
export interface CardProps {
  /** Orange Card-Headline (H5, 22px) */
  title?: string;
  children?: React.ReactNode;
  /** Ziel des Links; ohne href wird kein Link gerendert */
  href?: string;
  /** Link-Text, Standard "Mehr dazu" */
  linkLabel?: string;
  /** Schatten 0 0 10px #5F5F5F — sparsam einsetzen */
  shadow?: boolean;
}
export declare function Card(props: CardProps): JSX.Element;
