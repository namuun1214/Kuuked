import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, Platform } from 'react-native';

export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const fibonacci = _.memoize(function (n = 0) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

export const KeyboardAvoidanceView = ({ children, debugColor }) => {
  const shift = useRef(new Animated.Value(0)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  const keyboardDidShowHandler = event => {
    setKeyboardHeight(event.endCoordinates.height);
    setIsAnimated(true);
  };

  const keyboardDidHideHandler = () => {
    setIsAnimated(false);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShowHandler);
    Keyboard.addListener('keyboardDidHide', keyboardDidHideHandler);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShowHandler);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHideHandler);
    };
  }, []);

  useEffect(() => {
    Animated.timing(shift, {
      duration: 250,
      useNativeDriver: true,
      toValue: isAnimated
        ? -(Platform.OS === 'ios' ? keyboardHeight / 1.25 : keyboardHeight / 10)
        : 0,
    }).start();
  }, [isAnimated]);

  return (
    <Animated.View
      style={{
        flex: 1,
        position: 'relative',
        flexGrow: 1,
        transform: [{ translateY: shift }],
        width: '100%',
        backgroundColor: debugColor,
      }}>
      {children}
    </Animated.View>
  );
};
