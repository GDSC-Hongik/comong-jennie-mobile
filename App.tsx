import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MajorSelectScreen from './screens/MajorSelectScreen';
import MajorGradeScreen from './screens/MajorGradeScreen';
import MajorSubScreen from './screens/MajorSubScreen';
import MajorProfScreen from './screens/MajorProfScreen';
import MajorScreen from './screens/MajorScreen';
import MajorPostScreen from './screens/MajorPostScreen';  // MajorPostScreen 추가
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Class" component={MajorSelectScreen} />
        <Stack.Screen name="MajorSelect" component={MajorSelectScreen} />
        <Stack.Screen name="MajorGrade" component={MajorGradeScreen} />
        <Stack.Screen name="MajorSub" component={MajorSubScreen} />
        <Stack.Screen name="MajorProf" component={MajorProfScreen} />
        <Stack.Screen name="Major" component={MajorScreen} />
        <Stack.Screen name="MajorPost" component={MajorPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
