//PasswordEditScreen.tsx 비밀번호 변경 화면
//오류 있음 수정해야 함 ㅠㅠ

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { PasswordEditScreenNavigationProp } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: PasswordEditScreenNavigationProp;
}

const PasswordEditScreen: React.FC<Props> = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    if (password === '' || confirmPassword === '') {
      Alert.alert('입력 오류', '비밀번호를 모두 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('입력 오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('https://comong-jennie-server.onrender.com/user/current', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`
        },
        body: JSON.stringify({
          password: password,
        }),
      });

      if (response.ok) {
        Alert.alert('성공', '비밀번호가 성공적으로 변경되었습니다.');
        navigation.goBack(); // 이전 화면으로 이동
      } else {
        const errorData = await response.json();
        Alert.alert('오류', errorData.message || '변경에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '서버와의 통신에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>새 비밀번호</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="새 비밀번호를 입력하세요"
        secureTextEntry // 비밀번호 입력시 보안 처리
      />

      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="비밀번호를 다시 입력하세요"
        secureTextEntry // 비밀번호 입력시 보안 처리
      />

      <Button title="전송" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#050360',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
});

export default PasswordEditScreen;
