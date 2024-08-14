import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Major: { grade: number; sub: string; profs: string; postId: number };
};

type MajorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Major'>;
type MajorScreenRouteProp = RouteProp<RootStackParamList, 'Major'>;

interface Post {
  title: string;
  content: string;
  dt_created: string;
}

const MajorScreen: React.FC = () => {
  const navigation = useNavigation<MajorScreenNavigationProp>();
  const route = useRoute<MajorScreenRouteProp>();
  const { grade, sub, profs, postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [editMode, setEditMode] = useState(false);  // 수정 모드 상태
  const [title, setTitle] = useState<string>('');  // 제목 상태
  const [content, setContent] = useState<string>('');  // 내용 상태

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/`
      );
      console.log("API Response:", response.data);
      const postData = response.data.post;
      setPost(postData);
      setTitle(postData.title);  // 제목 초기화
      setContent(postData.content);  // 내용 초기화
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        Alert.alert('Error', '게시물을 찾을 수 없습니다.');
      } else {
        console.error(axiosError);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/`,
        { title, content }  // 업데이트할 데이터 전송
      );
      Alert.alert('수정 완료', '게시물이 수정되었습니다.');
      setEditMode(false);  // 수정 모드 종료
      fetchPost();  // 업데이트된 데이터 가져오기
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert('Error', '게시물을 수정하는 중 문제가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/`
      );
      Alert.alert('삭제 완료', '게시물이 삭제되었습니다.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (!post) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {editMode ? (
        <>
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
          <Button title="저장" onPress={handleUpdate} />
          <Button title="취소" onPress={() => setEditMode(false)} color="red" />
        </>
      ) : (
        <>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{post.title}</Text>
          <Text style={{ marginVertical: 10 }}>{post.content}</Text>
          <Text>{new Date(post.dt_created).toLocaleDateString()}</Text>
          <Button title="수정" onPress={() => setEditMode(true)} />
          <Button title="삭제" onPress={handleDelete} color="red" />
        </>
      )}
    </View>
  );
};

export default MajorScreen;
