//추가된 스크린 import 하고 네비게이션 컨테이너에 추가

//App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ClassScreen from './screens/ClassScreen';
import { RootStackParamList } from './types/navigation';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Class" component={ClassScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="Notification" component={ClassScreen} />
        <Stack.Screen name="Search" component={ClassScreen} />
        <Stack.Screen name="Profile" component={ClassScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;