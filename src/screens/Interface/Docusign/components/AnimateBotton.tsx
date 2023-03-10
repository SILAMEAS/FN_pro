import React, {useEffect} from 'react';
import {Animated} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
interface Type {
  rotate: boolean;
  changeBy: any;
}

function AnimateBotton({rotate, changeBy}: Type) {
  const {current: spinAnim} = React.useRef<Animated.Value>(
    new Animated.Value(rotate ? 0 : 1),
  );
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '0deg'],
  });
  const iconT = (
    <Animated.View style={[{transform: [{rotate: spin}]}]}>
      {changeBy.isOpen ? (
        <FontAwesomeIcon icon={faPlus} size={46} color={'white'} />
      ) : (
        <FontAwesomeIcon
          icon={faPlusCircle}
          size={56}
          color={COLOR.ButtonColor.plusButton}
        />
      )}
    </Animated.View>
  );
  useEffect(() => {
    Animated.timing(spinAnim, {
      toValue: rotate ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  });
  return iconT;
}

export default AnimateBotton;
