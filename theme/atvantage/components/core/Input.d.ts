/** Formular-Textfeld mit Label und Fehlerzustand (Danger #EE1919). */
export interface InputProps {
  label?: string;
  /** Fehlertext; färbt Rahmen danger-rot */
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  type?: string;
}
export declare function Input(props: InputProps): JSX.Element;
