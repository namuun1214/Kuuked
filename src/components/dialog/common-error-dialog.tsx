import { Route, useNavigation, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { AsyncButton, Text } from '../core';
import { Margin, Stack } from '../layout';
import { Dialog } from './dialog';

export const CommonErrorDialog: FC = () => {
  const navigation = useNavigation();
  const router = useRoute<Route<string, any>>();
  const { title, description, retry } = router.params || {};
  const accept = () => {
    retry && retry();
    navigation.goBack();
  };
  return (
    <Dialog>
      <Margin size={[4, 4, 4, 4]}>
        <Stack size={5}>
          <Stack size={3}>
            <Text type="headline2" textAlign="center">
              {title || 'Уучлаарай!'}
            </Text>
            <Text type="secondaryBody1" role="info" textAlign="center">
              {description || ' Алдаа гарлаа.'}
            </Text>
          </Stack>
          <Stack size={2}>
            {retry && (
              <AsyncButton
                size={[4, 0, 4, 0]}
                backgroundRole="success"
                textRole="primary"
                radius="xlarge"
                onPress={accept}>
                Дахин оруулна уу
              </AsyncButton>
            )}
            <AsyncButton
              size={[4, 0, 4, 0]}
              borderRole={'none'}
              textRole="success"
              onPress={() => navigation.goBack()}>
              Буцах
            </AsyncButton>
          </Stack>
        </Stack>
      </Margin>
    </Dialog>
  );
};
