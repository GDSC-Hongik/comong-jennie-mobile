import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation';
import TitleComponent from '../src/components/TitleComponent';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [nickname, setNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('https://comong-jennie-server.onrender.com/users/current/', {
          method: 'GET',
          headers: {
            'Authorization': `token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNickname(data.username);
        } else {
          Alert.alert('Error', '프로필 정보를 가져오는데 실패했습니다.');
        }
      } else {
        Alert.alert('Notice', '로그인이 필요한 서비스입니다.');
        navigation.replace('LogIn');
      }
    };

    fetchProfile();
  }, []);

  const handleNicknameEdit = () => {
    setIsEditingNickname(true);
  };

  const handleNicknameSave = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      const response = await fetch('https://comong-jennie-server.onrender.com/users/update-nickname', {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: newNickname }),
      });

      if (response.ok) {
        setNickname(newNickname);
        setNewNickname('');
        setIsEditingNickname(false);
        Alert.alert('Success', '닉네임이 성공적으로 변경되었습니다.');
      } else {
        Alert.alert('Error', '닉네임 변경에 실패했습니다.');
      }
    }
  };

  const handlePasswordChange = () => {
    // 비밀번호 변경 화면으로 이동
    navigation.navigate('PasswordEdit');
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
    await AsyncStorage.removeItem('token');
    navigation.replace('LogIn');
  };

  const confirmLogout = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: handleLogout },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TitleComponent title={'프로필'} >
      </TitleComponent>
      
      {/* <View style={styles.section}>
        <Text style={styles.label}>닉네임</Text>
        {isEditingNickname ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="새 닉네임을 입력하세요"
              value={newNickname}
              onChangeText={setNewNickname}
            />
            <Pressable style={styles.saveButton} onPress={handleNicknameSave}>
              <Text style={styles.saveButtonText}>저장</Text>
            </Pressable>
          </>
        ) : (
          <Pressable style={styles.profileButton} onPress={handleNicknameEdit}>
            <Text style={styles.profileButtonText}>{nickname || '닉네임을 변경하려면 클릭하세요'}</Text>
          </Pressable>
        )}
      </View> */}

      <Pressable style={styles.profileButton} onPress={handlePasswordChange}>
        <Text style={styles.profileButtonText}>개인정보 수정</Text>
      </Pressable>

      <Pressable style={styles.profileButton} onPress={goToLikePostScreen}>
        <Text style={styles.profileButtonText}>좋아요 한 게시글 보기</Text>
      </Pressable>

      <Pressable style={styles.profileButton} onPress={goToScrapPostScreen}>
        <Text style={styles.profileButtonText}>스크랩 한 게시글 보기</Text>
      </Pressable>

      <Pressable style={styles.profileButton} onPress={goToResumeScreen}>
        <Text style={styles.profileButtonText}>내 이력서 관리</Text>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={confirmLogout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 15,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 20,
    color: "#050360",
  },

  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    backgroundColor: '#F0F0F0',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  profileButton: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F0F0F0',
    borderColor: '#B5B5B5',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    marginBottom: 15,
    paddingLeft: 10,
  },
  profileButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0080DC',
    borderRadius: 10,
    height: 40,
    marginBottom: 15,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DC3545',
    borderRadius: 10,
    height: 40,
    margin: 15,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfileScreen;
