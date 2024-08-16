import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Modal, Button } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { RootStackParamList } from '../types/navigation';
import { subMap, profMap } from './MajorSelectScreen';

type MajorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MajorGrade'>;

const MajorGradeScreen: React.FC = () => {
  const navigation = useNavigation<MajorScreenNavigationProp>();
  const route = useRoute();
  const { grade } = route.params as { grade: number };
  const [info, setInfo] = useState<any[]>([]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedProf, setSelectedProf] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchGradeInfo = async () => {
    try {
      const response = await axios.get(`https://comong-jennie-server.onrender.com/main/major/${grade}/`);
      setInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch grade info', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchGradeInfo();
    }, [grade])
  );

  const handleCreatePostPress = () => {
    setModalVisible(true);
  };

  const handleConfirmSelection = () => {
    if (selectedSub !== null && selectedProf !== null) {
      setModalVisible(false);
      navigation.navigate('MajorPost', {
        grade,
        sub: subMap[selectedSub],
        profs: profMap[selectedProf],
      });
    } else {
      Alert.alert("과목과 교수를 모두 선택해 주세요.");
    }
  };

  return (
    <ScrollView>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <Text>{grade}학년</Text>
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
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>과목 선택</Text>
                {Object.keys(subMap).map((subjectKey) => (
                  <TouchableOpacity key={subjectKey} onPress={() => setSelectedSub(subjectKey)}>
                    <Text style={{ marginVertical: 5 }}>{subjectKey}</Text>
                  </TouchableOpacity>
                ))}

                <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>교수 선택</Text>
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
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Major', { grade, sub: post.sub, profs: post.profs, postId: post.id })}>
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
