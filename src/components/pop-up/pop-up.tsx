import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { AnimatedFadeInView } from '../animated';
import { Border } from '../core';
import { Margin, Stack, Overlay } from '../layout';
import { mapRoleToBackgroundColor } from '../theme';

export const PopUp = ({ children }) => {
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
    <Overlay width="100%" height="100%">
      <View style={styles.scrim}>
        <AnimatedFadeInView visible={true}>
          <Stack maxWidth={Dimensions.get('window').width / 1.2}>
            <Border backgroundRole="light" radius="large">
              <Margin size={[4, 4, 4, 4]}>{children}</Margin>
            </Border>
          </Stack>
        </AnimatedFadeInView>
      </View>
    </Overlay>
  );
};
