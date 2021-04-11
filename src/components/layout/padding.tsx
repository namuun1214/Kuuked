import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { fibonacci } from '../../utils';
import { mapRoleToBackgroundColor, ThemeContext } from '../theme';
import '../types';
import _ from 'lodash';

export const Padding = ({
  children,
  top,
  bottom,
  left,
  right,
  size,
  role,
}: PaddingType) => {
  const { baseSpace } = useContext(ThemeContext);
  const style = StyleSheet.create({
    container: {
      position: 'relative',
      paddingTop: _.isArray(size)
        ? fibonacci(size[0]) * baseSpace || 0
        : fibonacci(top) * baseSpace || 0,
      paddingRight: _.isArray(size)
        ? fibonacci(size[1]) * baseSpace || 0
        : fibonacci(right) * baseSpace || 0,
      paddingBottom: _.isArray(size)
        ? fibonacci(size[2]) * baseSpace || 0
        : fibonacci(bottom) * baseSpace || 0,
      paddingLeft: _.isArray(size)
        ? fibonacci(size[3]) * baseSpace || 0
        : fibonacci(left) * baseSpace || 0,
      backgroundColor: mapRoleToBackgroundColor(role),
    },
  });

  return <View style={style.container}>{children}</View>;
};
