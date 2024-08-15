import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { HomeScreenNavigationProp } from '../types/navigation';
import ProfileIcon from '../src/components/UserIcon';
import ComongIcon from '../src/components/ComongIcon';
import SearchIcon from '../src/components/SearchIcon';
import NotificationIcon from '../src/components/NotificationIcon';

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

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [boards, setBoards] = useState<Scrap[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBoardData();
      setBoards(data);
    };

    loadData();
  }, []);

  const renderBoard = ({ item }: { item: Scrap }) => {
    const parsedData = parseScrapBoard(item.scrap_board);

    return (
      <TouchableOpacity
        style={styles.boardBox}
        onPress={() => {
          if (parsedData) {
            navigation.navigate('Detail', {
              subjectCode: parsedData.subjectCode,
              professorCode: parsedData.professorCode
            });
          }
        }}
      >
        {parsedData ? (
          <Text style={styles.boardTitle}>
            {Object.keys(subMap).find(key => subMap[key] === parsedData.subjectCode)} 
            ({Object.keys(profMap).find(key => profMap[key] === parsedData.professorCode)})
          </Text>
        ) : (
          <Text style={styles.boardTitle}>정보 없음</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        {/* <ComongIcon></ComongIcon> */}
        <Text style={styles.text}>커몽</Text>
        
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
          <Text>Log In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Search', { serverUrl: 'https://comong-jennie-server.onrender.com/main/' })}>
          <SearchIcon></SearchIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <NotificationIcon></NotificationIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <ProfileIcon></ProfileIcon>
        </TouchableOpacity>


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
          {/* 여기는 전체 게시판 스크린으로 이동하게 수정 */}
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.moreText}>
              전체 게시판 보기
            </Text>
          </TouchableOpacity>
        </View>


        <View>
          <Text style={styles.midTitle}>
            구인 게시판
          </Text>
        </View>

      </View>

      

    {/* 구인 게시판 최신 글 볼 수 있는 기능 구현 */}

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
    // marginLeft: 20,
    // marginRight: 20,
    marginTop: 40,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
  },
  boardBox: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    // Align items center to ensure the box is not stretched
    alignItems: 'center',
  },
  boardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#050360',
  },
  moreText: {
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'right',
    color: '#050360',
    fontWeight: 'bold',
  },
  marginSetBox: {
    // marginLeft: 15,
    // marginRight: 15,
  },
  midTitle: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'left',
    color: '#050360',
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
  },
});

export default HomeScreen;