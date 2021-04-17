import { Route, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Border, Button, Text } from '../..';
import { Header } from '../../header';
import { Center, Margin, Queue, Stack } from '../../layout';
const SurgeryDetail = ({ item }) => {
  return (
    <Stack size={6}>
      <Text type="headline3" textAlign="center" role="success">
        Үзлэгийн мэдээлэл
      </Text>
      <Stack size={2}>
        <Text>Он сар өдөр</Text>
        <Text type="secondaryBody1" role="tertiary">
          {moment.unix(item.createdAt.seconds).format('MM/DD/YYYY').toString()}
        </Text>
      </Stack>
      <Queue size={3} justifyContent="space-between" alignItems="center">
        <Stack size={2}>
          <Queue>
            <Text>Өндөр</Text>
            <Text> / см</Text>
          </Queue>
          <Border>
            <Text type="secondaryBody1" role="tertiary">
              {item?.height}
            </Text>
          </Border>
        </Stack>

        <Stack size={2}>
          <Queue>
            <Text>Жин</Text>
            <Text> / кг</Text>
          </Queue>
          <Border>
            <Text type="secondaryBody1" role="tertiary">
              {item?.width}
            </Text>
          </Border>
        </Stack>
        <Stack size={2}>
          <Queue>
            <Text>Т.тойрог</Text>
            <Text> / см</Text>
          </Queue>
          <Border>
            <Text type="secondaryBody1" role="tertiary">
              {item?.head}
            </Text>
          </Border>
        </Stack>
      </Queue>
      <View style={{ flexDirection: 'column' }}>
        <Text>Зовиур</Text>
        <Border>
          <Text type="secondaryBody1" role="tertiary">
            {item?.symptom}
          </Text>
        </Border>
      </View>
      <Stack size={2}>
        <Text>Үзлэгийн тэмдэглэл</Text>
        <Border>
          <Text type="secondaryBody1" role="tertiary">
            {item?.note}
          </Text>
        </Border>
      </Stack>
      <Stack size={2}>
        <Text>Бичсэн эмчилгээ</Text>
        <Border>
          <Text type="secondaryBody1" role="tertiary">
            {item?.treatment}
          </Text>
        </Border>
      </Stack>
      <Stack size={2}>
        <Text>Эмчийн нэр утас</Text>
        <Border>
          <Text type="secondaryBody1" role="tertiary">
            {item?.doctorName}
          </Text>
        </Border>
        <Border>
          <Text type="secondaryBody1" role="tertiary">
            {item?.doctorPhone}
          </Text>
        </Border>
      </Stack>
      <Button
        backgroundRole="error"
        radius="xlarge"
        size={[4, 7, 4, 7]}
        textRole="light"
        onPress={() => {
          //   saveSurgery();
        }}>
        Устгах
      </Button>
    </Stack>
  );
};
const SymptomDetail = ({ item }) => {
  const styles = StyleSheet.create({
    imageStyle: {
      width: 100,
      height: 100,
      margin: 5,
      borderRadius: 5,
    },
  });
  return (
    <Stack size={4}>
      <Text type="headline3" textAlign="center" role="success">
        Шинж тэмдэгийн мэдээлэл
      </Text>
      <Stack size={2}>
        <Text>Он сар өдөр</Text>
        <Text type="secondaryBody1" role="tertiary">
          {moment.unix(item.createdAt.seconds).format('MM/DD/YYYY').toString()}
        </Text>
      </Stack>
      <Stack size={2}>
        <Text>Шинж тэмдэг</Text>
        <Text type="secondaryBody1" role="tertiary">
          {item?.symptom}
        </Text>
      </Stack>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {item?.images &&
          item?.images.map(file => {
            return (
              <Image source={{ uri: file.uri }} style={styles.imageStyle} />
            );
          })}
      </View>
      <Stack size={2}>
        <Text>Хэзээнээс илэрсэн</Text>
        <Text type="secondaryBody1" role="tertiary">
          {' '}
          {item?.when}
          {' хоногийн өмнөөс'}
        </Text>
      </Stack>
      <Stack size={2}>
        <Text>Авсан арга хэмжээ</Text>
        <Text type="secondaryBody1" role="tertiary">
          {item?.respond}
        </Text>
      </Stack>
      <Button
        backgroundRole="error"
        radius="xlarge"
        size={[4, 7, 4, 7]}
        textRole="light"
        onPress={() => {
          //
        }}>
        Устгах
      </Button>
    </Stack>
  );
};
export const HealthDetailScreen = () => {
  const router = useRoute<Route<string, any>>();
  const item = router.params || {};
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Дэлгэрэнгүй" />
      <Margin size={[5, 5, 5, 5]}>
        {item?.treatment && <SurgeryDetail item={item} />}
        {item?.respond && <SymptomDetail item={item} />}
      </Margin>
    </SafeAreaView>
  );
};
