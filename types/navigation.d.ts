import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 네비게이션 스택의 파라미터를 정의합니다.
export type RootStackParamList = {
  Home: undefined;
  Class: undefined;
};

// 네비게이션 속성을 정의합니다.
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type ClassScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Class'>;
