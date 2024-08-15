import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignUpScreenNavigationProp } from '../types/navigation';

interface Props {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !username) {
      Alert.alert('Error', '모든 항목을 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', '비밀번호가 일치하지 않습니다');
      return;
    }

    const url = 'https://comong-jennie-server.onrender.com/users/register/';
    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Error', `회원가입에 실패했습니다: ${response.statusText}`);
        console.error('Error details:', errorData);
        return;
      }

      const responseData = await response.json();
      Alert.alert('Success', '회원가입에 성공했습니다!');

      // 자동 로그인 처리
      const loginUrl = 'https://comong-jennie-server.onrender.com/users/login/';
      const loginData = {
        email: email,
        password: password,
      };

      const loginResponse = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        Alert.alert('Error', `자동 로그인에 실패했습니다: ${loginResponse.statusText}`);
        console.error('Error details:', errorData);
        return;
      }

      const loginResponseData = await loginResponse.json();
      const token = loginResponseData.user.user.token;
      // const { accessToken, refreshToken } = loginResponseData;

      // 토큰을 AsyncStorage에 저장
      await AsyncStorage.setItem('accessToken', token);
      // await AsyncStorage.setItem('refreshToken', refreshToken);

      // 홈 화면으로 이동
      navigation.navigate('Home');

    } catch (error) {
      console.error('fetch 작업에 오류가 발생했습니다:', error);
      Alert.alert('Error', '요청에 오류가 발생했습니다');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일을 입력하세요"
        value={email}
        onChangeText={setEmail}
        inputMode="email"
      />

      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>비밀번호 재확인</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Text style={styles.label}>닉네임</Text>
      <TextInput
        style={styles.input}
        placeholder="사용할 닉네임을 입력하세요"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555555',
  },
  input: {
    height: 40,
    backgroundColor: '#F0F0F0',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',  // 세로 중앙 정렬
    alignItems: 'center',
    backgroundColor: '#0080DC',
    borderRadius: 10,
    height: 45,
    marginBottom: 15,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default SignUpScreen;
