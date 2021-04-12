import { useNavigation } from '@react-navigation/core';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { Border, Button, Input, Margin, Stack, SuccessPopUp } from '../..';
import { AddImageIcon } from '../../../assets';
import { USERS_HOME, useUserUID } from '../../../authentication';
import { useFirestoreCollection } from '../../../firebase';
import { PermissionContext } from '../../../permission/photoPermission';
import { delay } from '../../../utils';
import { NavigationRoutes } from '../../navigation/navigation-param';

export const MemoryLog = () => {
  const { filePath, chooseFile, captureImage, setFilePath } = useContext(
    PermissionContext,
  );
  const styles = StyleSheet.create({
    imageStyle: {
      width: 100,
      height: 100,
      margin: 5,
      borderRadius: 5,
    },
  });

  const articles = [
    'Шинэ зүйл сурлаа',
    'Хөгжилтэй агшин',
    'Хөөрхөн шүү',
    'Ээжтэйгээ',
    'Ганганаа',
  ];
  const navigation = useNavigation();
  const uid = useUserUID();
  const { createRecord } = useFirestoreCollection([USERS_HOME, uid, 'memory']);
  const [newMemory, setNewMemory] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDone, setDone] = useState(false);
  const saveLog = async () => {
    setNewMemory({
      ...newMemory,
      articles: selectedArticles,
      images: filePath,
    });
    setLoading(true);
    await createRecord(newMemory);
    setLoading(false);
    setFilePath(null);
    setDone(true);
    await delay(1500);
    navigation.navigate(NavigationRoutes.Home);
  };
  const [selectedArticles, setSelectedArticles] = useState([]);
  const isSelected = name => _.indexOf(selectedArticles, name) > -1;
  const addArticle = newArticle => {
    if (isSelected(newArticle)) {
      setSelectedArticles(_.without(selectedArticles, newArticle));
      return;
    }
    setSelectedArticles(_.uniq([...selectedArticles, newArticle]));
  };
  return (
    <Stack size={5}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-around',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {articles.map(article => {
          const selected = isSelected(article);
          return (
            <Margin size={[2, 0, 2, 0]}>
              <Border
                role={selected ? 'success' : 'info'}
                lineWidth="light"
                radius="xlarge">
                <Button
                  size={[1, 2, 1, 2]}
                  onPress={() => {
                    addArticle(article);
                  }}>
                  {article}
                </Button>
              </Border>
            </Margin>
          );
        })}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {filePath &&
          filePath.map(file => {
            return (
              <Image source={{ uri: file.uri }} style={styles.imageStyle} />
            );
          })}
      </View>
      <Button
        radius="xlarge"
        backgroundRole="light"
        leftIcon={<AddImageIcon />}
        onPress={() => {
          chooseFile('photo');
        }}>
        Зураг оруулах
      </Button>
      <Button
        radius="xlarge"
        backgroundRole="light"
        leftIcon={<AddImageIcon />}
        onPress={() => {
          captureImage('photo');
        }}>
        Зураг авах
      </Button>

      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Тэмдэглэл
        </Text>
        <Input
          height={80}
          multiline={true}
          radius="large"
          backgroundRole="light"
          size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
          role="info"
          onChangeText={value => {
            setNewMemory({ ...newMemory, note: value });
          }}
        />
      </Stack>
      <Button
        backgroundRole="success"
        radius="xlarge"
        size={[4, 7, 4, 7]}
        onPress={() => {
          saveLog();
        }}
        textRole="light">
        Бүртгэх
      </Button>
      {isDone && <SuccessPopUp />}
    </Stack>
  );
};
