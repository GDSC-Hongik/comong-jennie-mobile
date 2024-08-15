import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 네비게이션 스택 파라미터 정의
export type RootStackParamList = {
  Home: undefined;
  Class: undefined;
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
  RecruitSelect: undefined;
  RecruitPost: undefined; // RecruitPost 화면 추가
  Recruit: { postId: number }; // Recruit 화면 추가, postId는 필수
};

// 네비게이션 속성 정의 (필요에 따라 추가)
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type ClassScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Class'>;
export type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
export type RecruitSelectScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecruitSelect'>;
export type RecruitPostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecruitPost'>;
export type RecruitScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Recruit'>;
