import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../header';
import { Center, Margin, Queue, Stack } from '../../layout';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View } from 'react-native';
import { Text } from '../..';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Circle } from 'react-native-svg';
import { UserContext } from '../home/userProvider';
import { useFirestoreCollection } from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
import _ from 'lodash';
import { ChartLabel1, ChartLabel2 } from '../../../assets';
export const GrowthScreen = () => {
  const { userAge, userInfo } = useContext(UserContext);
  const { data: modelData, loading } = useFirestoreCollection(['modelData']);
  const uid = useUserUID();
  const { data: surgeryData } = useFirestoreCollection([
    USERS_HOME,
    uid,
    'surgery',
  ]);
  let modelDataHeight = [60];
  let modelDataWeight = [3];
  if (!loading && modelData) {
    modelDataHeight = _.slice(modelData[0]?.height, 0, userAge);
    modelDataWeight = _.slice(modelData[0]?.weight, 0, userAge);
  }

  const labelData = Array.from({ length: userAge }, (_, i) => i + 1);
  const heightData = [];
  const widthData = [];
  heightData.push(userInfo?.height);
  widthData.push(userInfo?.weight);
  console.log(heightData)
  surgeryData?.map(item => {
    heightData.push(item?.height);
    widthData.push(item?.width);
  });
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Өсөлтийн график" />
      <ScrollView>
        <Margin size={[3, 3, 5, 3]}>
          <Stack size={5}>
            <>
              <Text type="headline3" role="info" textAlign="center">
                Өндөр / сарын харьцуулсан үзүүлэлт
              </Text>
              <Center>
                <LineChart
                  data={{
                    labels: labelData,
                    datasets: [
                      {
                        data: heightData,
                        color: (opacity = 1) => `rgba(255 ,10,	117,${opacity})`, // optional
                      },
                      {
                        data: modelDataHeight,
                        color: (opacity = 1) =>
                          `rgba(175, 175, 175, ${opacity})`, // optional
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width * 0.9} // from react-native
                  height={220}
                  yAxisSuffix=" см"
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#FF94A6',
                    backgroundGradientTo: '#FFCCCC',
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(175, 175, 175, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '1',
                      //   strokeWidth: '2',
                      //   stroke: '#FF80B0',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 26,
                  }}
                />
              </Center>
              <Queue justifyContent="space-around" alignItems="center">
                <ChartLabel1 />
                <Text type="paragraph" role="tertiary">
                  Таны хүүхдийн өсөлт
                </Text>

                <ChartLabel2 />
                <Text type="paragraph" role="tertiary">
                  Жишиг өсөлт
                </Text>
              </Queue>
            </>
            <>
              <Text type="headline3" role="info" textAlign="center">
                Жин / сарын харьцуулсан үзүүлэлт
              </Text>
              <Center>
                <LineChart
                  data={{
                    labels: labelData,
                    datasets: [
                      {
                        data: widthData,
                        color: (opacity = 1) => `rgba(255 ,10,	117,${opacity})`, // optional
                      },
                      {
                        data: modelDataWeight,
                        color: (opacity = 1) =>
                          `rgba(175, 175, 175, ${opacity})`, // optional
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width * 0.9} // from react-native
                  height={220}
                  yAxisSuffix=" кг"
                  //   xAxisLabel=" сар"
                  // yAxisInterval={0.5} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: '#FFFFFF',
                    backgroundGradientFrom: '#91A0F1',
                    backgroundGradientTo: '#BFC6F2',
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '3',
                      //   strokeWidth: '2',
                      //   stroke: '#5969BD',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 26,
                  }}
                />
              </Center>
              <Queue justifyContent="space-around" alignItems="center">
                <ChartLabel1 />
                <Text type="paragraph" role="tertiary">
                  Таны хүүхдийн өсөлт
                </Text>

                <ChartLabel2 />
                <Text type="paragraph" role="tertiary">
                  Жишиг өсөлт
                </Text>
              </Queue>
            </>
            <>
              <Text type="headline3" role="info" textAlign="center">
                Жин / Өндөр харьцуулсан үзүүлэлт
              </Text>
              <Center>
                <LineChart
                  data={{
                    labels: heightData,
                    datasets: [
                      {
                        data: widthData,
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width * 0.9} // from react-native
                  height={220}
                  yAxisSuffix=" кг"
                  xAxisLabel=" см"
                  // yAxisInterval={0.5} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#FCA629',
                    backgroundGradientTo: '#FFC700',
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#ffa726',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 26,
                  }}
                />
              </Center>
            </>
          </Stack>
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};
