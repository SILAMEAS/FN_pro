import {IButtonProps, ITextProps} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';

import {Slide} from './hooks/useSlide';
interface SlideContent {
  stepName: string;
  child: JSX.Element;
}
export interface SlideProps {
  slideContent: SlideContent[];
  width?: number | string | undefined;
  height?: number | string | undefined;
  backgroundColor?: ColorType | undefined;
  headerStyle?: ITextProps;
  button?: Button | undefined;
  onDone?: ((slide?: Slide) => void) | undefined;
  onNext?: ((slide?: Slide) => void) | undefined;
  onBack?: ((slide?: Slide) => void) | undefined;
}

interface Button {
  leftButton?: IButtonProps;
  rightButton?: IButtonProps;
  lastStepButton?: IButtonProps;
}
