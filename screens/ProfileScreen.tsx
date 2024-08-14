//닉네임 수정, 좋아요 한 게시글, 스크랩 한 게시글, 이력서 목록

//ProfileScreen.tsx 프로필 화면

import React, { useState } from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {


  const goToHomeScreen = () => {
    navigation.navigate('Home');
  };
  const goToLikePostScreen = () => {
    navigation.navigate('LikePost');
  };
  const goToScrapPostScreen = () => {
    navigation.navigate('ScrapPost');
  };
  const goToResumeScreen = () => {
    navigation.navigate('Resume');
  };

  const handleLogout = async () => {
    // 저장된 토큰 삭제
    await AsyncStorage.removeItem('authToken');
    // 로그아웃 후 로그인 화면으로 이동
    navigation.replace('LogIn');
  };

  const confirmLogout = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: handleLogout,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필</Text>
      <TouchableOpacity style={styles.profileButton} onPress={goToLikePostScreen}>
        <Text style={styles.profileButtonText}>좋아요 한 게시글 보기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileButton} onPress={goToScrapPostScreen}>
        <Text style={styles.profileButtonText}>스크랩 한 게시글 보기</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.profileButton} onPress={confirmLogout}>
        <Text style={styles.profileButtonText}>로그아웃</Text>
      </TouchableOpacity>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  profileButton: {
    marginTop: 15,
    marginBottom: 15,
    height: 40,
    borderColor: '', //네이비 컬러로 수정
    borderWidth: 1,
  },
  profileButtonText: {
    color: '#', //네이비 컬러로 수정
    fontWeight: 600,
    fontSize: 14,
  }
});


export default ProfileScreen;
