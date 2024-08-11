//SignUpScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sentVerificationCode, setSentVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const sendVerificationCode = () => {
    if (email) {
      // 임의의 인증번호 생성 및 전송 로직 (실제 사용 시 이메일 전송 API 필요)
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSentVerificationCode(generatedCode);
      Alert.alert('Verification code sent!', `Your code: ${generatedCode}`);
    } else {
      Alert.alert('Error', 'Please enter a valid email address.');
    }
  };

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword || !nickname) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (verificationCode !== sentVerificationCode) {
      Alert.alert('Error', 'Invalid verification code.');
      return;
    }

    // 회원가입 로직 처리 (실제 사용 시 서버 API 호출 필요)
    Alert.alert('Success', 'You have signed up successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Send Verification Code" onPress={sendVerificationCode} />

      <Text style={styles.label}>Verification Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Nickname</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your nickname"
        value={nickname}
        onChangeText={setNickname}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SignUp;
