import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthProvider } from './src/authentication';
import { Theme } from './src/components';
import { RootNavigationContainer } from './src/components/navigation';
import { CategoryProvider } from './src/components/screen/category/categoryProvider';

const App = () => {
  Icon.loadFont();
  return (
    <AuthProvider>
      <CategoryProvider>
        <Theme>
          <SafeAreaProvider>
            <RootNavigationContainer />
          </SafeAreaProvider>
        </Theme>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default App;
