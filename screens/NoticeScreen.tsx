import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, NotificationScreenNavigationProp } from '../types/navigation';
import NotificationBox from '../src/components/NotificationBox';
import TitleComponent from '../src/components/TitleComponent';

interface Props {
  navigation: NotificationScreenNavigationProp;
}

const NoticeScreen: React.FC<Props> = ({ navigation }) => {

    interface Scrap {
        id: number;
        scrap_board: string;
        title: string; // 게시물 제목
      }
      interface Post {
        id: number;
        title: string;
        content: string;
        current_num: number;
        participants_num: number;
      }



      const fetchLatestPosts = async (): Promise<Post[]> => {
        try {
          const response = await fetch('https://comong-jennie-server.onrender.com/main/');
          const data = await response.json();
          return data.notice.slice(0, 10);  // 최신 6개의 포스트만 반환
        } catch (error) {
          console.error(error);
          return [];
        }
      };

      const [posts, setPosts] = useState<Post[]>([]);

      useEffect(() => {
        const loadPosts = async () => {
          const data = await fetchLatestPosts();
          setPosts(data);
        };
    
        loadPosts();
      }, []);
    
      const renderPost = ({ item }: { item: Post }) => {
        const windowWidth = Dimensions.get('window').width;
        const boxWidth = windowWidth * 0.9;  // 화면 너비의 40%로 설정
        const boxHeight = 70; 
    
        return (
          <TouchableOpacity
            style={[styles.postBox, { width: boxWidth, height: boxHeight }]}
            onPress={() => navigation.navigate('Recruit', { postId: item.id })}
          >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent} numberOfLines={3}>{item.content}</Text>
          </TouchableOpacity>
        );
      };
    
  
    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.marginSetBox}>
        <View style={styles.topbarLeft}>
          <Text style={styles.text}>학과 공지사항</Text>
        </View>
        <FlatList<Post>
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false} // 수직 스크롤바를 숨기고 싶다면 설정
        />
        </View>
        </ScrollView>
    );
    
  };

  const styles = StyleSheet.create({
    container: {
        marginTop: 40,
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: 15,
      paddingBottom: 80,
    },
    flatListContainer: {
      flexGrow: 1,
    },
    topbar: {
      marginTop: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',          // 세로 중앙 정렬
      marginBottom: 20,     
    },
    topbarLeft: {
      justifyContent: 'flex-start',
    },
    topbarRight: {
      flexDirection: 'row',          // 아이콘들을 가로로 배치
      justifyContent: 'flex-end',    // 오른쪽에 정렬
      alignItems: 'center', 
    },
    text: {
      fontSize: 25,
      paddingTop: 10,
      paddingBottom: 30,
      textAlign: 'left',
      color: '#050360',
      fontWeight: 'bold',
      marginLeft: 5,
    },
    boardBox: {
      backgroundColor: '#F0F0F0',
      flex: 1,
      margin: 5,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
    },
    boardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'left',
      color: '#050360',
    },
    postTitle: {
      fontSize: 16,
      color: '#050360',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    moreText: {
      fontSize: 14,
      paddingTop: 10,
      paddingBottom: 10,
      textAlign: 'right',
      color: '#050360',
      fontWeight: 'bold',
    },
    marginSetBox: {},
    midTitle: {
      fontSize: 20,
      marginBottom: 20,
      paddingTop: 10,
      //paddingBottom: 10,
      textAlign: 'left',
      color: '#050360',
      fontWeight: 'bold',
    },
    profileIcon: {
      width: 40,
    },
    postBox: {
      backgroundColor: '#F0F0F0',
      width: 60,
      height: 200,
      padding: 10,
      borderRadius: 10,
      margin: 4,  // 간격을 조정
      justifyContent: 'center',
    },
    postTitle2: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#050360',
      textAlign: 'center',
    },
    postContent: {
      fontSize: 14,
      color: '#333',
      marginVertical: 5,
      textAlign: 'left',
    },
    postParticipants: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFF',
      textAlign: 'center',
      padding: 5,
      backgroundColor: '#0080DC',
    },
    scrollContainer: {
      flexDirection: 'row',
      paddingVertical: 8,
    },
    SearchBar: {
      backgroundColor: '#F0F0F0',
      borderRadius: 10,
      paddingLeft: 150,
      paddingRight: 5,
      paddingBottom: 5,
      paddingTop: 5,
  
    }
  });

export default NoticeScreen;