

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { HomeScreenNavigationProp } from '../types/navigation';
import ProfileIcon from '../src/components/UserIcon';
import ComongIcon from '../src/components/ComongIcon';
import SearchIcon from '../src/components/SearchIcon';
import NotificationIcon from '../src/components/NotificationIcon';
import { SearchBar } from 'react-native-screens';

interface Post {
  id: number;
  title: string;
  content: string;
  current_num: number;
  participants_num: number;
}

// Define the mapping for subjects and professors
const subMap: { [key: string]: string } = {
  "자료구조및프로그래밍": "DS&P",
  "논리회로설계및실험": "LC&L",
  "인터넷프로그래밍": "IP",
  "HCI윈도우즈프로그래밍": "HCIWP",
  "알고리즘분석": "AA",
  "컴퓨터구조": "CA",
  "프로그래밍언어론": "PLT",
  "컴퓨터네트워크": "CN",
  "비디오이미지프로세싱": "VIP",
  "AIML응용프로젝트1": "AIMLAP1",
  "창직종합설계프로젝트1": "P1",
  "창직종합설계프로젝트2": "P2",
  "AIML응용프로젝트2": "AIMLAP2",
  "블록체인": "BC",
  "딥러닝자연어처리": "DLNLP",
  "운영체제": "OS",
  "오토마타": "AT",
  "기초데이터베이스": "IDB",
  "디지털시스템설계": "DSD",
  "문제해결기법": "PST",
  "기계학습기초": "FML",
  "어셈블리언어및실습": "ALP",
  "데이터통신": "DC",
  "멀티미디어응용수학": "AMM",
  "소프트웨어공학": "SE",
  "응용데이터베이스": "DCA",
  "정보보안": "IS",
  "컴퓨터그래픽스와메타버스": "CG&M",
  "기계학습심화": "AML",
  "임베디드시스템및실험": "ES&L"
};

const profMap: { [key: string]: string } = {
  "배성일": "PaeS",
  "송하윤": "SongH",
  "이혜영1": "LeeHY1",
  "Leonard Mcmillan": "LeonardM",
  "이기철": "LeeK",
  "이준용": "LeeJY",
  "김상곤": "KimSG",
  "김한규": "KimHG",
  "김영호": "KimYH",
  "최윤화": "ChoiYH",
  "이장호": "LeeJH",
  "박재영2": "ParkJY2",
  "하란": "HaR",
  "권건우": "KwonKW",
  "박필원": "ParkPW",
  "표창우": "PyoCW",
  "박준철": "ParkJC",
  "박준상1": "ParkJS1",
  "김태형3": "KimTH3",
  "김은삼": "KimES",
  "이윤규": "LeeYG",
  "박지헌": "ParkJH",
  "김선일": "KimSI",
  "윤영": "YoonY",
  "김경창": "KimKC",
  "김일도": "KimID"
};

// Function to parse scrap_board and return subjectCode and professorCode
const parseScrapBoard = (scrap_board: string): { subjectCode: string; professorCode: string } | null => {
  const parts = scrap_board.split('/');
  const subjectCode = parts[4];
  const professorCode = parts[5];

  return subjectCode && professorCode ? { subjectCode, professorCode } : null;
};

interface Scrap {
  id: number;
  scrap_board: string;
  title: string; // 게시물 제목
}

interface Props {
  navigation: HomeScreenNavigationProp;
}

const fetchBoardData = async (): Promise<Scrap[]> => {
  try {
    const response = await fetch('https://comong-jennie-server.onrender.com/main/');
    const data = await response.json();
    return data.Scrapped;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchLatestPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch('https://comong-jennie-server.onrender.com/main/join/');
    const data = await response.json();
    return data.slice(0, 6);  // 최신 6개의 포스트만 반환
  } catch (error) {
    console.error(error);
    return [];
  }
};

// const fetchLatestPosts = async (): Promise<Post[]> => {
//   try {
//     // Fetch the latest post IDs
//     const response = await fetch('https://comong-jennie-server.onrender.com/main/join/');
//     const postIds = await response.json();
    
//     // Fetch content for each post
//     const posts = await Promise.all(postIds.slice(0, 6).map(async (postId: number) => {
//       const contentResponse = await fetch(`https://comong-jennie-server.onrender.com/main/join/${postId}`);
//       const contentData = await contentResponse.json();
//       return {
//         id: postId,
//         title: contentData.title,
//         content: contentData.post.content,
//         current_num: contentData.current_num,
//         participants_num: contentData.participants_num,
//       };
//     }));

//     return posts;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // 전공 선택 화면으로 이동
  const goToMajorSelectScreen = () => {
    navigation.navigate('MajorSelect');
  };

  // 구인 게시판 화면으로 이동
  const goToRecruitSelectScreen = () => {
    navigation.navigate('RecruitSelect');
  };
  const [boards, setBoards] = useState<Scrap[]>([]);
  const [latestPosts, setLatestPosts] = useState<Scrap[]>([]); // 최신 게시물 저장할 상태

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBoardData();
      setBoards(data);
      
      // 최신 게시물 두 개 추출
      const sortedBoards = [...data].sort((a, b) => b.id - a.id);
      const latest = sortedBoards.slice(0, 2);
      setLatestPosts(latest);
    };

    loadData();
  }, []);

  const renderBoard = ({ item }: { item: Scrap }) => {
    const parsedData = parseScrapBoard(item.scrap_board);
    const latestPost = latestPosts.find(post => parseScrapBoard(post.scrap_board)?.subjectCode === parsedData?.subjectCode);



    return (
      <TouchableOpacity
        style={styles.boardBox}
        onPress={() => {
          if (parsedData) {
            // navigation.navigate('Recruit', {
            //   subjectCode: parsedData.subjectCode,
            //   professorCode: parsedData.professorCode,
            // });
          }
        }}
      >
        {parsedData ? (
          <>
            <Text style={styles.boardTitle}>
              {Object.keys(subMap).find(key => subMap[key] === parsedData.subjectCode)} 
              ({Object.keys(profMap).find(key => profMap[key] === parsedData.professorCode)})
            </Text>
            {/* 최신 게시물 제목 표시 */}
            {latestPost && (
              <Text style={styles.postTitle}>
                {latestPost.title}
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.boardTitle}>정보 없음</Text>
        )}
      </TouchableOpacity>
    );
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
    const boxWidth = windowWidth * 0.4;  // 화면 너비의 40%로 설정
    const boxHeight = 250; 

    return (
      <TouchableOpacity
        style={[styles.postBox, { width: boxWidth, height: boxHeight }]}
        onPress={() => navigation.navigate('Recruit', { postId: item.id })}
      >
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent} numberOfLines={3}>{item.content}</Text>
        <Text style={styles.postParticipants}>
          {item.current_num} / {item.participants_num}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.topbar}>
        
        <View style={styles.topbarLeft}>
          <Text style={styles.text}>커몽</Text>
        </View>
        
        <View style={styles.topbarRight}>
          <TouchableOpacity style= {styles.SearchBar}onPress={() => navigation.navigate('Search', { serverUrl: 'https://comong-jennie-server.onrender.com/main/' })}>
            <View>
              <SearchIcon width={40} height={40}></SearchIcon>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <View style={{padding: 10}}>  
              <NotificationIcon></NotificationIcon>
              </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View>
              <ProfileIcon></ProfileIcon>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.marginSetBox}>
        <View>
          <Text style={styles.midTitle}>
            즐겨찾기 게시판
          </Text>
        </View>
        <FlatList<Scrap>
          data={boards}
          renderItem={renderBoard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />

        <View>
          <TouchableOpacity onPress={goToMajorSelectScreen}>
            <Text style={styles.moreText}>
              전체 게시판 보기
            </Text>
          </TouchableOpacity>
        </View>

      <View style={styles.marginSetBox}>
        <TouchableOpacity onPress={goToRecruitSelectScreen}>
          <Text style={styles.midTitle}>
            구인 게시판
          </Text >
        </TouchableOpacity>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
          <FlatList<Post>
           data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id.toString()}
            horizontal  // 수평 스크롤을 위해 설정
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15,
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
    paddingBottom: 10,
    textAlign: 'left',
    color: '#050360',
    fontWeight: 'bold',
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
    textAlign: 'center',
    color: '#050360',
  },
  postTitle: {
    fontSize: 16,
    color: '#050360',
    textAlign: 'center',
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
    textAlign: 'center',
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

export default HomeScreen;
