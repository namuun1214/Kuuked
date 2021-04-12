import React, { useState } from 'react';
import { SafeAreaView, useWindowDimensions, View, Linking } from 'react-native';
import { Border, Margin, Stack, Text } from '../../index';
import { Header } from '../../header';
import { Center, Queue, Spacer } from '../../layout';
import { Button, RemoteImage } from '../../core';
import { useRoute } from '@react-navigation/core';
import { Route } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { ItemizeIcon, PhoneIcon } from '../../../assets';

const EmergencyDetailScreen = () => {
  const window = useWindowDimensions().width;
  const router = useRoute<Route<string, any>>();
  const item = router.params || {};
  const [saved, setSaved] = useState(false);
  const onCallPhone = () => {
    Linking.openURL(`tel:+976${item?.phone}`);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header withBack={true} headerText="Яаралтай тусламж" />
      <ScrollView>
        <Margin size={[5, 5, 5, 5]}>
          <Stack size={5}>
            <Text type="headline2" textAlign="center">
              {item?.name}
            </Text>
            <View style={{ maxHeight: 200 }}>
              <Center>
                <Border radius="large">
                  <RemoteImage url={item?.image} width={200} />
                </Border>
              </Center>
            </View>
            <Queue alignItems="center">
              <Text>Хаяг : </Text>
              <Text role="tertiary">
                {item?.address || 'Хаягийн мэдээлэл байхгүй байна'}
              </Text>
            </Queue>
            <Border topWidth="medium" role="info" />
            <Text>Үйл ажиллагааны чиглэл</Text>
            {item?.type &&
              item?.type.map(a => {
                return (
                  <Queue justifyContent="flex-start" alignItems="center">
                    <ItemizeIcon />
                    <Spacer horizintal={false} size={3} />
                    <Text type="paragraph" role="paragraph">
                      {a}
                    </Text>
                  </Queue>
                );
              })}
            <Queue size={3} alignItems="center">
              <Text>Утасны дугаар : </Text>
              <Text textAlign="justify" type="paragraph" role="paragraph">
                {item?.phone}
              </Text>
            </Queue>
            <Queue size={3} alignItems="center">
              <Text>Сошиал хаяг : </Text>
              <Text textAlign="justify" type="paragraph" role="paragraph">
                {item?.social}
              </Text>
            </Queue>
            <Button
              backgroundRole="success"
              leftIcon={<PhoneIcon />}
              textRole="secondary"
              onPress={() => {
                onCallPhone();
              }}>
              Залгах
            </Button>
          </Stack>
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyDetailScreen;
