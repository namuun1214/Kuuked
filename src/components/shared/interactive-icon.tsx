import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

type InteractiveIconType = {
  icon?: any;
  onPress?: any;
  style?: any;
};

export const InteractiveIcon: FC<InteractiveIconType> = props => {
  const { icon } = props;
  return <TouchableOpacity {...props}>{icon}</TouchableOpacity>;
};
