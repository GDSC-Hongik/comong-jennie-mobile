import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { RootStackParamList } from '../types/navigation';  // RootStackParamList를 가져옵니다.

type MajorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Major'>;

const MajorGradeScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<MajorScreenNavigationProp>();
  const { grade } = route.params as { grade: number };
  const [info, setInfo] = useState<any[]>([]);

  useEffect(() => {
    const fetchGradeInfo = async () => {
      try {
        const response = await axios.get(`https://comong-jennie-server.onrender.com/main/major/${grade}/`);
        setInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch grade info', error);
      }
    };

    fetchGradeInfo();
  }, [grade]);

  const handlePostPress = (sub: string, profs: string, postId: number) => {
    navigation.navigate('Major', { grade, sub, profs, postId });
  };

  return (
    <ScrollView>
      <View>
        {info.length > 0 ? (
          info.map((post) => (
            <TouchableOpacity key={post.id} onPress={() => handlePostPress(post.sub, post.profs, post.id)}>
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

export default MajorGradeScreen;