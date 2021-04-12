import React from 'react';
import { SafeAreaView } from 'react-native';
import { Margin } from '../../index';
import { Header } from '../../header';
import { ScrollView } from 'react-native-gesture-handler';
const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Профайл" />
      <ScrollView>
        <Margin size={[2, 3, 0, 3]}></Margin>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
