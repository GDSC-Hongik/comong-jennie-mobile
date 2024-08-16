import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image } from 'react-native';
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
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>구인게시판 글 작성</Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#050360"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        placeholderTextColor="#050360"
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Participants Number"
        placeholderTextColor="#050360"
        value={participantsNum}
        onChangeText={setParticipantsNum}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Current Number"
        placeholderTextColor="#050360"
        value={currentNum}
        onChangeText={setCurrentNum}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} color="#050360" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10, // 로고와 텍스트 간격 조정
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#050360',
  },
  input: {
    height: 40,
    borderColor: '#050360',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#050360',
  },
});

export default RecruitPostScreen;
