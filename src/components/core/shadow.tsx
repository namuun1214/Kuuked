import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

export const Shadow = props => {
  const { children } = props;
  const style = StyleSheet.create({
    container: {
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 },

      elevation: 40,
      backgroundColor: 'black',
      borderRadius: 4,

      overflow: Platform.OS !== 'ios' ? 'hidden' : 'visible',
    },
  });
  return <View style={style.container}>{children}</View>;
};
