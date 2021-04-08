import { Route, useNavigation, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { Button, Text } from '../core';
import { Center, Margin, Stack } from '../layout';
import { Dialog } from './dialog';

export const AffirmRejectDialog: FC<any> = () => {
  const navigation = useNavigation();
  const router = useRoute<Route<string, any>>();
  const { title, description, onAffirm, onReject, icon } = router.params || {};
  const affirm = () => {
    onAffirm && onAffirm();
    navigation.goBack();
  };
  const reject = () => {
    onReject && onReject();
    // navigation.goBack();
  };
  return (
    <Dialog>
      <Margin size={[0, 6, 0, 6]}>
        <Stack size={title ? 4 : 2}>
          {icon && (
            <Margin size={[0, 0, 5, 0]}>
              <Center>{icon}</Center>
            </Margin>
          )}
          {title && (
            <Text type="headline2" textAlign="center">
              {title}
            </Text>
          )}
          {description && (
            <Text type="tertiaryBody2" textAlign="center">
              {description}
            </Text>
          )}
          <Margin size={[0, 4, 0, 4]}>
            <Stack size={2}>
              <Button
                backgroundRole="success"
                borderRole="success"
                textRole="light"
                radius="xlarge"
                size={[3, 5, 3, 5]}
                onPress={affirm}>
                Зөвшөөрөх
              </Button>
              {onReject && (
                <Button onPress={reject} radius="xlarge" size={[3, 5, 3, 5]}>
                  Татгалзах
                </Button>
              )}
            </Stack>
          </Margin>
        </Stack>
      </Margin>
    </Dialog>
  );
};
