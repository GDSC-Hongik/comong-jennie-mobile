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

// 구인게시판 스크린들 추가
import RecruitSelectScreen from './screens/RecruitSelectScreen';
import RecruitScreen from './screens/RecruitScreen';
import RecruitPostScreen from './screens/RecruitPostScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="Class" 
          component={MajorSelectScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="MajorSelect" 
          component={MajorSelectScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="MajorGrade" 
          component={MajorGradeScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="MajorSub" 
          component={MajorSubScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="MajorProf" 
          component={MajorProfScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="Major" 
          component={MajorScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="MajorPost" 
          component={MajorPostScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        
        {/* 구인게시판 관련 스크린 추가 */}
        <Stack.Screen 
          name="RecruitSelect" 
          component={RecruitSelectScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="Recruit" 
          component={RecruitScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="RecruitPost" 
          component={RecruitPostScreen} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
