import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const MajorSubScreen: React.FC = () => {
  const route = useRoute();
  const { grade, subject } = route.params as { grade: number, subject: string };
  const [info, setInfo] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubjectInfo = async () => {
      try {
        const response = await axios.get(`https://comong-jennie-server.onrender.com/main/major/${grade}/${subject}/`);
        setInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch subject info', error);
      }
    };

    fetchSubjectInfo();
  }, [grade, subject]);

  return (
    <View>
      <Text>{`${subject} Information`}</Text>
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

export default MajorSubScreen;
