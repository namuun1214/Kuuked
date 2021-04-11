import React, { FC } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Border } from '../core';
import { Margin, Stack } from '../layout';
import { mapRoleToBackgroundColor } from '../theme';

export const Dialog: FC = ({ children }) => {
  const styles = StyleSheet.create({
    scrim: {
      flex: 1,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: mapRoleToBackgroundColor('overlay'),
    },
  });
  return (
    <View style={styles.scrim}>
      <Stack maxWidth={Dimensions.get('window').width / 1.2}>
        <Border backgroundRole="primary" radius="large">
          <Margin size={[4, 4, 4, 4]}>{children}</Margin>
        </Border>
      </Stack>
    </View>
  );
};
