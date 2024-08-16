import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type MajorPostScreenRouteProp = RouteProp<RootStackParamList, 'MajorPost'>;
type MajorPostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MajorPost'>;

const MajorPostScreen: React.FC = () => {
  const route = useRoute<MajorPostScreenRouteProp>();
  const navigation = useNavigation<MajorPostScreenNavigationProp>();
  const { grade, sub, profs } = route.params;

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = async () => {
    const requestData = {
      title,
      content,
      user: 1  // 임시로 user ID를 하드코딩
    };

    try {
      const response = await axios.post(
        `https://comong-jennie-server.onrender.com/main/major/${grade}/${sub}/${profs}/create/`,
        requestData
      );
      console.log("POST request successful:", response.data);
      Alert.alert('성공', '게시글이 성공적으로 작성되었습니다.');
      navigation.goBack();  // 글 작성 후 이전 화면으로 돌아갑니다.
    } catch (error: any) {
      console.error('게시글 작성 실패:', error.response ? error.response.data : error.message);
      Alert.alert('실패', '게시글 작성에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>전공 게시글 작성</Text>
        </View>
      </View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="제목"
        placeholderTextColor="#050360"
        style={styles.input}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="내용"
        placeholderTextColor="#050360"
        style={[styles.input, styles.contentInput]}
        multiline
      />
      <Button title="작성하기" onPress={handleSubmit} color="#050360" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10, // 로고와 텍스트 간격 조정
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#050360',
  },
  input: {
    height: 40,
    borderColor: '#050360',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#050360',
  },
  contentInput: {
    height: 150,
  },
});

export default MajorPostScreen;
