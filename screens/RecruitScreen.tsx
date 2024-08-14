// App.tsx
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';

interface DataItem {
  id: number;
  name: string;
  email: string;
  // 다른 필요한 필드를 여기에 추가하세요
}

export default function App() {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('https://comong-jennie-server.onrender.com/main/join/');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            {/* 다른 데이터를 출력하고 싶다면 여기에 추가하세요 */}
          </View>
        )}
      />
    </View>
  );
}
