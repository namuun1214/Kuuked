import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { mapRoleToBackgroundColor } from '../theme';
import '../types';
import { Spacer } from './spacer';

export const Queue: FC<QueueType> = props => {
  const { size = 0, children, role, justifyContent, alignItems } = props;
  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: mapRoleToBackgroundColor(role),
      justifyContent,
      alignItems,
    },
  });
  return (
    <View style={style.container}>
      {React.Children.toArray(children).map((child, index) => {
        if ((index = 0)) {
          return { child };
        }
        return (
          <View>
            <Spacer horizontal={false} size={size} />
            {child}
          </View>
        );
      })}
    </View>
  );
};
