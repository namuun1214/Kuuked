import React, { FC } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { mapRoleToBackgroundColor } from '../theme';

type BoxType = {
  ratio?: number;
  role?:
    | 'success'
    | 'light'
    | 'primary'
    | 'info'
    | 'error'
    | 'secondary'
    | 'tertiary'
    | 'transparent'
    | 'overlay'
    | 'accent';
  url?: string;
  width?: string | number;
  height?: string | number;
};

export const Box: FC<BoxType> = props => {
  const { children, ratio = 1, role, url, width, height } = props;
  const style = StyleSheet.create({
    container: {
      position: 'relative',
      aspectRatio: ratio,
      overflow: 'hidden',
      display: 'flex',
      height: height,
      width: width || '100%',
      backgroundColor: mapRoleToBackgroundColor(role),
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
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
  });

  return (
    <View style={style.container}>
      <ImageBackground source={{ uri: url }} style={style.image}>
        <View style={style.innerContainer}>{children}</View>
      </ImageBackground>
    </View>
  );
};
