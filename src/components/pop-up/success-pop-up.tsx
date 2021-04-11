import React from 'react';
import { Text } from '../core';
import { Margin, Stack, Center } from '../layout';
import { PopUp } from './pop-up';
import { CorrectIcon } from '../../assets';

export const SuccessPopUp = props => {
  const { icon, description } = props;
  return (
    <PopUp>
      <Margin size={[6, 2, 6, 2]}>
        <Stack size={5}>
          <Center>{icon || <CorrectIcon />}</Center>
          <Center>
            <Text type="headline3" textAlign="center" width="70%">
              {description || 'Амжилттай боллоо'}
            </Text>
          </Center>
        </Stack>
      </Margin>
    </PopUp>
  );
};
