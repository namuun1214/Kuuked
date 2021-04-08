import React, { useMemo } from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mapRoleToBackgroundColor, Margin } from '../../components';

export const BasicScreen = ({ children, size = [2, 3, 0, 3] }) => {
  const insets = useSafeAreaInsets();
  const safeAreaStyle: ViewStyle = useMemo(() => {
    const style: ViewStyle = {};
    style.paddingTop = insets.top;
    style.paddingBottom = insets.bottom;
    style.paddingLeft = insets.left;
    style.paddingRight = insets.right;

    return style;
  }, [insets]);
  return (
    <View
      style={[
        safeAreaStyle,
        {
          backgroundColor: mapRoleToBackgroundColor('primary'),
          flex: 1,
        },
      ]}>
      <ScrollView>
        <Margin size={size}>{children}</Margin>
      </ScrollView>
    </View>
  );
};

export const SafeAreaScreen = ({ children, size = [2, 3, 0, 3] }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: mapRoleToBackgroundColor('primary'),
      }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Margin grow={1} size={size}>
          {children}
        </Margin>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
