import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Dimensions } from 'react-native';
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
  content: string | null;
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
      
      console.log('API Response:', response.data);

      setPosts(response.data);
      setError(null);
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
    navigation.navigate('RecruitPost');
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
      <View style={styles.headerContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>구인게시판</Text>
        <TouchableOpacity style={styles.floatingButton} onPress={goToPostCreation}>
          <Image source={require('../assets/Pencil.png')} style={styles.pencilIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity
              onPress={() => goToPostDetail(item.id)}
              style={[
                styles.postItem,
                index === 0 && { marginTop: 20 }, // 게시물 컨테이너 상단 여백 조정
                index === posts.length - 1 && { marginBottom: 20 }, // 게시물 컨테이너 하단 여백 조정
              ]}
            >
              <View style={styles.postHeader}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <View style={styles.participantsContainer}>
                  <Text
                    style={[
                      styles.participants,
                      item.participants_num - item.current_num === 1 && { color: 'red' },
                      item.participants_num - item.current_num === 0 && { color: '#D3D3D3' },
                    ]}
                  >
                    {item.current_num} / {item.participants_num}
                  </Text>
                </View>
              </View>
              <Text style={styles.content}>{item.content ? item.content : 'No content available'}</Text>
            </TouchableOpacity>
            {index !== posts.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        )}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10, // 화면 좌우 여백 설정
    paddingTop: 20, // 화면 상단 여백
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 0,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#050360',
    flex: 1,
    textAlign: 'left',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    top: 30, // 최상단 여백을 30px로 설정
  },
  pencilIcon: {
    width: 30,
    height: 30,
    tintColor: '#050360',
  },
  listContentContainer: {
    paddingBottom: 20, // 리스트 하단 여백
  },
  postItem: {
    width: 316, // 너비 설정
    height: 95, // 높이 설정
    backgroundColor: '#fff', // 배경색
    borderRadius: 8, // 테두리 둥글기
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 1 }, // 그림자 위치
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 2, // 그림자 반경
    paddingHorizontal: 12, // 좌우 패딩 12px로 설정
    paddingVertical: 10, // 상하 패딩
    marginBottom: 20, // 게시물 간 간격
    alignSelf: 'center', // 중앙 정렬
    flexDirection: 'column', // 세로 배치
    justifyContent: 'flex-start', // 내용 상단 정렬
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 제목과 인원 컨테이너가 좌우 끝에 배치
    alignItems: 'center',
    marginTop: 3, // 게시물 상단에서 3px 떨어지게 설정
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#050360',
  },
  participantsContainer: {
    borderRadius: 10,
    backgroundColor: '#F0F0F0', // 회색 배경
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginRight: 10, // 우측 여백 유지
  },
  participants: {
    fontSize: 16,
    fontWeight: '700',
    color: '#050360', // 기본 색상
  },
  content: {
    fontSize: 12,
    color: '#050360',
    marginTop: 2, // 제목과 내용 간의 간격 설정
  },
  divider: {
    height: 1,
    width: screenWidth - 20, // 화면 좌우 여백을 고려한 길이 (10px 좌우 여백 x 2)
    backgroundColor: '#D3D3D3', // 회색 구분선
    marginVertical: 10, // 게시물 간 간격과 맞추기 위한 여백
    alignSelf: 'center', // 구분선을 중앙에 배치
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default RecruitSelectScreen;