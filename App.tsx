//추가된 스크린 import 하고 네비게이션 컨테이너에 추가

//App.tsx
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { RootStackParamList } from './types/navigation';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import ResumeScreen from './screens/ResumeScreen';
import ResumeEditScreen  from './screens/ResumeEditScreen';
import LikePostScreen from './screens/LikePostScreen';
import ScrapPostScreen from './screens/ScrapPostScreen';
import PasswordEditScreen from './screens/PasswordEditScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App: React.FC = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Resume" component={ResumeScreen} />
        <Stack.Screen name="ResumeEdit" component={ResumeEditScreen} />
        <Stack.Screen name="LikePost" component={LikePostScreen} />
        <Stack.Screen name="ScrapPost" component={ScrapPostScreen} />
        <Stack.Screen name="PasswordEdit" component={PasswordEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;