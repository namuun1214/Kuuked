import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { fibonacci } from '../../utils';
import { mapRoleToBackgroundColor, ThemeContext } from '../theme';
import '../types';
import _ from 'lodash';

export const Margin = ({
  top,
  bottom,
  left,
  right,
  children,
  size,
  role,
  grow,
}: MarginType) => {
  const { baseSpace } = useContext(ThemeContext);
  const style = StyleSheet.create({
    container: {
      flexGrow: grow,
      marginTop: _.isArray(size)
        ? fibonacci(size[0]) * baseSpace || 0
        : fibonacci(top) * baseSpace || 0,
      marginRight: _.isArray(size)
        ? fibonacci(size[1]) * baseSpace || 0
        : fibonacci(right) * baseSpace || 0,
      marginBottom: _.isArray(size)
        ? fibonacci(size[2]) * baseSpace || 0
        : fibonacci(bottom) * baseSpace || 0,
      marginLeft: _.isArray(size)
        ? fibonacci(size[3]) * baseSpace || 0
        : fibonacci(left) * baseSpace || 0,
      backgroundColor: mapRoleToBackgroundColor(role),
    },
  });
  return <View style={style.container}>{children}</View>;
};
