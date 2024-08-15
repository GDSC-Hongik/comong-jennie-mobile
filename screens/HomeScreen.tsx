import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // 전공 선택 화면으로 이동
  const goToMajorSelectScreen = () => {
    navigation.navigate('MajorSelect');
  };

  // 구인 게시판 화면으로 이동
  const goToRecruitSelectScreen = () => {
    navigation.navigate('RecruitSelect');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Go to Major Select Screen" onPress={goToMajorSelectScreen} />
      <Button title="Go to Recruit Board" onPress={goToRecruitSelectScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
