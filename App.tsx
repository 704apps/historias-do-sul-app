// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import StoryScreen from './screens/StoryScreen';
import { AuthProvider } from './context/AuthContext';

export type RootStackParamList = {
  Splash: undefined;
  Register: undefined;
  Home: undefined;
  Story: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [initialRoute, setInitialRoute] = React.useState<keyof RootStackParamList>('Splash');
  const [user, setUser] = React.useState<string | null>(null);

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
      <AuthProvider>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Story" component={StoryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
