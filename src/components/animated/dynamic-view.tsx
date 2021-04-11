import React, { useEffect, useRef, FC } from 'react';
import { Animated } from 'react-native';

export const AnimatedDynamicView: FC<any> = ({
  position,
  visible,
  children,
  debugColor,
  width,
  height,
  duration = 50,
}) => {
  const rawHeight = useRef(new Animated.Value(0)).current;
  const zIndex = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rawHeight, {
        duration,
        useNativeDriver: false,
        toValue: visible ? height : 0,
      }),
      Animated.timing(zIndex, {
        duration,
        useNativeDriver: false,
        toValue: visible ? 1 : -100,
      }),
    ]).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        height: rawHeight,
        width,
        position,
        backgroundColor: debugColor,
        zIndex,
      }}>
      {children}
    </Animated.View>
  );
};
