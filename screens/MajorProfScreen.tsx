import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { RootStackParamList } from '../types/navigation';

type MajorProfScreenRouteProp = RouteProp<RootStackParamList, 'MajorProf'>;
type MajorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Major'>;

const MajorProfScreen: React.FC = () => {
  const route = useRoute<MajorProfScreenRouteProp>();
  const navigation = useNavigation<MajorScreenNavigationProp>(); // useNavigation에 타입 지정
  const { grade, subject, professor } = route.params;

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
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

    fetchProfessorPosts();
  }, [grade, subject, professor]);

  const handlePostPress = (postId: number) => {
    navigation.navigate('Major', { grade, sub: subject, profs: professor, postId });
  };

  return (
    <ScrollView>
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

export default MajorProfScreen;
