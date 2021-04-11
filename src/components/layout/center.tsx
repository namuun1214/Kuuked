import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { mapRoleToBackgroundColor } from '../theme';

type CenterType = {
  children?: any;
  flex?: number;
  width?: number;
  role?: BackgroundRoleType;
};

export const Center: FC<CenterType> = props => {
  const { children, flex, width, role } = props;
  const style = StyleSheet.create({
    container: {
      flex,
      width,
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: mapRoleToBackgroundColor(role),
    },
  });

  return <View style={style.container}>{children}</View>;
};
