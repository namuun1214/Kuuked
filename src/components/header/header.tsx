import React, { useContext, useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { Margin, Queue } from '..';
import { KuukedLogoWhite } from '../../assets';
import { BackArrowIcon, MenuIcon } from '../../assets/icons';
import { Border, Text } from '../core';
import { Center, Padding } from '../layout';
import { useNavigation } from '@react-navigation/native';
import { SideMenu } from './sidemenu';
import { UserContext } from '../screen/home/userProvider';
export const Header = ({ withBack = false, headerText = '', menu = true }) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const { isMenuClicked, setMenuClicked } = useContext(UserContext);
  const handleMenuClick = () => {
    // navigation.navigate(NavigationRoutes.SideMenu);
    setMenuClicked(!isMenuClicked);
  };

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
                <Pressable onPress={goBack}>
                  <BackArrowIcon width={'10'} height={'40'} role="primary" />
                </Pressable>
                {headerText && (
                  <Text role="primary" type="primaryBody1" textAlign="center">
                    {headerText}
                  </Text>
                )}
                {menu && (
                  <Pressable
                    onPress={() => {
                      handleMenuClick();
                    }}>
                    <MenuIcon />
                  </Pressable>
                )}
              </Queue>
            )}
            {!withBack && (
              <Queue justifyContent="space-between">
                <Center>
                  <KuukedLogoWhite width={80} height={40} />
                </Center>
                {menu && (
                  <Pressable
                    onPress={() => {
                      console.log('aanh');
                      handleMenuClick();
                    }}>
                    <MenuIcon />
                  </Pressable>
                )}
              </Queue>
            )}
          </Margin>
        </Padding>
      </Border>
      {isMenuClicked && <SideMenu />}
    </>
  );
};
