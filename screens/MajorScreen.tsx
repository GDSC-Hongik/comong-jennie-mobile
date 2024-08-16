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
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState<string>(''); // 수정할 댓글 내용 상태
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>('');  
  const [content, setContent] = useState<string>('');  
  const [liked, setLiked] = useState(false);  
  const [likeCount, setLikeCount] = useState<number>(0);

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
      const likeCountFromResponse = response.data.likes?.length > 0 ? response.data.likes[0].like : 0;

      setPost(postData);
      setLikeCount(likeCountFromResponse);
      setTitle(postData.title);
      setContent(postData.content);
      setLiked(response.data.likes.some((like: any) => like.user === tempUserId));
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
      console.log("Comments:", response.data.comment);
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
        setLikeCount(likeCount - 1);
      } else {
        await axios.post(
          `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/likes`
        );
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error(liked ? '좋아요 감소 실패:' : '좋아요 추가 실패:', error);
      Alert.alert('실패', liked ? '좋아요 취소에 실패했습니다.' : '좋아요 추가에 실패했습니다.');
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/${postId}/`,
        {
          comment: newComment,
          user: tempUserId,  
        }
      );
      console.log("댓글 작성 성공:", response.data);
      Alert.alert('성공', '댓글이 성공적으로 등록되었습니다.');
      setNewComment('');
      fetchComments();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('댓글 등록 실패:', error.response?.data || error.message);
        Alert.alert('실패', `댓글 등록에 실패했습니다: ${error.response?.data?.detail || error.message}`);
      } else {
        console.error('알 수 없는 오류:', error);
        Alert.alert('실패', '알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleCommentEdit = async (commentId: number) => {
    const editCommentUrl = `https://comong-jennie-server.onrender.com/main/major/${encodeURIComponent(grade)}/${encodeURIComponent(sub)}/${encodeURIComponent(profs)}/${postId}/${commentId}`;
    console.log("Attempting to edit comment at URL:", editCommentUrl);
    try {
      await axios.patch(editCommentUrl, { comment: editCommentText });
      Alert.alert('성공', '댓글이 성공적으로 수정되었습니다.');
      setEditCommentId(null);
      setEditCommentText('');
      fetchComments();
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      Alert.alert('실패', '댓글 수정에 실패했습니다.');
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    const deleteCommentUrl = `https://comong-jennie-server.onrender.com/main/major/${encodeURIComponent(grade)}/${encodeURIComponent(sub)}/${encodeURIComponent(profs)}/${postId}/${commentId}`;
    console.log("Attempting to delete comment at URL:", deleteCommentUrl);
    try {
      await axios.delete(deleteCommentUrl);
      Alert.alert('성공', '댓글이 성공적으로 삭제되었습니다.');
      fetchComments();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      Alert.alert('실패', '댓글 삭제에 실패했습니다.');
    }
  };

  // 게시물 업데이트
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

  // 게시물 삭제
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
          {editCommentId === comment.id ? (
            <>
              <TextInput
                value={editCommentText}
                onChangeText={setEditCommentText}
                placeholder="댓글을 수정하세요"
                style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
              />
              <Button title="저장" onPress={() => handleCommentEdit(comment.id)} />
              <Button title="취소" onPress={() => setEditCommentId(null)} color="red" />
            </>
          ) : (
            <>
              <Text>{comment.comment}</Text>
              <Button title="수정" onPress={() => { setEditCommentId(comment.id); setEditCommentText(comment.comment); }} />
              <Button title="삭제" onPress={() => handleCommentDelete(comment.id)} color="red" />
            </>
          )}
        </View>
      ))}
    </View>
  );
};

export default MajorScreen;
