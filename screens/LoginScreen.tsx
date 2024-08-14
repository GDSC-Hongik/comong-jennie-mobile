//buttonText 센터로 정렬 수정, 박스 컬러 수정, 로딩 파트 뭐가 없음 수정

// LogInScreen.tsx 로그인 화면
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type LogInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LogIn'>;

interface Props {
  navigation: LogInScreenNavigationProp;
}

const LogInScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out all fields.');
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
        Alert.alert('Error', errorData.message || 'Invalid email or password.');
        return;
      }
  
      const responseData = await response.json();
      Alert.alert('Success', 'You have logged in successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'There was a problem with your fetch operation.');
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
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>아직 계정이 없으신가요?</Text>
      <TouchableOpacity style={styles.button} onPress={goToSignUpScreen}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
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
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    justifyContent: 'center',  // 세로 중앙 정렬
    alignItems: 'center',
    backgroundColor: '#0080DC',
    borderRadius: 10,
    height: 40,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: 14,
  },
});

export default LogInScreen;
