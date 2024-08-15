import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
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

interface Comment {
  id: number;
  comment: string;
  user: number;
}

const MajorScreen: React.FC = () => {
  const navigation = useNavigation<MajorScreenNavigationProp>();
  const route = useRoute<MajorScreenRouteProp>();
  const { grade, sub, profs, postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>('');  
  const [content, setContent] = useState<string>('');  
  const [liked, setLiked] = useState(false);  
  const [likeCount, setLikeCount] = useState<number>(0);  // 기본값 0으로 초기화

  // 임시 사용자 ID 하드코딩
  const tempUserId = 3;

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/`
      );
      const postData = response.data.post;

      // likes 배열에서 좋아요 수 추출, likes 배열이 없거나 비어 있으면 기본값 0
      const likeCountFromResponse = response.data.likes?.length > 0 ? response.data.likes[0].like : 0;

      setPost(postData);
      setLikeCount(likeCountFromResponse);  // 좋아요 수 설정
      setTitle(postData.title);  
      setContent(postData.content);  
      setLiked(response.data.likes.some((like: any) => like.user === tempUserId)); 

      // 로그는 데이터를 설정한 후 출력
      console.log("Post title:", postData.title);  
      console.log("Like Count:", likeCountFromResponse);  // 좋아요 수 로그
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("API Error:", axiosError);
      if (axiosError.response?.status === 404) {
        Alert.alert('Error', '게시물을 찾을 수 없습니다.');
      } else {
        console.error(axiosError);
      }
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/`
      );
      setComments(response.data.comment || []);
      console.log("Comments:", response.data.comment);  // 댓글 데이터 로그
    } catch (error) {
      console.error('댓글을 가져오는 중 오류 발생:', error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        await axios.patch(
          `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/likes`
        );
        setLikeCount(likeCount - 1);  // 좋아요 수 감소
      } else {
        await axios.post(
          `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/likes`
        );
        setLikeCount(likeCount + 1);  // 좋아요 수 증가
      }
      setLiked(!liked);  // 상태 토글
    } catch (error) {
      console.error(liked ? '좋아요 감소 실패:' : '좋아요 추가 실패:', error);
      Alert.alert('실패', liked ? '좋아요 취소에 실패했습니다.' : '좋아요 추가에 실패했습니다.');
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.post(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/`,
        {
          comment: newComment,
          user: tempUserId,  
        }
      );
      Alert.alert('성공', '댓글이 성공적으로 등록되었습니다.');
      setNewComment('');  
      fetchComments();  
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      Alert.alert('실패', '댓글 등록에 실패했습니다.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/`,
        { title, content }  
      );
      Alert.alert('수정 완료', '게시물이 수정되었습니다.');
      setEditMode(false);  
      fetchPost();  
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
          {post.title && (
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{post.title}</Text>
          )}
          {post.content && (
            <Text style={{ marginVertical: 10 }}>{post.content}</Text>
          )}
          {post.dt_created && (
            <Text>{new Date(post.dt_created).toLocaleDateString()}</Text>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <TouchableOpacity onPress={handleLikeToggle}>
              <Image source={require('../assets/Likes.png')} style={{ width: 24, height: 24, marginRight: 8 }} />
            </TouchableOpacity>
            {likeCount !== undefined && (
              <Text>{likeCount}</Text>
            )}
          </View>
          <Button title="수정" onPress={() => setEditMode(true)} />
          <Button title="삭제" onPress={handleDelete} color="red" />
        </>
      )}
      
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        placeholder="댓글을 입력하세요"
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />
      <Button title="댓글 작성" onPress={handleCommentSubmit} />

      {comments.map((comment) => (
        <View key={comment.id} style={{ marginVertical: 10 }}>
          <Text>{comment.comment}</Text>
        </View>
      ))}
    </View>
  );
};

export default MajorScreen;
