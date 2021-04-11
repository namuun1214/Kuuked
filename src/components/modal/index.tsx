import React, { forwardRef, useContext, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { Padding } from '../layout';
import { mapRoleToBackgroundColor, ThemeContext } from '../theme';

export const ModalSheet = forwardRef((props: any, ref: any) => {
  const { children, initialHeight } = props;
  let { baseSpace } = useContext(ThemeContext);
  const bottomSheetProgress = useRef(new Animated.Value(0)).current;

  const animatedContentOpacity = Animated.interpolate(bottomSheetProgress, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const renderContent = () => (
    <View
      style={{
        height: '100%',
        backgroundColor: mapRoleToBackgroundColor('primary'),
        paddingHorizontal: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        zIndex: 99,
      }}>
      <Padding size={[5, 5, 5, 5]}>{children}</Padding>
    </View>
  );
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mapRoleToBackgroundColor('overlay'),
    },
  });
  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        ref={ref}
        snapPoints={[initialHeight || 0, '90%']}
        // snapPoints={[450, 300, 0]}
        borderRadius={baseSpace * 2}
        callbackNode={bottomSheetProgress}
        renderContent={renderContent}
      />
      <Animated.View
        // onTouchEndCapture={handleTouchEndCapture}
        style={[
          styles.container,
          {
            opacity: animatedContentOpacity,
          },
        ]}
      />
    </View>
  );
});
