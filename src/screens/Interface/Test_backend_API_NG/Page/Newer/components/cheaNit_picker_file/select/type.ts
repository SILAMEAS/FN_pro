import {ISelectItemProps, ISelectProps} from 'native-base';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';

export interface MySelectProps {
  select?: MySelectProp | undefined;
  selectItem?: MySelectItemProp | undefined;
  _webContainer?: Partial<IViewProps> | undefined;
  selectedValue?: string | undefined;
  data: any[];
  valueProp?: string | undefined;
  labelProp?: string | undefined;
  onValueChange?: ((itemValue: string) => void) | undefined;
}

interface MySelectProp extends ISelectProps {}
interface MySelectItemProp extends ISelectItemProps {}
