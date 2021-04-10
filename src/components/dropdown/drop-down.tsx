import React, { createContext, useContext, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowDownIcon } from '../../assets/icons';
import { AnimatedFadeInView } from '../animated';
import { Border, Text } from '../core';
import { Background, Center, Overlay, Padding, Queue } from '../layout';
import '../types';

const DropDownContext = createContext({
  visible: false,
  setVisible: (visible: boolean) => {},
});

export const DropDown = {
  Provider: ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
      <DropDownContext.Provider value={{ visible, setVisible }}>
        {children}
      </DropDownContext.Provider>
    );
  },
  Content: props => {
    const { children, width } = props;
    const { visible } = useContext(DropDownContext);
    return (
      <View style={{ zIndex: 99 }}>
        <AnimatedFadeInView visible={visible}>
          {/* <Overlay zIndex={99}> */}
          <Background width={width || 120}>
            <Border
              radius="large"
              backgroundRole="light"
              role="primary"
              {...props}>
              <Padding size={[5, 3, 3, 3]}>{children}</Padding>
            </Border>
          </Background>
          {/* </Overlay> */}
        </AnimatedFadeInView>
      </View>
    );
  },
  Trigger: props => {
    const { children, width } = props;
    const { visible, setVisible } = useContext(DropDownContext);
    return (
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Background width={width || 120}>
          <Border
            radius="large"
            backgroundRole="light"
            role="primary"
            {...props}>
            <Padding size={[3, 3, 3, 3]}>
              <Queue size={3} justifyContent="space-between">
                <Text role="success">{children || 'Сонгоно уу...'}</Text>
                <Center flex={1}>
                  <ArrowDownIcon />
                </Center>
              </Queue>
            </Padding>
          </Border>
        </Background>
      </TouchableOpacity>
    );
  },
};
