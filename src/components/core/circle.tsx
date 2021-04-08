import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  mapLineWidthToBorderWidth,
  mapRoleToBackgroundColor,
  mapRoleToBorderColor,
} from '../theme';

type CircleType = {
  children?: any;
  backgroundRole?:
    | 'success'
    | 'lightSuccess'
    | 'light'
    | 'primary'
    | 'info'
    | 'error'
    | 'secondary'
    | 'tertiary'
    | 'transparent'
    | 'overlay'
    | 'accent';
  role?: 'success' | 'light' | 'primary' | 'info' | 'error' | 'secondary';
  borderRole?: BorderRoleType;
  lineWidth?: 'xlight' | 'light' | 'medium' | 'thick';
  size?: number;
  height?: number | string;
  width?: number | string;
  opacity?: number;
};

export const Circle: FC<CircleType> = props => {
  const {
    children,
    backgroundRole,
    lineWidth,
    size = 50,
    height,
    width,
    role,
    opacity,
  } = props;
  const style = StyleSheet.create({
    container: {
      position: 'relative',
      overflow: 'hidden',
      height: height || size,
      width: width || size,
      borderRadius: size / 2,
      borderWidth: mapLineWidthToBorderWidth(lineWidth),
      borderColor: mapRoleToBorderColor(role),
      backgroundColor: mapRoleToBackgroundColor(backgroundRole),
      opacity,
    },
    innerContainer: {
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
    },
  });

  return (
    <View style={style.container}>
      <View style={style.innerContainer}>{children}</View>
    </View>
  );
};
