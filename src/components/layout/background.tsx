import React, { FC } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { mapRoleToBackgroundColor } from '../theme';

type BackgroundType = {
  children?: any;
  height?: number | string;
  width?: number | string;
  role?: BackgroundRoleType;
  url?: string;
  resizeMode?: 'repeat' | 'stretch' | 'center' | 'contain' | 'cover';
  opacity?: number;
  overflow?: 'hidden' | 'scroll' | 'visible';
};

export const Background: FC<BackgroundType> = props => {
  const {
    children,
    height,
    width,
    role,
    url,
    opacity,
    resizeMode,
    overflow,
  } = props;
  const style = StyleSheet.create({
    container: {
      position: 'relative',
      // aspectRatio: 1,
      overflow,
      height: height,
      width: width,
      backgroundColor: mapRoleToBackgroundColor(role),
    },
    image: {
      flex: url && 1,
      justifyContent: 'center',
      opacity,
      aspectRatio: url && 1,
    },
  });
  return (
    <View style={style.container}>
      <ImageBackground
        resizeMode={resizeMode || 'stretch'}
        source={{ uri: url }}
        style={style.image}>
        {children}
      </ImageBackground>
    </View>
  );
};
