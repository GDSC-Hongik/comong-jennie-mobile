import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from '../App';

type MajorProfScreenRouteProp = RouteProp<RootStackParamList, 'MajorProf'>;

const MajorProfScreen: React.FC = () => {
  const route = useRoute<MajorProfScreenRouteProp>();
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

  return (
    <ScrollView>
      <View>
        {posts.length > 0 ? (
          posts.map((post) => (
            <View key={post.id} style={{ marginVertical: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{post.title}</Text>
              <Text>{post.content}</Text>
              <Text>{new Date(post.dt_created).toLocaleDateString()}</Text>
            </View>
          ))
        ) : (
          <Text>게시글이 없습니다.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default MajorProfScreen;
