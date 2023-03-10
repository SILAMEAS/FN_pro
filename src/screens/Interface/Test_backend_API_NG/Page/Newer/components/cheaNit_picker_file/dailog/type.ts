import {IModalProps} from 'native-base';
import {ReactNode} from 'react';

export declare type SizeDialog = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DialogProps extends IModalProps {
  body?: string | number | ReactNode | ReactNode[] | undefined;
  header?: string | number | ReactNode | ReactNode[] | undefined;
  buttons: JSX.Element | JSX.Element[];
  size?: SizeDialog | undefined;
  isOpen: boolean;
  onClose?: () => void | undefined;
}

export interface DialogHook {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
}
