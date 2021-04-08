import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  mapLineWidthToBorderWidth,
  mapRoleToBackgroundColor,
  mapRoleToBorderColor,
} from '../theme';
import '../types';

const CORNER_RADIUS = {
  small: 2,
  medium: 4,
  xmedium: 8,
  large: 15,
  xlarge: 35,
};

export const Border = ({
  children,
  backgroundRole,
  role,
  lineWidth,
  radius,
  topWidth,
  bottomWidth,
  leftWidth,
  rightWidth,
  opacity,
  grow,
}: BorderType) => {
  const style = StyleSheet.create({
    container: {
      backgroundColor:
        mapRoleToBackgroundColor(backgroundRole) || 'transparent',
      borderColor: mapRoleToBorderColor(role) || 'transparent',
      borderWidth: mapLineWidthToBorderWidth(lineWidth),
      borderStyle: 'solid',
      borderRadius: CORNER_RADIUS[radius] || 0,
      borderTopWidth: mapLineWidthToBorderWidth(topWidth),
      borderBottomWidth: mapLineWidthToBorderWidth(bottomWidth),
      borderLeftWidth: mapLineWidthToBorderWidth(leftWidth),
      borderRightWidth: mapLineWidthToBorderWidth(rightWidth),
      opacity,
      flexGrow: grow,
      overflow: 'hidden',
    },
  });
  return <View style={style.container}>{children}</View>;
};
