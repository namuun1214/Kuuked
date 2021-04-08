import React, { useEffect, useRef, FC } from 'react';
import { Animated } from 'react-native';
export const AnimatedSlideDownView: FC<any> = ({
  position,
  visible,
  children,
  debugColor,
  width,
  height,
  duration = 250,
}) => {
  const rawHeight = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
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
      Animated.timing(opacity, {
        duration,
        useNativeDriver: false,
        toValue: visible ? 1 : 0,
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
        opacity,
        zIndex,
      }}>
      {children}
    </Animated.View>
  );
};

export const AnimatedSlideDownViewWithFlex: FC<any> = ({
  position,
  visible,
  children,
  debugColor,
  width,
  height,
  duration = 250,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const zIndex = useRef(new Animated.Value(0)).current;
  const rawHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(zIndex, {
        duration,
        useNativeDriver: false,
        toValue: visible ? 1 : -100,
      }),
      Animated.timing(opacity, {
        duration,
        useNativeDriver: false,
        toValue: visible ? 1 : 0,
      }),
      Animated.timing(rawHeight, {
        duration,
        useNativeDriver: false,
        toValue: visible ? height || 200 : 0,
      }),
    ]).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        width,
        position,
        backgroundColor: debugColor,
        opacity,
        zIndex,
        height: rawHeight,
        flex: 0,
      }}>
      {children}
    </Animated.View>
  );
};
