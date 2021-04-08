import React, { FC } from 'react';
import * as Animatable from 'react-native-animatable';
import { OvalIcon } from '../../assets/icons';

export const Spinner: FC<{ size?: number; role?: BorderRoleType }> = props => {
  const { size } = props;
  return (
    <Animatable.View
      style={{
        width: size || 38,
        height: size || 38,
      }}
      animation="rotate"
      iterationCount="infinite"
      duration={1000}
      useNativeDriver={true}>
      <OvalIcon {...props} />
    </Animatable.View>
  );
};
