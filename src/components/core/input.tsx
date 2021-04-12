import IMask from 'imask';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { CheckboxMarkIcon } from '../../assets/icons';
import { AnimatedFadeInView } from '../animated';
import { Center, Overlay, Padding } from '../layout';
import { Border } from './border';

type InputType = {
  height?: number | string;
  width?: number | string;
  success?: boolean;
  error?: boolean;
  multiline?: boolean;
  autoCorrect?: boolean;
  size?: number[];
  alignment?: 'center' | 'left' | 'right';
  leftIcon?: React.Component | Element;
  rightIcon?: React.Component | JSX.Element;
  placeholder?: string;
  onChangeText?: (string) => void;
  onFocus?: () => void;
  loading?: boolean;
  keyboardType?: 'numeric' | 'default';
  maxLength?: number;
  numberOfLines?: number;
  autoFocus?: boolean;
  borderRole?: BorderRoleType;
  defaultValue?: string;
};

export const AutoVerifiedInput: FC<any> = React.forwardRef((props, ref) => {
  let [loading, setLoading] = useState(false);
  let [success, setSuccess] = useState(false);
  let [error, setError] = useState(false);
  const { needToVerify, onSubmit, onSuccess } = props;
  const onChangeText = async text => {
    setSuccess(false);
    setError(false);
    if (!(await needToVerify(text))) {
      return;
    }
    setLoading(true);
    try {
      await onSubmit(text);
      setSuccess(true);
      onSuccess && onSuccess(text);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  return (
    <MaskedInput
      ref={ref}
      {...props}
      onChangeText={onChangeText}
      loading={loading}
      success={success}
      error={error}
    />
  );
});

export const MaskedInput = props => {
  const { onChangeText, mask, text: defaultValue, ref, ...rest } = props;
  const [value, setValue] = useState(null);
  const iMask = mask && IMask.createMask({ mask });
  useEffect(() => {
    const maskedValue =
      (mask && iMask.resolve(defaultValue || '')) || defaultValue;
    setValue(maskedValue);
  }, [defaultValue]);
  const onChange = (text?: string) => {
    const maskedValue = (mask && iMask.resolve(text || '')) || text;
    setValue(maskedValue);
    if (!onChangeText) {
      return;
    }
    onChangeText(iMask?.unmaskedValue || text);
  };
  return <Input ref={ref} {...rest} onChangeText={onChange} value={value} />;
};

export const Input: FC<InputType & BorderType> = props => {
  const {
    width,
    success,
    error,
    size,
    alignment,
    leftIcon,
    rightIcon,
    borderRole,
    onChangeText,
    loading,
    defaultValue,
  } = props;
  const [value, setValue] = useState(defaultValue || '');
  const inputElement = useRef(null);
  const style = StyleSheet.create({
    container: {
      fontSize: 14,
      lineHeight: 16,
      fontWeight: '400',
      textAlign: alignment,
      alignItems: 'center',
      justifyContent: 'center',
      width: width || '90%',
    },
  });

  const onChange = text => {
    setValue(text);
    onChangeText && onChangeText(text);
  };
  return (
    <Pressable
      onPress={() => {
        inputElement.current.focus();
      }}>
      <Border {...props} role={borderRole}>
        <Padding
          size={size || (Platform.OS === 'ios' ? [4, 0, 4, 4] : [0, 0, 0, 2])}>
          <TextInput
            style={style.container}
            defaultValue={value}
            onChangeText={onChange}
            ref={inputElement}
            {...props}
          />
        </Padding>
        <Overlay right={10} height="100%">
          <AnimatedFadeInView visible={loading} height="100%">
            <Center flex={1}>
              <ActivityIndicator
                color="black"
                size={Platform.OS === 'ios' ? 'small' : 20}
              />
            </Center>
          </AnimatedFadeInView>
        </Overlay>
        <Overlay right={10} height="100%">
          <Center flex={1}>{rightIcon}</Center>
        </Overlay>

        <Overlay left={10} height="100%">
          <Center flex={1}>{leftIcon}</Center>
        </Overlay>
        <Overlay right={10} height="100%">
          <AnimatedFadeInView visible={success} height="100%">
            <Center flex={1}>
              <CheckboxMarkIcon />
            </Center>
          </AnimatedFadeInView>
        </Overlay>
        <Overlay right={10} height="100%">
          <AnimatedFadeInView visible={error} height="100%">
            <Center flex={1}>
              <ActivityIndicator
                color="red"
                size={Platform.OS === 'ios' ? 'small' : 20}
              />
            </Center>
          </AnimatedFadeInView>
        </Overlay>
      </Border>
    </Pressable>
  );
};
