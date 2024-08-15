//최근 검색어 보이게 수정
//SearchScreen.tsx 검색창
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface Post {
  id: string;
  title: string;
  content: string;
}

const SearchScreen: React.FC = ({ }) => {
  const [kind, setKind] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  
  const route = useRoute();
  const { serverUrl } = route.params as { serverUrl: string }; // 전달받은 서버 주소

  const handleSearch = () => {
    const url = `${serverUrl}/?search=${encodeURIComponent(kind)}`;
    
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResults(data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search for Posts</Text>
      <TextInput
        style={styles.input}
        placeholder="제목, 내용, 작성자, #태그"
        value={kind}
        onChangeText={setKind}
      />
      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  postContainer: {
    marginBottom: 15,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchScreen;
