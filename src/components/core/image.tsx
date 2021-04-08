import React, { useState } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { KuukedLogo } from '../../assets';
import { GereseeLogo } from '../../assets/icons';
import { AnimatedFadeInView } from '../animated';
import { Center, Overlay } from '../layout';
import '../types';

export const RemoteImage = ({
  source,
  url,
  aspectRatio = 1,
  resizeMode = 'cover',
  width,
}: RemoteImageType) => {
  const [ready, setReady] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: 'center', width }}>
      <Overlay top={0} height="100%" width="100%">
        <Animatable.View
          animation="fadeOut"
          iterationCount="infinite"
          duration={3000}
          useNativeDriver={true}>
          <AnimatedFadeInView visible={!ready} height="100%">
            <Center flex={1}>
              <KuukedLogo height={75} width={75} />
            </Center>
          </AnimatedFadeInView>
        </Animatable.View>
      </Overlay>
      <AnimatedFadeInView visible={!!ready}>
        <FastImage
          onLoadEnd={() => !url || (!source && setReady(true))}
          source={source ? source : { uri: url }}
          style={{
            aspectRatio,
            width: '100%',
          }}
          resizeMode={resizeMode}
        />
      </AnimatedFadeInView>
    </View>
  );
};
