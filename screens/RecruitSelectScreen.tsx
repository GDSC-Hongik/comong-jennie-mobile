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
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToPostDetail(item.id)} style={styles.postItem}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text
                style={[
                  styles.participants,
                  item.participants_num - item.current_num === 1 && { color: 'red' },
                  item.participants_num - item.current_num === 0 && { color: '#D3D3D3' } // Light gray color
                ]}
              >
                {item.current_num} / {item.participants_num}
              </Text>
            </View>
          </TouchableOpacity>
        )}
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
  postItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0080DD',
  },
  participants: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0080DD',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: '#0080DD',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pencilIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});

export default RecruitSelectScreen;
