import React from 'react';
import { View } from 'react-native';
import { mapRoleToBackgroundColor } from '../theme';
import '../types';
import { Spacer } from './spacer';

export const Stack = ({
  size = 0,
  children,
  role,
  height,
  width,
  maxWidth,
  zIndex,
}: StackType) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: mapRoleToBackgroundColor(role),
        height,
        width,
        maxWidth,
        zIndex,
      }}>
      {React.Children.toArray(children).map((child, index) => {
        if (index == 0) {
          return <View>{child}</View>;
        }
        return (
          <View>
            <Spacer horizontal={true} size={size} />
            {child}
          </View>
        );
      })}
    </View>
  );
};
