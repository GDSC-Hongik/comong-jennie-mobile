import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { StyleSheet } from 'react-native';
import { profMap, subMap } from './MajorSelectScreen';

type MajorProfScreenRouteProp = RouteProp<RootStackParamList, 'MajorProf'>;
type MajorProfScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MajorProf'>;

const MajorProfScreen: React.FC = () => {
  const route = useRoute<MajorProfScreenRouteProp>();
  const navigation = useNavigation<MajorProfScreenNavigationProp>();
  const { grade, subject, professor } = route.params;

  const [posts, setPosts] = useState<any[]>([]);

  const fetchProfessorPosts = async () => {
    try {
      const response = await axios.get(`https://comong-jennie-server.onrender.com/main/major/${grade}/${subject}/${professor}/`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        console.error('Unexpected response format');
      }
    } catch (error) {
      console.error('Failed to fetch professor posts', error);
    }
  };

  useEffect(() => {
    fetchProfessorPosts();
  }, [grade, subject, professor]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfessorPosts();
    });

    return unsubscribe;
  }, [navigation]);

  const handlePostPress = (postId: number) => {
    navigation.navigate('Major', { grade, sub: subject, profs: professor, postId });
  };

  const handleCreatePostPress = () => {
    navigation.navigate('MajorPost', { grade, sub: subject, profs: professor });
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>전공과목 게시판</Text>
        <TouchableOpacity onPress={handleCreatePostPress}>
          <Image source={require('../assets/Pencil.png')} style={styles.writeIcon} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => handlePostPress(post.id)}>
                  <View style={styles.postContainer}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postContent}>{post.content}</Text>
                    <Text style={styles.postDate}>{new Date(post.dt_created).toLocaleDateString()}</Text>
                  </View>
                </TouchableOpacity>
                {index < posts.length - 1 && <View style={styles.divider}></View>} 
              </View>
            ))
          ) : (
            <Text style={styles.noPostsText}>게시글이 없습니다.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingHorizontal: 22, // 전체 화면 좌우측과 게시글 컨테이너 간 좌우 간격
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ffffff',
    paddingTop: 20,  // 헤더를 아래로 내리기 위한 추가된 부분
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
    color: '#050360', // 글자색 설정
  },
  writeIcon: {
    width: 24,
    height: 24,
  },
  content: {
    paddingTop: 17, // 첫 번째 게시글과 헤더 간격 설정
  },
  postContainer: {
    width: 316, // 게시글 컨테이너 폭 설정
    height: 95, // 게시글 컨테이너 높이 설정
    flexShrink: 0,
    marginBottom: 17, // 게시글 컨테이너 간의 간격 설정
    justifyContent: 'center', // 상하 중앙 정렬
    paddingLeft: 10, // 좌측 패딩을 추가하여 텍스트가 너무 붙지 않도록 설정
  },
  divider: {
    height: 1,
    backgroundColor: '#cccccc', // 회색 구분선
    marginHorizontal: 10, // 구분선 좌우 끝 간의 간격
  },
  postTitle: {
    fontWeight: 'bold',
    color: '#050360', // 글자색 설정
  },
  postContent: {
    color: '#050360', // 글자색 설정
  },
  postDate: {
    color: '#050360', // 글자색 설정
  },
  noPostsText: {
    color: '#050360', // 글자색 설정
  },
});

export default MajorProfScreen;
