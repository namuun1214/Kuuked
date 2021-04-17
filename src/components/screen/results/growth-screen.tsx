import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../header';
import { Center, Margin, Queue, Stack } from '../../layout';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Text } from '../..';
import { ScrollView } from 'react-native-gesture-handler';
import { Circle } from 'react-native-svg';
export const GrowthScreen = () => {
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Өсөлтийн график" />
      <ScrollView>
        <Margin size={[3, 3, 3, 3]}>
          <Stack size={3}>
            <>
              <Text type="headline3" role="info" textAlign="center">
                Өндөр / сарын харьцуулсан үзүүлэлт
              </Text>
              <Center>
                <LineChart
                  data={{
                    labels: ['0', '1', '2', '3', '4', '5'],
                    datasets: [
                      {
                        data: [20, 45, 28, 80, 99, 43],
                        color: (opacity = 1) =>
                          `rgba(134, 65, 244, ${opacity})`, // optional
                      },
                      {
                        data: [80, 65, 85, 81, 90, 40],
                        color: (opacity = 1) =>
                          `rgba(255, 65, 244, ${opacity})`, // optional
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width * 0.9} // from react-native
                  height={220}
                  yAxisSuffix=" см"
                  xAxisLabel=" сар"
                  // yAxisInterval={0.5} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#FF94A6',
                    backgroundGradientTo: '#FFCCCC',
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
                      stroke: '#FF80B0',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 26,
                  }}
                />
              </Center>
              <Queue justifyContent="space-around">
                <Text> -1</Text>
                <Text> 0</Text>
                <Text> 1</Text>
              </Queue>
            </>
            <>
              <Text type="headline3" role="info" textAlign="center">
                Жин / сарын харьцуулсан үзүүлэлт
              </Text>
              <Center>
                <LineChart
                  data={{
                    labels: ['0', '1', '2', '3', '4', '5'],
                    datasets: [
                      {
                        data: [45, 50, 51, 55, 60, 61],
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width * 0.9} // from react-native
                  height={220}
                  yAxisSuffix=" см"
                  xAxisLabel=" сар"
                  // yAxisInterval={0.5} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: '#FFFFFF',
                    backgroundGradientFrom: '#91A0F1',
                    backgroundGradientTo: '#BFC6F2',
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
                      stroke: '#5969BD',
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
            <>
              <Text type="headline3" role="info" textAlign="center">
                Жин / Өндөр харьцуулсан үзүүлэлт
              </Text>
              <Center>
                <LineChart
                  data={{
                    labels: ['0', '1', '2', '3', '4', '5'],
                    datasets: [
                      {
                        data: [45, 50, 51, 55, 60, 61],
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width * 0.9} // from react-native
                  height={220}
                  yAxisSuffix=" см"
                  xAxisLabel=" сар"
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
