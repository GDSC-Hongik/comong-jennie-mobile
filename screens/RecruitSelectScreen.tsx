import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useFocusEffect } from '@react-navigation/native';

interface RecruitSelectScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RecruitSelect'>;
}

interface Post {
  id: number;
  title: string;
  content: string | null; // content가 null일 수 있으므로 null 허용
  participants_num: number;
  current_num: number;
}

const RecruitSelectScreen: React.FC<RecruitSelectScreenProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://comong-jennie-server.onrender.com/main/join/');
      
      // 응답 데이터 구조 확인을 위해 로그 추가
      console.log('API Response:', response.data);

      setPosts(response.data);
      setError(null); // Clear previous errors
    } catch (err) {
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [fetchPosts])
  );

  const goToPostDetail = (postId: number) => {
    navigation.navigate('Recruit', { postId });
  };

  const goToPostCreation = () => {
    navigation.navigate('RecruitPost'); // RecruitPostScreen으로 이동
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
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity
              onPress={() => goToPostDetail(item.id)}
              style={[
                styles.postItem,
                index === 0 && { marginTop: 62 }, // 최상단 여백
                index === posts.length - 1 && { marginBottom: 42 }, // 최하단 여백
              ]}
            >
              <View style={styles.postHeader}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text
                  style={[
                    styles.participants,
                    item.participants_num - item.current_num === 1 && { color: 'red' },
                    item.participants_num - item.current_num === 0 && { color: '#D3D3D3' }, // Light gray color
                  ]}
                >
                  {item.current_num} / {item.participants_num}
                </Text>
              </View>
              {/* content가 null이 아닌 경우에만 표시 */}
              {item.content ? (
                <Text style={styles.content}>{item.content}</Text>
              ) : (
                <Text style={styles.content}>No content available</Text> 
              )}
            </TouchableOpacity>
            {index !== posts.length - 1 && (
              <View style={styles.divider} />
            )}
          </>
        )}
        contentContainerStyle={styles.listContentContainer}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={goToPostCreation}>
        <Image source={require('../assets/Pencil.png')} style={styles.pencilIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContentContainer: {
    paddingHorizontal: 10, // 좌우측 여백
  },
  postItem: {
    width: 340, // 너비 설정
    height: 93, // 높이 설정 (필요에 따라 수정)
    flexDirection: 'column', // 세로 배치
    justifyContent: 'flex-start', // 상단 정렬
    alignItems: 'center', // 중앙 정렬 (내부 컨텐츠 기준)
    flexShrink: 0, // 축소 방지
    paddingVertical: 10, // 내용과 테두리 간 여백 추가
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 좌우 끝에 배치
    alignItems: 'flex-start', // 상단 정렬
    width: '100%',
    paddingHorizontal: 16, // 좌우 패딩
    paddingTop: 10, // 상단 패딩
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0080DD',
    textAlign: 'left', // 제목 좌측 정렬
  },
  participants: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0080DD',
    textAlign: 'right', // 인원 우측 정렬
  },
  content: {
    fontSize: 14,
    color: '#333', // 내용 텍스트 색상 설정
    marginTop: 8, // 제목과 내용 간의 간격 설정
    paddingHorizontal: 16, // 내용 좌우 패딩
    textAlign: 'left', // 내용 좌측 정렬
    alignSelf: 'stretch', // 내용이 좌우로 늘어나게 설정
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#D3D3D3', // 회색 구분선
    marginVertical: 12, // 게시물 간 간격
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    right: 20, // 우측 상단으로 이동
    top: 20, // 상단으로 이동
  },
  pencilIcon: {
    width: 30,
    height: 30,
    tintColor: '#0080DD', // 아이콘 색상을 원래 색상으로 복원
  },
});

export default RecruitSelectScreen;
