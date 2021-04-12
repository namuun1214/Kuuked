import React, { FC, useState } from 'react';
import { Pressable } from 'react-native';
import { AnimatedFadeInView, Spinner } from '../animated';
import { Overlay, Padding } from '../layout';
import { Center } from '../layout/center';
import { Border } from './border';
import { Text } from './text';

export type ButtonType = {
  size?: number[];
  onPress?: any;
  children?: any;
  loading?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  disabled?: boolean;
  lineWidth?: LineWidthType;
  backgroundRole?: BackgroundRoleType;
  textRole?: TextRoleType;
  borderRole?: BorderRoleType;
  radius?: BorderRadius;
  type?:
    | 'price'
    | 'headline1'
    | 'headline2'
    | 'headline3'
    | 'primaryBody1'
    | 'primaryBody2'
    | 'secondaryBody1'
    | 'secondaryBody2'
    | 'tertiaryBody1'
    | 'tertiaryBody2'
    | 'paragraph';
};

export const Button: FC<ButtonType> = props => {
  const {
    size = [4, 0, 4, 0],
    onPress,
    children,
    disabled,
    leftIcon,
    rightIcon,
    lineWidth = 'light',
    backgroundRole = 'primary',
    textRole,
    borderRole = 'light',
    radius = 'xmedium',
  } = props;

  return (
    <Pressable
      style={{
        opacity: disabled ? 0.4 : 1,
      }}
      disabled={disabled}
      onPress={onPress}>
      <Border
        {...props}
        radius={radius}
        role={borderRole}
        backgroundRole={backgroundRole}
        lineWidth={lineWidth}>
        <Padding size={size}>
          <Center>
            <Text role={textRole} textAlign="center" {...props}>
              {children}
            </Text>
          </Center>
        </Padding>
        <Overlay left={30} height="100%">
          <AnimatedFadeInView height="100%" visible={!!leftIcon}>
            <Center flex={1}>{leftIcon}</Center>
          </AnimatedFadeInView>
        </Overlay>
        <Overlay right={30} height="100%">
          <AnimatedFadeInView height="100%" visible={!!rightIcon}>
            <Center flex={1}>{rightIcon}</Center>
          </AnimatedFadeInView>
        </Overlay>
      </Border>
    </Pressable>
  );
};

export const AsyncButton: FC<ButtonType & { error?: any }> = props => {
  const { onPress } = props;
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);
    try {
      onPress && (await onPress());
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      {...props}
      loading={loading}
      onPress={onClick}
      rightIcon={
        <AnimatedFadeInView visible={loading}>
          <Spinner size={15} />
        </AnimatedFadeInView>
      }
    />
  );
};
