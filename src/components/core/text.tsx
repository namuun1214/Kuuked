import React, { FC, useState, useContext } from 'react';
import { StyleSheet, Text as RawText } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mapRoleToTextColor } from '../theme';
import '../types';
import { fibonacci } from '../../utils';
import { ThemeContext } from '../theme';
const FONT_TYPES = {
  price: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '800',
  },
  title: {
    fontSize: 30,
    lineHeight: 40,
    fontWeight: '700',
  },
  headline1: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
  },
  headline2: {
    fontSize: 21,
    lineHeight: 24,
    fontWeight: '600',
  },
  headline3: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
  },
  primaryBody1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
  },
  primaryBody2: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
  },
  secondaryBody1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'normal',
  },
  secondaryBody2: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '800',
  },
  tertiaryBody1: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '600',
  },
  tertiaryBody2: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: 'normal',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal',
    letterSpacing: -0.24,
  },
};
import Clipboard from '@react-native-community/clipboard';
import { Border } from './border';
import { Center, Overlay, Padding } from '../layout';
export const CopyText: FC<TextType> = props => {
  const [copied, setCopied] = useState(false);
  const { children } = props || {};
  const copy = () => {
    setCopied(true);
    Clipboard.setString(`${children}`);
  };
  return (
    <TouchableOpacity onPress={copy}>
      <Border lineWidth="light" role="light" radius="xmedium">
        <Padding size={[3, 3, 3, 3]}>
          <Text {...props} />
          <Overlay right={10} top={3}>
            <Center flex={1}>
              <Text>{!copied ? `copy` : `copied`}</Text>
            </Center>
          </Overlay>
        </Padding>
      </Border>
    </TouchableOpacity>
  );
};
export const Text = ({
  role,
  type = 'primaryBody1',
  numberOfLines,
  children,
  textAlign,
  width,
  transform,
  heigthSize,
}: TextType) => {
  const { baseSpace } = useContext(ThemeContext);
  const style = StyleSheet.create({
    container: {
      ...FONT_TYPES[type],
      color: mapRoleToTextColor(role),
      transform,
    },
  });
  return (
    <RawText
      numberOfLines={numberOfLines}
      style={[
        {
          width: width || '100%',
          flexShrink: 1,
          textAlign: textAlign || 'left',
          height: fibonacci(heigthSize) * baseSpace || 'auto',
        },
        style.container,
      ]}>
      {children}
    </RawText>
  );
};

export const InteractiveText = ({
  children,
  onPress,
  ...props
}: TextType & { onPress?: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text {...props}>{children}</Text>
    </TouchableOpacity>
  );
};
