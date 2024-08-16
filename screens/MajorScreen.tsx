import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

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
  const [editCommentText, setEditCommentText] = useState<string>(''); 
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
      if (axios.isAxiosError(error)) {
        Alert.alert('실패', `댓글 등록에 실패했습니다: ${error.response?.data?.detail || error.message}`);
      } else {
        Alert.alert('실패', '알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleCommentEdit = async (commentId: number) => {
    const editCommentUrl = `https://comong-jennie-server.onrender.com/main/major/${encodeURIComponent(grade)}/${encodeURIComponent(sub)}/${encodeURIComponent(profs)}/${postId}/${commentId}`;
    try {
      await axios.patch(editCommentUrl, { comment: editCommentText });
      Alert.alert('성공', '댓글이 성공적으로 수정되었습니다.');
      setEditCommentId(null);
      setEditCommentText('');
      fetchComments();
    } catch (error) {
      Alert.alert('실패', '댓글 수정에 실패했습니다.');
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    const deleteCommentUrl = `https://comong-jennie-server.onrender.com/main/major/${encodeURIComponent(grade)}/${encodeURIComponent(sub)}/${encodeURIComponent(profs)}/${postId}/${commentId}`;
    try {
      await axios.delete(deleteCommentUrl);
      Alert.alert('성공', '댓글이 성공적으로 삭제되었습니다.');
      fetchComments();
    } catch (error) {
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
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>{sub} 게시판</Text>
        <TouchableOpacity onPress={handleCommentSubmit}>
          <Image source={require('../assets/Pencil.png')} style={styles.writeIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {editMode ? (
          <>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="제목"
              style={styles.inputTitle}
            />
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="내용"
              style={styles.inputContent}
              multiline
            />
            <View style={styles.editButtonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={handleUpdate}>
                <Text style={styles.editButtonText}>저장</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(false)}>
                <Text style={styles.editButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {post.title && (
              <Text style={styles.postTitle}>{post.title}</Text>
            )}
            {post.content && (
              <Text style={styles.postContent}>{post.content}</Text>
            )}
            {post.dt_created && (
              <Text style={styles.postDate}>{new Date(post.dt_created).toLocaleDateString()}</Text>
            )}
            <View style={styles.bottomContainer}>
              <View style={styles.likeContainer}>
                <TouchableOpacity onPress={handleLikeToggle}>
                  <Image source={require('../assets/Likes.png')} style={styles.likeIcon} />
                </TouchableOpacity>
                {likeCount !== undefined && (
                  <Text>{likeCount}</Text>
                )}
              </View>
              <View style={styles.postButtonContainer}>
                <TouchableOpacity style={styles.postButton} onPress={() => setEditMode(true)}>
                  <Text style={styles.postButtonText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postButton} onPress={handleDelete}>
                  <Text style={styles.postButtonText}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="댓글을 입력하세요"
          style={styles.inputComment}
        />
        <Button title="댓글 작성" onPress={handleCommentSubmit} color="#050360" />

        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentContainer}>
            {editCommentId === comment.id ? (
              <>
                <TextInput
                  value={editCommentText}
                  onChangeText={setEditCommentText}
                  placeholder="댓글을 수정하세요"
                  style={styles.inputEditComment}
                />
                <View style={styles.editCommentButtonContainer}>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleCommentEdit(comment.id)}>
                    <Text style={styles.editButtonText}>저장</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editButton} onPress={() => setEditCommentId(null)}>
                    <Text style={styles.editButtonText}>취소</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.commentText}>{comment.comment}</Text>
                <View style={styles.commentButtonContainer}>
                  <Button title="수정" onPress={() => { setEditCommentId(comment.id); setEditCommentText(comment.comment); }} color="#050360" />
                  <Button title="삭제" onPress={() => handleCommentDelete(comment.id)} color="#050360" />
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#050360',
  },
  writeIcon: {
    width: 24,
    height: 24,
  },
  content: {
    padding: 20,
  },
  inputTitle: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    color: '#050360',
  },
  inputContent: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    height: 150,
    color: '#050360',
  },
  inputComment: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
    color: '#050360',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#050360',
  },
  postContent: {
    marginVertical: 10,
    color: '#050360',
  },
  postDate: {
    marginBottom: 10,
    color: '#050360',
  },
  commentContainer: {
    marginVertical: 10,
    position: 'relative',
  },
  inputEditComment: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
    color: '#050360',
  },
  commentText: {
    fontSize: 12,
    color: '#050360',
  },
  noPostsText: {
    color: '#050360',
  },
  postButtonContainer: {
    flexDirection: 'row',
  },
  postButton: {
    marginLeft: 10,  
  },
  postButtonText: {
    color: '#050360',
    fontSize: 12,
    padding: 5,
  },
  commentButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    marginLeft: 10, 
  },
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#050360',
    paddingHorizontal: 10,
    paddingVertical: 5,
    // marginLeft 제거하여 버튼 간의 간격을 없앰
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
  },
  editCommentButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    bottom: 0,  // 버튼 위치를 댓글 창의 우측 하단으로 조정
    // 두 버튼 사이의 간격 제거
  },
});

export default MajorScreen;
