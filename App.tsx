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
import { GeneratorProvider } from './context/GeneratorContext';
import LoadingStoryScreen from './screens/LoadingStoryScreen';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

export type RootStackParamList = {
  Splash: undefined;
  Register: undefined;
  Home: undefined;
  Story: undefined;
  Loading: undefined;
  StoryScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <GeneratorProvider>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Story" component={StoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Loading" component={LoadingStoryScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </GeneratorProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
