import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Modal, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { RootStackParamList } from '../types/navigation';
import { profMap } from './MajorSelectScreen';

type MajorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MajorSub'>;

const MajorSubScreen: React.FC = () => {
  const navigation = useNavigation<MajorScreenNavigationProp>();
  const route = useRoute();
  const { grade, subject } = route.params as { grade: number; subject: string };
  const [info, setInfo] = useState<any[]>([]);
  const [selectedProf, setSelectedProf] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchSubInfo = async () => {
    try {
      const response = await axios.get(`https://comong-jennie-server.onrender.com/main/major/${grade}/${subject}/`);
      setInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch subject info', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSubInfo();
    }, [grade, subject])
  );

  const handleCreatePostPress = () => {
    setModalVisible(true);
  };

  const handleConfirmSelection = () => {
    if (selectedProf !== null) {
      setModalVisible(false);
      navigation.navigate('MajorPost', {
        grade,
        sub: subject,
        profs: profMap[selectedProf],
      });
    } else {
      Alert.alert("교수를 선택해 주세요.");
    }
  };

  const handleCancelSelection = () => {
    setModalVisible(false);
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <ScrollView style={{ maxHeight: 400 }}>
                  <Text style={styles.modalTitle}>교수 선택</Text>
                  {Object.keys(profMap).map((professorKey) => (
                    <TouchableOpacity key={professorKey} onPress={() => setSelectedProf(professorKey)}>
                      <Text style={styles.modalItem}>{professorKey}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSelection}>
                    <Text style={styles.buttonText}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSelection}>
                    <Text style={styles.buttonText}>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {info.length > 0 ? (
            info.map((post, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.postContainer}
                  onPress={() => navigation.navigate('Major', { grade, sub: subject, profs: post.profs, postId: post.id })}
                >
                  <View>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postContent}>{post.content}</Text>
                    <Text style={styles.postDate}>{new Date(post.dt_created).toLocaleDateString()}</Text>
                  </View>
                </TouchableOpacity>
                {index < info.length - 1 && <View style={styles.divider} />}
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#050360', // 글자색 설정
  },
  modalItem: {
    marginVertical: 5,
    color: '#050360', // 글자색 설정
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#050360',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#050360',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
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

export default MajorSubScreen;
