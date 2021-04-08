import React from 'react';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from './src/components';
import { RootNavigationContainer } from './src/components/navigation';
import { CategoryProvider } from './src/components/screen/category/categoryProvider';
import { CatalogContext } from './src/components/screen/category/select-category-screen';

const App = () => {
  Icon.loadFont();
  return (
    <Theme>
      {/* <CatalogContext.Provider> */}
      <RootNavigationContainer />
      {/* </CatalogContext.Provider> */}
    </Theme>
  );
};

export default App;
