import React from 'react';
import { Dimensions, View } from 'react-native';
import { CheckMarkIcon } from '../../assets';
import { Circle, Text } from '../core';
import { Center, Overlay } from '../layout';
import _ from 'lodash';
import styled from 'styled-components';
import { mapRoleToBackgroundColor } from '../theme';
import moment from 'moment';
import 'moment/locale/mn';

const StepperHead = props => {
  const { completed = true, size = 20 } = props;
  return (
    <Overlay position="relative">
      <Circle
        size={size}
        opacity={0.45}
        backgroundRole={completed ? 'lightSuccess' : 'tertiary'}
      />
      <Overlay height="100%" width="100%">
        <Center flex={1}>
          <Circle
            size={(size * 5) / 7}
            backgroundRole={completed ? 'success' : 'grey'}>
            <Center flex={1}>
              <CheckMarkIcon height={size / 2} width={size / 2} />
            </Center>
          </Circle>
        </Center>
      </Overlay>
    </Overlay>
  );
};

const StepperConnector = props => {
  const { role, width, horizontal } = props;
  return (
    <View
      style={{
        flex: !horizontal && 1,
        flexDirection: horizontal ? 'column' : 'row',
        backgroundColor: mapRoleToBackgroundColor(role),
        height: horizontal ? Dimensions.get('window').height / 14 : width || 3,
        width: (horizontal && width) || 3,
      }}
    />
  );
};

const StepperInfo = props => {
  const { horizontal, label, description, createdAt } = props;
  const timeStamp = createdAt?.toDate();
  moment.locale('mn');
  const day = moment(timeStamp).format('ll, h:mm:ss');
  return (
    <>
      <Overlay
        top={horizontal && 0}
        bottom={!horizontal ? -20 : 0}
        left={horizontal && 40}>
        <Center flex={1}>
          <Text
            role="info"
            numberOfLines={1}
            textAlign={horizontal ? 'left' : 'center'}>
            {horizontal ? day : label || 'Түр хүлээнэ үү...'}
          </Text>
        </Center>
      </Overlay>
      <Overlay top={horizontal && 30} left={horizontal && 40}>
        {horizontal && <Text>{description || 'Түр хүлээнэ үү...'}</Text>}
      </Overlay>
    </>
  );
};

const StepperWrapper = styled.View<any>`
  flex-direction: ${({ horizontal }: any) => (horizontal ? 'column' : 'row')};
  align-items: center;
`;

export const Stepper = props => {
  const { horizontal, steps } = props;
  return (
    <View style={{ flexDirection: horizontal && 'row' }}>
      <StepperWrapper horizontal={horizontal}>
        {_.flow(steps =>
          _.map(steps, (step, index) => {
            const { active = true } = step || {};
            if (parseInt(index) === steps.length - 1) {
              return (
                <Center>
                  <StepperHead {...step} {...props} />
                  <StepperInfo horizontal={horizontal} {...step} />
                </Center>
              );
            }
            return (
              <>
                <Center>
                  <StepperHead {...step} {...props} />
                  <StepperInfo horizontal={horizontal} {...step} />
                </Center>
                <StepperConnector
                  role={active ? 'success' : 'grey'}
                  {...props}
                />
              </>
            );
          }),
        )(steps)}
      </StepperWrapper>
    </View>
  );
};
