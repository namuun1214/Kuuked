import React from 'react';
import { SafeAreaView } from 'react-native';
import { KuukedLogo } from '../../../assets';
import { Button, Center, Margin, Stack, Text } from '../../index';
import { Header } from '../../header';
const HealthScreen = () => {
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Үр дүн" />
      <Margin size={[2, 3, 4, 3]}>
        <Stack size={3}>
          <Center>
            <KuukedLogo />
            <Text>hah</Text>
            <Text>hah</Text>
            <Text>hah</Text>
            <Button
              backgroundRole="success"
              radius="xmedium"
              size={[4, 0, 4, 0]}
              textRole="light">
              Health
            </Button>
          </Center>
        </Stack>
      </Margin>
    </SafeAreaView>
  );
};

export default HealthScreen;
