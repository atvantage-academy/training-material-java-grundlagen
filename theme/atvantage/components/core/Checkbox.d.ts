/** Checkbox für Formulare; aktiver Zustand in Orange. */
export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
