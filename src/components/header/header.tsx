import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Margin, Queue } from '..';
import { KuukedLogoWhite } from '../../assets';
import { BackArrowIcon, MenuIcon } from '../../assets/icons';
import { Border, Text } from '../core';
import { Center, Padding } from '../layout';
import { useNavigation } from '@react-navigation/native';
import Drawer from 'react-native-drawer';
import { NavigationRoutes } from '../navigation/navigation-param';
import { SideMenu } from './sidemenu';
import HomeScreen from '../screen/home/home-screen';
export const Header = ({ withBack = false, headerText = '', menu = true }) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const [menuClicked, setMenuClicked] = useState(false);

  const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
  };
  return (
    <Border backgroundRole="info">
      <Padding size={[2, 0, 2, 2]}>
        <Margin size={[2, 1, 0, 2]}>
          {withBack && (
            <Queue
              size={5}
              alignItems="center"
              justifyContent={menu ? 'space-between' : 'flex-start'}>
              <TouchableOpacity onPress={goBack}>
                <BackArrowIcon width={'10'} height={'40'} role="tertiary" />
              </TouchableOpacity>
              {headerText && (
                <Text role="tertiary" type="primaryBody1" textAlign="center">
                  {headerText}
                </Text>
              )}
              {menu && (
                <TouchableOpacity
                  onPress={() => {
                    setMenuClicked(!menuClicked);
                  }}>
                  <MenuIcon />
                </TouchableOpacity>
              )}
            </Queue>
          )}
          {!withBack && (
            <Queue>
              <Center>
                <KuukedLogoWhite width={80} height={40} />
              </Center>
            </Queue>
          )}
        </Margin>
      </Padding>
    </Border>
  );
};
