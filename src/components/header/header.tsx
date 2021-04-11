import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Margin, Queue } from '..';
import { KuukedLogoWhite } from '../../assets';
import { BackArrowIcon, MenuIcon } from '../../assets/icons';
import { Border, Text } from '../core';
import { Center, Overlay, Padding } from '../layout';
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
  const handleMenuClick = () => {
    // navigation.navigate(NavigationRoutes.SideMenu);
    setMenuClicked(!menuClicked);
  };
  const [menuClicked, setMenuClicked] = useState(false);
  return (
    <>
      <Border backgroundRole="info">
        <Padding size={[2, 0, 2, 2]}>
          <Margin size={[2, 1, 0, 2]}>
            {withBack && (
              <Queue
                size={5}
                alignItems="center"
                justifyContent={menu ? 'space-between' : 'flex-start'}>
                <TouchableOpacity onPress={goBack}>
                  <BackArrowIcon width={'10'} height={'40'} role="primary" />
                </TouchableOpacity>
                {headerText && (
                  <Text role="primary" type="primaryBody1" textAlign="center">
                    {headerText}
                  </Text>
                )}
                {menu && (
                  <TouchableOpacity
                    onPress={() => {
                      handleMenuClick();
                    }}>
                    <MenuIcon />
                  </TouchableOpacity>
                )}
              </Queue>
            )}
            {!withBack && (
              <Queue justifyContent="space-between">
                <Center>
                  <KuukedLogoWhite width={80} height={40} />
                </Center>
                {menu && (
                  <TouchableOpacity
                    onPress={() => {
                      handleMenuClick();
                    }}>
                    <MenuIcon />
                  </TouchableOpacity>
                )}
              </Queue>
            )}
          </Margin>
        </Padding>
      </Border>
      {menuClicked && <SideMenu />}
    </>
  );
};
