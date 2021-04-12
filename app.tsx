import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthProvider } from './src/authentication';
import { Theme } from './src/components';
import { RootNavigationContainer } from './src/components/navigation';
import { CategoryProvider } from './src/components/screen/category/categoryProvider';
import { PermissionProvider } from './src/permission/photoPermission';

const App = () => {
  Icon.loadFont();
  return (
    <AuthProvider>
      <CategoryProvider>
        <PermissionProvider>
          <Theme>
            <SafeAreaProvider>
              <RootNavigationContainer />
            </SafeAreaProvider>
          </Theme>
        </PermissionProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default App;
