import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 네비게이션 스택 파라미터 정의
export type RootStackParamList = {
  Home: undefined;
  Class: undefined;
  SignUp: undefined;
  LogIn: undefined;
};

// 네비게이션 속성 정의
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type ClassScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Class'>;
export type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LogIn'>;
