interface BaseProps {
  onFileChange?: (
    pickerResult: any,
    arrayBuffer: ArrayBuffer | undefined,
    base64: string | undefined,
  ) => void;
}

export interface FilePickerMobileProps extends BaseProps {}

export interface FilePickerWebProps extends BaseProps {}
