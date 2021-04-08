import React, { useContext } from 'react';
import { View } from 'react-native';
import { fibonacci } from '../../utils';
import { ThemeContext } from '../theme';

export const Spacer = props => {
  const { horizontal, size } = props;
  const { baseSpace } = useContext(ThemeContext);
  return (
    <View
      style={{
        height: (horizontal && fibonacci(size) * baseSpace) || 0,
        width: (!horizontal && fibonacci(size) * baseSpace) || 0,
      }}
    />
  );
};
