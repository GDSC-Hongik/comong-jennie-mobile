import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const MajorPostScreen: React.FC = () => {
  const [title, setTitle] = useState('');  // 제목 상태
  const [content, setContent] = useState('');  // 내용 상태
  const navigation = useNavigation();
  const route = useRoute();
  const { grade, subject, professor } = route.params;  // 경로 파라미터로 grade, subject, professor 가져오기

  const handleSubmit = async () => {
    try {
      // POST 요청으로 사용자가 입력한 title과 content를 서버로 전송
      await axios.post(`https://comong-jennie-server.onrender.com/main/major/${grade}/${subject}/${professor}/create/`, {
        title,
        content,
      });
      Alert.alert('성공', '게시물이 성공적으로 생성되었습니다.');
      navigation.goBack();  // 글 작성 후 이전 화면으로 이동
    } catch (error) {
      console.error('게시물 생성 실패:', error);
      Alert.alert('실패', '게시물 생성에 실패했습니다.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="내용을 입력하세요"
        value={content}
        onChangeText={setContent}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, height: 150 }}
        multiline
      />
      <Button title="제출" onPress={handleSubmit} />
    </View>
  );
};

export default MajorPostScreen;
