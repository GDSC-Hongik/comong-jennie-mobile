import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const MajorGradeScreen: React.FC = () => {
  const route = useRoute();
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

  return (
    <View>
      <Text>{`Grade ${grade} Information`}</Text>
      {info.map((item, index) => (
        <View key={index}>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
          <Text>{item.time}</Text>
        </View>
      ))}
    </View>
  );
};

export default MajorGradeScreen;
