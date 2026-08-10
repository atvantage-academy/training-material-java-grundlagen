/** Kleines Label/Kategorie-Tag (z. B. "Referenz" auf Teaser-Cards). */
export interface TagProps {
  tone?: 'neutral' | 'orange' | 'slate' | 'blue';
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): JSX.Element;
