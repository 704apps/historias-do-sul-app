// App.tsx
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { AuthProvider } from './context/AuthContext';
import { GeneratorProvider } from './context/GeneratorContext';
import HomeScreen from './screens/HomeScreen';
import LoadingStoryScreen from './screens/LoadingStoryScreen';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreen from './screens/SplashScreen';
import StoryScreen from './screens/StoryScreen';
import { StatusBar } from 'react-native';
import GenerateStoryScreen from './screens/GenerateStoryScreen';
import HistoricScreen from './screens/HistoricScreen';
import StoryDetailScreen from './screens/StoryDetailScreen';

export type RootStackParamList = {
  Splash: undefined;
  Register: undefined;
  Home: undefined;
  Story: undefined;
  Loading: undefined;
  StoryScreen: undefined;
  Historic: undefined;
  Generate: undefined;
  //@ts-ignore
  StoryDetail: { story: Story };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
    <StatusBar hidden={true} />
    <NavigationContainer>
      <AuthProvider>
        <GeneratorProvider>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Historic" component={HistoricScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Story" component={StoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Loading" component={LoadingStoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Generate" component={GenerateStoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="StoryDetail" component={StoryDetailScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </GeneratorProvider>
      </AuthProvider>
    </NavigationContainer>
    </>
  );
};

export default App;
