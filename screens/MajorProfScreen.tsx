import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const MajorProfScreen: React.FC = () => {
  const route = useRoute();
  const { grade, subject, professor } = route.params as { grade: number, subject: string, professor: string };
  const [info, setInfo] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfInfo = async () => {
      try {
        const response = await axios.get(`https://comong-jennie-server.onrender.com/main/major/${grade}/${subject}/${professor}/`);
        setInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch professor info', error);
      }
    };

    fetchProfInfo();
  }, [grade, subject, professor]);

  return (
    <View>
      <Text>{`Professor ${professor} Information in ${subject}`}</Text>
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

export default MajorProfScreen;
