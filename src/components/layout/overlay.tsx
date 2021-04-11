import React, { FC, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { fibonacci } from '../../utils';
import { mapRoleToBackgroundColor, ThemeContext } from '../theme';
import _ from 'lodash';

type OverlayType = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  children?: any;
  zIndex?: number;
  position?: 'relative' | 'absolute';
  height?: number | string;
  width?: number | string;
  flex?: number;
  role?: BackgroundRoleType;
};

export const Overlay: FC<OverlayType> = ({
  top,
  left,
  right,
  bottom,
  children,
  zIndex,
  position,
  height,
  width,
  role,
  flex,
}) => {
  const { baseSpace } = useContext(ThemeContext);
  const style = StyleSheet.create({
    container: {
      backgroundColor: mapRoleToBackgroundColor(role),
      position: position || 'absolute',
      top: _.isNumber(top) ? fibonacci(top) * baseSpace : top,
      left,
      right,
      bottom,
      zIndex,
      height,
      width,
      flex,
    },
  });

  return <View style={style.container}>{children}</View>;
};
