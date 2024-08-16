//추가된 스크린 import 하고 네비게이션 컨테이너에 추가

//App.tsx
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MajorSelectScreen from './screens/MajorSelectScreen';
import MajorGradeScreen from './screens/MajorGradeScreen';
import MajorSubScreen from './screens/MajorSubScreen';
import MajorProfScreen from './screens/MajorProfScreen';
import MajorScreen from './screens/MajorScreen';
import MajorPostScreen from './screens/MajorPostScreen';  // MajorPostScreen 추가
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

// 구인게시판 스크린들 추가
import RecruitSelectScreen from './screens/RecruitSelectScreen';
import RecruitScreen from './screens/RecruitScreen';
import RecruitPostScreen from './screens/RecruitPostScreen';

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

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Resume" component={ResumeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ResumeEdit" component={ResumeEditScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LikePost" component={LikePostScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ScrapPost" component={ScrapPostScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PasswordEdit" component={PasswordEditScreen} options={{ headerShown: false }}/>
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