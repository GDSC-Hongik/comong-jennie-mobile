// RecruitPostScreen

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';

type RecruitPostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecruitPost'>;

const RecruitPostScreen: React.FC = () => {
  const navigation = useNavigation<RecruitPostScreenNavigationProp>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [participantsNum, setParticipantsNum] = useState('');
  const [currentNum, setCurrentNum] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://comong-jennie-server.onrender.com/main/join/create/', {
        title,
        content,
        participants_num: parseInt(participantsNum, 10),
        current_num: parseInt(currentNum, 10),
        user: 1, // 사용자 ID
      });

      console.log('Response:', response);
      // 글 작성 후 RecruitSelectScreen으로 이동
      navigation.navigate('RecruitSelect');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        const shortErrorMessage = errorMessage.length > 100 ? errorMessage.substring(0, 100) + '...' : errorMessage;
        console.error('Axios error:', shortErrorMessage);
        Alert.alert('Error', `Failed to create post: ${shortErrorMessage}`);
      } else {
        console.error('Unknown error:', error);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Participants Number"
        value={participantsNum}
        onChangeText={setParticipantsNum}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Current Number"
        value={currentNum}
        onChangeText={setCurrentNum}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RecruitPostScreen;
