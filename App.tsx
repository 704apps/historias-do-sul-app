// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

export type RootStackParamList = {
  Splash: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [initialRoute, setInitialRoute] = React.useState<keyof RootStackParamList>('Splash');

  React.useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setInitialRoute('Home');
      } else {
        setInitialRoute('Splash');
      }
    };
    checkUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
