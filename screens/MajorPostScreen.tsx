import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';

type RootStackParamList = {
  MajorPostScreen: { grade: string; sub: string; profs: string };
};

type MajorPostScreenRouteProp = RouteProp<RootStackParamList, 'MajorPostScreen'>;

const MajorPostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<MajorPostScreenRouteProp>();
  const { grade, sub, profs } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    try {
      // 새 게시글 작성
      await axios.post(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/create/`,
        {
          title,
          content,
        }
      );
      Alert.alert('작성 완료', '새 게시물이 작성되었습니다.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="제목"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="내용"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ borderBottomWidth: 1, marginBottom: 10, height: 200 }}
      />
      <Button title="저장" onPress={handleSave} />
    </View>
  );
};

export default MajorPostScreen;
