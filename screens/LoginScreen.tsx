import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogInScreenNavigationProp } from '../types/navigation';

interface Props {
  navigation: LogInScreenNavigationProp;
}

const LogInScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', '모든 항목을 입력해주세요');
      return;
    }

    setIsLoading(true);  // 로딩 시작
    try {
      const response = await fetch('https://comong-jennie-server.onrender.com/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || '이메일이 잘못되었거나 비밀번호와 일치하지 않습니다');
        return;
      }

      const responseData = await response.json();
      const { token } = responseData.user;
      // const { accessToken, refreshToken } = responseData;

      // 토큰을 AsyncStorage에 저장
      await AsyncStorage.setItem('accessToken', token);
      // await AsyncStorage.setItem('refreshToken', refreshToken);

      Alert.alert('Success', '로그인에 성공하였습니다!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'fetch 작업에 오류가 발생하였습니다');
    } finally {
      setIsLoading(false);  // 로딩 종료
    }
  };

  const goToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>커몽</Text>
      
      <TextInput
        style={styles.input}
        placeholder="이메일을 입력하세요"
        value={email}
        onChangeText={setEmail}
        inputMode="email"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {/* 로딩 인디케이터 표시 */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0080DC" style={styles.loader} />
      ) : (
        <>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>로그인</Text>
          </Pressable>

          <Text style={styles.signupText}>아직 계정이 없으신가요?</Text>
          <Pressable style={styles.grayButton} onPress={goToSignUpScreen}>
            <Text style={styles.buttonText}>회원가입</Text>
          </Pressable>
        </>
      )}
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
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: '#050360',
    marginBottom: 30,
  },
  input: {
    height: 40,
    backgroundColor: '#F0F0F0',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  signupText: {
    marginTop: 40,
    fontSize: 14,
    textAlign: 'right',
    marginVertical: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0080DC',
    borderRadius: 10,
    height: 45,
    marginBottom: 15,
    marginTop: 20,
  },
  grayButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B5B5B5',
    borderRadius: 10,
    height: 45,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  loader: {
    marginBottom: 15, // 로딩 인디케이터 아래 마진
  },
});

export default LogInScreen;
