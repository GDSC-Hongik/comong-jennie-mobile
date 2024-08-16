import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Modal, Button } from 'react-native';
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

  return (
    <ScrollView>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <Text>{subject} 과목</Text>
          <TouchableOpacity onPress={handleCreatePostPress}>
            <Image source={require('../assets/Pencil.png')} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <ScrollView style={{ maxHeight: 400 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>교수 선택</Text>
                {Object.keys(profMap).map((professorKey) => (
                  <TouchableOpacity key={professorKey} onPress={() => setSelectedProf(professorKey)}>
                    <Text style={{ marginVertical: 5 }}>{professorKey}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Button title="확인" onPress={handleConfirmSelection} />
              <Button title="취소" onPress={() => setModalVisible(false)} color="red" />
            </View>
          </View>
        </Modal>

        {info.length > 0 ? (
          info.map((post, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Major', { grade, sub: subject, profs: post.profs, postId: post.id })}>
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

export default MajorSubScreen;
