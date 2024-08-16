import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

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

  // 화면이 다시 포커스될 때마다 데이터를 다시 가져옴
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
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <Text>{professor} 교수님의 {subject} 수업</Text>
        <TouchableOpacity onPress={handleCreatePostPress}>
          <Image source={require('../assets/Pencil.png')} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
      <View>
        {posts.length > 0 ? (
          posts.map((post) => (
            <TouchableOpacity key={post.id} onPress={() => handlePostPress(post.id)}>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{post.title}</Text>
                <Text>{post.content}</Text>
                <Text>{new Date(post.dt_created).toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>게시글이 없습니다.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15,
    marginTop: 40,
  },
});

export default MajorProfScreen;
