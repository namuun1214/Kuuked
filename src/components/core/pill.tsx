import React, { FC } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { Padding } from '../layout';
import { Border } from './border';
import { Text } from './text';

type PillType = {
  onPress?: any;
  children?: any;
  loading?: boolean;
  flat?: boolean;
  textAlign?: TextAlign;
};

export const Pill: FC<PillType> = props => {
  const { onPress, children, loading, flat, textAlign } = props;

  return (
    <Pressable onPress={onPress}>
      <Border
        radius="large"
        backgroundRole={(!flat && 'success') || 'transparent'}>
        <Padding size={[2, 4, 2, 4]}>
          {loading && <ActivityIndicator />}
          {!loading && (
            <Text
              role={!flat ? 'light' : 'success'}
              type="tertiaryBody2"
              textAlign={textAlign}>
              {children}
            </Text>
          )}
        </Padding>
      </Border>
    </Pressable>
  );
};
