import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type MajorPostScreenRouteProp = RouteProp<RootStackParamList, 'MajorPost'>;
type MajorPostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MajorPost'>;

const MajorPostScreen: React.FC = () => {
  const route = useRoute<MajorPostScreenRouteProp>();
  const navigation = useNavigation<MajorPostScreenNavigationProp>();
  const { grade, sub, profs } = route.params;

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = async () => {
    const requestData = {
      title,
      content,
      user: 1  // 임시로 user ID를 하드코딩
    };

    console.log("Sending POST request with data:", requestData);

    try {
      const response = await axios.post(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/create/`,
        requestData
      );
      console.log("POST request successful:", response.data);
      Alert.alert('성공', '게시글이 성공적으로 작성되었습니다.');
      navigation.goBack();  // 글 작성 후 이전 화면으로 돌아갑니다.
    } catch (error: any) {
      console.error('게시글 작성 실패:', error.response ? error.response.data : error.message);
      Alert.alert('실패', '게시글 작성에 실패했습니다.');
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="제목"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="내용"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5, height: 150 }}
        multiline
      />
      <Button title="작성하기" onPress={handleSubmit} />
    </View>
  );
};

export default MajorPostScreen;
