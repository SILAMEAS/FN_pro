export interface Type {
  label?: string;
  placeholder?: string | undefined;
  DataSelect: any;
  onValueChange?: (itemValue: string) => void;
}
