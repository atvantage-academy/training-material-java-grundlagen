/**
 * ATVANTAGE Button. Anthrazit-Fläche, Radius 5px; auf dunklen Sektionen Variante "inverted" (weiß, Radius 8px).
 * @startingPoint section="Components" subtitle="Primärer und invertierter Button" viewport="700x150"
 */
export interface ButtonProps {
  /** 'primary' auf hellen Flächen, 'inverted' auf dunklen Sektionen (#303E4F) */
  variant?: 'primary' | 'inverted';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}
export declare function Button(props: ButtonProps): JSX.Element;
