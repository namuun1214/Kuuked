import React from 'react';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from './src/components';
import { RootNavigationContainer } from './src/components/navigation';
import { CategoryProvider } from './src/components/screen/category/categoryProvider';

const App = () => {
  Icon.loadFont();
  return (
    <Theme>
      <CategoryProvider>
        <RootNavigationContainer />
      </CategoryProvider>
    </Theme>
  );
};

export default App;
