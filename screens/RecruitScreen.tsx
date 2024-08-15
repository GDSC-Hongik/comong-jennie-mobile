import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, Button } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

interface RecruitScreenProps {
  route: {
    params: {
      postId: number;
    };
  };
  navigation: NativeStackNavigationProp<RootStackParamList, 'Recruit'>;
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
      Alert.alert('Success', 'Resume submitted successfully!');
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
      Alert.alert('Success', 'Post deleted successfully!');
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
      {post ? (
        <>
          <View style={styles.postHeader}>
            <Text style={styles.title}>{post.title}</Text>
            <Text
              style={[
                styles.participants,
                post.participants_num - post.current_num === 1 && { color: 'red' },
                post.participants_num - post.current_num === 0 && { color: '#D3D3D3' } // Light gray color
              ]}
            >
              {post.current_num} / {post.participants_num}
            </Text>
          </View>
          <Text style={styles.content}>{post.content}</Text>
          <Text style={styles.sectionTitle}>Comments:</Text>
          {comments.length > 0 ? (
            comments.map(comment => (
              <View key={comment.id} style={styles.commentContainer}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentText}>User: {comment.user}</Text>
                  <TouchableOpacity onPress={() => handleResumeClick(comment.id, comment.resume_id)}>
                    <Text style={styles.resumeLink}>View Resume</Text>
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
                    <Text style={styles.resumeTitle}>Resume Details</Text>
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
          <View style={styles.addCommentContainer}>
            <Button
              title={isSubmitting ? "Submitting..." : "Submit Resume"}
              onPress={handleSubmitResume}
              disabled={isSubmitting}
            />
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={deletePost}>
            <Text style={styles.deleteButtonText}>Delete Post</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0080DD',
  },
  participants: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0080DD',
  },
  content: {
    fontSize: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  commentContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
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
  },
  resumeLink: {
    color: '#0080DD',
    textDecorationLine: 'underline',
    marginTop: 5,
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
  },
  error: {
    color: 'red',
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
  addCommentContainer: {
    marginTop: 20,
  },
  deleteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecruitScreen;
