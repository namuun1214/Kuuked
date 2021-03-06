import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, SafeAreaView, View } from 'react-native';
import { Border, Button, Margin, RemoteImage, Stack, Text } from '../../index';
import { Header } from '../../header';
import _ from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';
import { useFirestoreCollection } from '../../../firebase';
import { Center, Overlay, Padding } from '../../layout';
import { CatalogContext } from './categoryProvider';
import { useNavigation } from '@react-navigation/core';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { CorrectIcon } from '../../../assets';
import { delay } from '../../../utils';
import { SuccessPopUp } from '../../pop-up';

const window = Dimensions.get('window');
const DailyRoutine = (props: {
  url: string;
  name: string;
  selected: boolean;
}) => {
  const { url, name, selected } = props;

  return (
    <Margin size={[2, 2, 2, 2]}>
      <Border
        radius="large"
        role={selected ? 'success' : 'primary'}
        lineWidth="light"
        backgroundRole="light">
        <Padding size={[2, 2, 2, 2]}>
          <Stack size={2} width={window.width / 4}>
            <Center>
              <RemoteImage width={60} resizeMode="contain" url={url} />
            </Center>
            <Text type="secondaryBody2" numberOfLines={2} textAlign="center">
              {name}
            </Text>
          </Stack>
        </Padding>
      </Border>
      <Overlay zIndex={99} top={-1} right={0}>
        {selected && <CorrectIcon />}
      </Overlay>
    </Margin>
  );
};

export const SelectCategoryScreen = () => {
  const navigation = useNavigation();
  let { data } = useFirestoreCollection(['catalog']);
  const { save, catalog } = useContext(CatalogContext);
  const [catalogList, setCatalogList] = useState([]);
  const [isDone, setDone] = useState(false);
  const isSelected = (item: any) => _.some(catalogList, item);
  useEffect(() => {
    setCatalogList(catalog);
  }, [catalog]);
  const addCatalog = newCatalog => {
    if (isSelected(newCatalog)) {
      setCatalogList(_.without(catalogList, newCatalog));
      return;
    }
    setCatalogList(catalogList => {
      return _.uniq([...catalogList, newCatalog]);
    });
  };
  const saveCatalog = async () => {
    save(catalogList);
    setDone(true);
    await delay(1500);
    navigation.navigate(NavigationRoutes.MainRoot);
  };
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="???????????????? ????????????" />
      <ScrollView>
        <Margin size={[4, 3, 0, 3]}>
          <Stack size={3}>
            <Text type="headline3" textAlign="center">
              ???? ?????????????????????? ???????? ???????? ???????????????????? ???????????????????? ???????? ???????????
            </Text>
            <Text role="info" type="primaryBody2" textAlign="center">
              ?????????????? ?????????????? 3-???? ?????????????? ????
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              {data &&
                data.map((category: { image: any; name: any }) => {
                  let { image, name } = category;
                  const selected = isSelected(category);
                  return (
                    <Pressable
                      onPress={() => {
                        addCatalog(category);
                      }}>
                      <DailyRoutine
                        url={image}
                        name={name}
                        selected={selected}
                      />
                    </Pressable>
                  );
                })}
            </View>
            <Button
              backgroundRole="success"
              radius="xmedium"
              size={[4, 0, 4, 0]}
              onPress={saveCatalog}
              textRole="light">
              ????????????
            </Button>
          </Stack>
          {isDone && <SuccessPopUp />}
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};
