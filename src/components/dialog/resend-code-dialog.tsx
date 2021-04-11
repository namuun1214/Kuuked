import { Route, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text } from '../core';
import { CorrectIcon } from '../../assets';
import { Margin, Stack, Center } from '../layout';
import { Dialog } from './dialog';

export const ResendCodeDialog: FC = () => {
  const router = useRoute<Route<string, any>>();
  const { description } = router.params || {};
  return (
    <Dialog>
      <Margin size={[4, 6, 4, 6]}>
        <Stack size={5}>
          <Stack size={5}>
            <Center>
              <CorrectIcon />
            </Center>
            <Text type="headline3" textAlign="center" role="success">
              {description || ' Баталгаажуулах кодыг бид таньд дахин илгээлээ'}
            </Text>
          </Stack>
        </Stack>
      </Margin>
    </Dialog>
  );
};
