import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 네비게이션 스택 파라미터 정의
export type RootStackParamList = {
  Home: undefined;
  Class: undefined;
  SignUp: undefined;
  LogIn: undefined;
  Notification: undefined;
  Search: { serverUrl: string };
  Profile: undefined;
  Loading: undefined;
  Resume: undefined;
  ResumeEdit: undefined;
  LikePost: undefined;
  ScrapPost: undefined;
  PasswordEdit: undefined;
  MajorSelect: undefined;
  MajorGrade: { grade: number };
  MajorSub: { grade: number; subject: string };
  MajorProf: { grade: number; subject: string; professor: string };
  MajorPost: { grade: number; sub: string; profs: string; postId?: number };
  Major: { grade: number; sub: string; profs: string; postId: number };
  Detail: { };
};

// 네비게이션 속성 정의
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type ClassScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Class'>;
export type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
export type LogInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LogIn'>;
export type NotificationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Notification'>;
export type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
export type LoadingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Loading'>;
export type LikePostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LikePost'>;
export type ScrapPostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScrapPost'>;
export type PasswordEditScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PasswordEdit'>;
export type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetailScreen'>;
export type ResumeScreenNavigationProp =  NativeStackNavigationProp<RootStackParamList, 'Resume'>;
export type ResumeEditScreenNavigationProp =  NativeStackNavigationProp<RootStackParamList, 'ResumeEdit'>;

