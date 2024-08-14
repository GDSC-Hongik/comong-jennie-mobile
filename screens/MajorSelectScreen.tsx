import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const MajorSelectScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);

  const handleGradeToggle = async (grade: number) => {
    if (selectedGrade === grade) {
      setSelectedGrade(null);
      setSubjects([]);
    } else {
      setSelectedGrade(grade);
      try {
        const response = await axios.get(`https://comong-jennie-server.onrender.com/major/major/${grade}/`);
        const subValues = response.data.map((item: { sub: string }) => item.sub);
        setSubjects(subValues);
      } catch (error) {
        console.error('Failed to fetch subjects', error);
      }
    }
  };

  const handleSubjectClick = (grade: number, subject: string) => {
    navigation.navigate('Major', { grade, subject });
  };

  return (
    <View>
      {[1, 2, 3, 4].map((grade) => (
        <View key={grade}>
          <TouchableOpacity onPress={() => handleGradeToggle(grade)}>
            <Text>📁 Grade {grade}</Text>
          </TouchableOpacity>
          {selectedGrade === grade && subjects.map((subject) => (
            <TouchableOpacity key={subject} onPress={() => handleSubjectClick(grade, subject)}>
              <Text>📄 {subject}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default MajorSelectScreen;
