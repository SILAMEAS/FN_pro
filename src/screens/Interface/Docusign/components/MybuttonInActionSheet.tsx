import React, {ReactNode} from 'react';
import {Button, IButtonProps, Text} from 'native-base';
import {ListMenuInStagger} from '@screens/Interface/Docusign/components/listMenu/ListMenu';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserGroup} from '@fortawesome/free-solid-svg-icons';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
interface Type {
  Icon?: ReactNode;
  Title?: ReactNode;
  event: () => void;
  porp?: IButtonProps;
}
function MybuttonInActionSheet({
  event,
  Icon = <FontAwesomeIcon icon={faUserGroup} color={'gray'} size={24} />,
  Title = <Text {...COLOR.Text.textRedirect}>Request Signatures</Text>,
  porp = {
    mb: 2,
    variant: 'solid',
    bg: 'white:alpha.90',
    colorScheme: 'blue',
    borderRadius: 'full',
    borderWidth: 1,
    borderColor: 'black:alpha.30',
  },
}: Type) {
  return (
    <Button
      {...porp}
      onPress={() => {
        event();
      }}
    >
      {<ListMenuInStagger icon={Icon} title={Title} />}
    </Button>
  );
}

export default MybuttonInActionSheet;
