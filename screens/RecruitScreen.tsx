import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

interface Post {
  id: number;
  title: string;
  content: string;
  participants_num: number;
  current_num: number;
}

interface Comment {
  id: number;
  user: string;
  resume_id: string;
}

interface Resume {
  project: string;
  contest: string;
  etc: string;
  link: string;
  skill: string;
  appeal: string;
}

interface RecruitScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Recruit'>;
  route: RouteProp<RootStackParamList, 'Recruit'>;
}

const RecruitScreen: React.FC<RecruitScreenProps> = ({ route, navigation }) => {
  const { postId } = route.params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [resumes, setResumes] = useState<{ [key: string]: Resume[] | null }>({});
  const [openCommentIds, setOpenCommentIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://comong-jennie-server.onrender.com/main/join/${postId}/`);
      setPost(response.data.post);
      setComments(response.data.comment);
      setLoading(false);
    } catch (err) {
      setError('Failed to load post data.');
      setLoading(false);
    }
  };

  const handleResumeClick = async (commentId: number, resumeId: string) => {
    if (openCommentIds.includes(commentId)) {
      setOpenCommentIds(openCommentIds.filter(id => id !== commentId));
    } else {
      try {
        setLoading(true);
        const parsedResumeId = parseInt(resumeId, 10);
        const resumeUrl = !isNaN(parsedResumeId)
          ? `https://comong-jennie-server.onrender.com/users/resumes/${parsedResumeId}`
          : resumeId;

        const response = await axios.get(resumeUrl);
        setResumes(prev => ({ ...prev, [resumeId]: response.data }));
        setOpenCommentIds([...openCommentIds, commentId]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load resume data.');
        setLoading(false);
      }
    }
  };

  const handleAccept = async () => {
    try {
      await axios.post(`https://comong-jennie-server.onrender.com/main/join/${postId}/update/`);
      fetchPost(); // 업데이트 후 게시물 정보 다시 가져오기
    } catch (err) {
      Alert.alert('Error', 'Failed to accept.');
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(`https://comong-jennie-server.onrender.com/main/join/${postId}/update/`);
      fetchPost(); // 업데이트 후 게시물 정보 다시 가져오기
    } catch (err) {
      Alert.alert('Error', 'Failed to reject.');
    }
  };

  const handleSubmitResume = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`https://comong-jennie-server.onrender.com/main/join/${postId}/comment/`, {
        user: 2, // 하드코딩된 사용자 ID
      });
      Alert.alert('Success', '이력서 제출 성공!');
      fetchPost(); // 댓글 추가 후 게시물 정보 다시 가져오기
    } catch (err) {
      Alert.alert('Error', 'Failed to submit resume.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`https://comong-jennie-server.onrender.com/main/join/${postId}/`);
      Alert.alert('Success', '게시물 삭제 성공!');
      navigation.navigate('RecruitSelect'); // RecruitSelectScreen으로 이동
    } catch (error) {
      Alert.alert('Error', 'Failed to delete post.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0080DD" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>구인게시판</Text>
      {post ? (
        <>
          <View style={styles.postHeader}>
            <Text style={styles.title}>{post.title}</Text>
            <View style={styles.participantsContainer}>
              <Text
                style={styles.participants(
                  post.participants_num - post.current_num === 1,
                  post.participants_num - post.current_num === 0
                )}
              >
                {post.current_num} / {post.participants_num}
              </Text>
            </View>
          </View>
          <Text style={styles.content}>{post.content}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.deleteButton} onPress={deletePost}>
              <Text style={styles.deleteButtonText}>게시물 삭제</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleSubmitResume}
              disabled={isSubmitting}
            >
              <Image source={require('../assets/Pencil.png')} style={styles.pencilIcon} />
              <Text style={styles.buttonText}>
                {isSubmitting ? "제출 중..." : "이력서 제출"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionDivider} />

          {comments.length > 0 ? (
            comments.map(comment => (
              <View key={comment.id} style={styles.commentContainer}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentText}>User: {comment.user}</Text>
                  <TouchableOpacity onPress={() => handleResumeClick(comment.id, comment.resume_id)}>
                    <Text style={styles.resumeLink}>이력서 열람</Text>
                  </TouchableOpacity>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleAccept}>
                      <Image source={require('../assets/Circle.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleReject}>
                      <Image source={require('../assets/X.png')} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                </View>
                {openCommentIds.includes(comment.id) && resumes[comment.resume_id] && (
                  <View style={styles.resumeContainer}>
                    <Text style={styles.resumeTitle}>이력</Text>
                    <Text>Project: {resumes[comment.resume_id]?.[0]?.project || 'N/A'}</Text>
                    <Text>Contest: {resumes[comment.resume_id]?.[0]?.contest || 'N/A'}</Text>
                    <Text>Etc: {resumes[comment.resume_id]?.[0]?.etc || 'N/A'}</Text>
                    <Text>Link: {resumes[comment.resume_id]?.[0]?.link || 'N/A'}</Text>
                    <Text>Skill: {resumes[comment.resume_id]?.[0]?.skill || 'N/A'}</Text>
                    <Text>Appeal: {resumes[comment.resume_id]?.[0]?.appeal || 'N/A'}</Text>
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text>No comments available.</Text>
          )}
        </>
      ) : (
        <Text style={styles.error}>No post data available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40, // 최상단 40px 여백
    paddingHorizontal: 10, // 좌우 10px 여백
    paddingBottom: 43, // 하단 43px 여백
    justifyContent: 'flex-start', // 모든 내용을 위로 정렬
    backgroundColor: '#FFF', // 전체 배경색 설정
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // 텍스트 아래에 여백 추가
    color: '#050360', // 텍스트 색상 설정
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%', // 전체 너비 사용
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#050360', // 텍스트 색상 설정
    marginLeft: 10, // 좌측 여백 유지
  },
  participantsContainer: {
    borderRadius: 10,
    backgroundColor: '#F0F0F0', // 배경색 설정
    paddingHorizontal: 10, // 텍스트 좌우 패딩
    paddingVertical: 5, // 텍스트 상하 패딩
    flexShrink: 0, // 축소 방지
    justifyContent: 'center', // 내용 중앙 정렬
    alignItems: 'center', // 내용 중앙 정렬
    marginRight: 10, // 우측 여백 유지
  },
  participants: (isOneLeft: boolean, isFull: boolean) => ({
    fontSize: 16,
    fontWeight: '700',
    color: isFull ? '#D3D3D3' : isOneLeft ? 'red' : '#050360', // 텍스트 색상 설정
  }),
  content: {
    fontSize: 14,
    marginBottom: 12,
    color: '#050360',
    textAlign: 'left', // Align text to the left
    width: '100%', // Ensure it uses the full width
    paddingHorizontal: 10, // Optional: Add padding to keep text away from edges
  },
  sectionDivider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3', // 회색 구분선
    marginVertical: 16, // 구분선 위아래 여백 16px 설정
  },
  commentContainer: {
    marginBottom: 16, // 구분선과 댓글 사이 간격 16px로 설정
    padding: 10,
    backgroundColor: '#F0F0F0', // 배경색 설정
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#050360', // 테두리 색상 설정
    alignItems: 'flex-start',
    width: '100%',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  commentText: {
    fontSize: 14,
    color: '#050360', // 텍스트 색상 설정
    alignItems: 'center',
  },
  resumeLink: {
    fontSize: 14,
    color: '#050360', // 텍스트 색상 설정
    textDecorationLine: 'underline',
  },
  resumeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: '100%',
  },
  resumeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#050360', // 텍스트 색상 설정
  },
  error: {
    color: '#050360', // 텍스트 색상 설정
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16, // 구분선과 버튼 사이의 간격 16px로 설정
    paddingHorizontal: 10, // 좌우 여백 추가
  },
  buttonContainer: {
    width: 156,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#F0F0F0', // 버튼 배경색
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // 이미지와 텍스트를 가로로 배치
  },
  buttonText: {
    fontSize: 16, // 텍스트 크기
    color: '#050360', // 텍스트 색상
    marginLeft: 8, // 텍스트와 아이콘 사이의 여백
  },
  pencilIcon: {
    width: 16, // 아이콘 크기 설정
    height: 16,
    marginRight: 8, // 아이콘과 텍스트 사이의 여백
  },
  deleteButton: {
    width: 156,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#F0F0F0', // 버튼 배경색
    justifyContent: 'center', // 내용 중앙 정렬
    alignItems: 'center', // 내용 중앙 정렬
  },
  deleteButtonText: {
    fontSize: 16, // 텍스트 크기
    color: '#050360', // 텍스트 색상
  },
});

export default RecruitScreen;
