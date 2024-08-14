//buttonText 센터로 정렬 수정, 박스 컬러 수정
//회원가입 성공하면 로그인 화면으로 이동하게 수정

//SignUpScreen.tsx 회원가입 화면
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sentVerificationCode, setSentVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const sendVerificationCode = () => {
    if (email) {
      // 임의의 인증번호 생성 및 전송 로직 (실제 사용 시 이메일 전송 API 필요)
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSentVerificationCode(generatedCode);
      Alert.alert('Verification code sent!', `Your code: ${generatedCode}`);
      console.log('임시 인증 코드:', generatedCode);
    } else {
      Alert.alert('Error', 'Please enter a valid email address.');
    }
  };

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword || !username) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', '비밀번호가 일치하지 않습니다');
      return;
    }
    if (verificationCode !== sentVerificationCode) {
      Alert.alert('Error', '인증코드가 일치하지 않습니다');
      return;
    }

    const url = 'https://comong-jennie-server.onrender.com/users/register/';
    const data = {
      username: username, 
      email: email,
      password: password,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            Alert.alert('Error', `Failed to sign up: ${response.statusText}`);
            console.error('Error details:', errorData);
            throw new Error('Network response was not ok');
          });
        }
        return response.json();
      })
      .then(responseData => {
        Alert.alert('Success', 'You have signed up successfully!');
        console.log('Response Data:', responseData);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        Alert.alert('Error', 'There was a problem with your request.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일을 입력하세요"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
        <Text style={styles.buttonText}>인증코드 전송</Text>
      </TouchableOpacity>

      <Text style={styles.label}>인증코드</Text>
      <TextInput
        style={styles.input}
        placeholder="인증코드를 입력하세요"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
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
    marginBottom: 5,
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
    height: 40,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: 14,

  },
});

export default SignUpScreen;
