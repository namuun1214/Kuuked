import React, { useContext } from 'react';
import { Dimensions, Pressable, SafeAreaView, View } from 'react-native';
import { Border, Button, Margin, RemoteImage, Stack, Text } from '../../index';
import { Header } from '../../header';
import _ from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';
import { useFirestoreCollection } from '../../../firebase';
import { Center, Padding } from '../../layout';
import { CatalogContext } from './categoryProvider';

const window = Dimensions.get('window');
const DailyRoutine = (props: {
  url: any;
  name: any;
  catalog: any;
  setCatalog: any;
}) => {
  const { url, name, catalog, setCatalog } = props;
  const isSelected = (item: any) => _.some(catalog, item);
  const newCatalog = { name, url };
  const selected = isSelected(newCatalog);
  const addCatalog = newCatalog => {
    if (isSelected(newCatalog)) {
      setCatalog(_.without(catalog, newCatalog));
      return;
    }
    setCatalog((catalog: any) => {
      return _.uniq([...catalog, newCatalog]);
    });
  };

  return (
    <Pressable
      onPress={() => {
        addCatalog(newCatalog);
      }}>
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
      </Margin>
    </Pressable>
  );
};

export default () => {
  let { data, loading } = useFirestoreCollection(['catalog']);
  const { catalog, setCatalog, save } = useContext(CatalogContext);
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Категори сонгох" />
      <ScrollView>
        <Margin size={[4, 3, 0, 3]}>
          <Stack size={3}>
            <Text type="headline3" textAlign="center">
              Та хүүхдийнхээ ямар ямар мэдээллийг бүртгэхийг хүсч байна?
            </Text>
            <Text role="info" type="primaryBody2" textAlign="center">
              Хамгийн багадаа 3-ыг сонгоно уу
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
                  return (
                    <DailyRoutine
                      url={image}
                      name={name}
                      catalog={catalog}
                      setCatalog={setCatalog}
                    />
                  );
                })}
            </View>
            <Button
              backgroundRole="success"
              radius="xmedium"
              size={[4, 0, 4, 0]}
              onPress={save}
              textRole="light">
              Сонгох
            </Button>
          </Stack>
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};
