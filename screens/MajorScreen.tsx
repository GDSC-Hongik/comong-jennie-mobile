import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';

type RootStackParamList = {
  MajorScreen: { grade: string; sub: string; profs: string; postId: string };
};

type MajorScreenRouteProp = RouteProp<RootStackParamList, 'MajorScreen'>;

const MajorScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<MajorScreenRouteProp>();
  const { grade, sub, profs, postId } = route.params;
  const [post, setPost] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/`
      );
      setPost(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        Alert.alert('Error', '게시물을 찾을 수 없습니다.');
      } else {
        console.error(error);
      }
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
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigation.navigate('MajorPostScreen', { grade, sub, profs, postId });
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
      <Text>{post.title}</Text>
      <Text>{post.content}</Text>
      <Button title="수정" onPress={handleEdit} />
      <Button title="삭제" onPress={handleDelete} color="red" />
    </View>
  );
};

export default MajorScreen;
