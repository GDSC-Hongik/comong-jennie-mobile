import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToBoard = (boardName) => {
    switch (boardName) {
      case '자유게시판':
        // navigation.navigate('FreeBoard'); // 자유게시판으로 이동
        break;
      case '졸업생게시판':
        // navigation.navigate('AlumniBoard'); // 졸업생게시판으로 이동
        break;
      case '채용정보게시판':
        // navigation.navigate('JobBoard'); // 채용정보게시판으로 이동
        break;
      case '전공과목게시판':
        navigation.navigate('MajorBoardList'); // 전공과목게시판으로 이동
        break;
      case '개발정보게시판':
        // navigation.navigate('DevInfoBoard'); // 개발정보게시판으로 이동
        break;
      case '프로젝트 구인':
        // navigation.navigate('ProjectRecruitmentBoard'); // 프로젝트 구인으로 이동
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image style={styles.logo} source={require('./assets/Logo.png')} />
          <Text style={styles.title}>커몽</Text>
        </View>
        <View style={styles.icons}>
          <Image style={styles.icon} source={require('./assets/Search.png')} />
          <Image style={styles.icon} source={require('./assets/Bell.png')} />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={{ position: 'relative' }}>
              <Image style={styles.profile} source={require('./assets/Shape.png')} />
              <Image style={styles.badge} source={require('./assets/Award.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        <View style={styles.favoriteContainer}>
          <Text style={styles.favoriteText}>즐겨찾기</Text>
        </View>
        <View style={styles.boardContainer}>
          {[
            { title: "컴퓨터네트워크", professor: "박준상 교수님", semester: "3-1" },
            { title: "정보보안", professor: "이윤영 교수님", semester: "4-1" },
            { title: "객체지향프로그", professor: "박준 교수님", semester: "2-1" },
            { title: "컴퓨터구조", professor: "박재영 교수님", semester: "3-1" }
          ].map((item, index) => (
            <View key={index} style={styles.boardItem}>
              <View style={styles.boardItemHeader}>
                <Text style={styles.boardItemTitle}>{item.title}</Text>
                <Text style={styles.boardItemProfessor}>{item.professor}</Text>
              </View>
              <Text style={styles.boardItemSemester}>{item.semester}</Text>
              <View style={styles.comments}>
                <Image style={styles.commentIcon} source={require('./assets/Thumbs-up.png')} />
                <View style={styles.commentBox}>
                  <Text style={styles.commentText}>이 문제 어케 푸나요???</Text>
                </View>
              </View>
              <View style={styles.comments}>
                <Image style={styles.commentIcon} source={require('./assets/Thumbs-up.png')} />
                <View style={styles.commentBox}>
                  <Text style={styles.commentText}>이거 푼 사람 있나</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          {[
            "자유게시판",
            "졸업생게시판",
            "채용정보게시판",
            "전공과목게시판",
            "개발정보게시판",
            "프로젝트 구인"
          ].map((section, index) => (
            <TouchableOpacity key={index} style={styles.sectionItem} onPress={() => navigateToBoard(section)}>
              <Image style={styles.sectionIcon} source={require('./assets/Folder.png')} />
              <Text style={styles.sectionText}>{section}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.projectContainer}>
          {[
            {
              title: "캡스톤 하실분",
              details: "파이썬 가능자 모집해요\n자율주행 차량 소프트웨어 개발\n탈주 안 하실분 구합니다",
              progress: "1/8"
            },
            {
              title: "웹 프로젝트 구인",
              details: "자바 탑승\n백엔드 개발\n탈주 안 하실분 구합니다",
              progress: "1/8"
            },
            {
              title: "공모전 구해요",
              details: "파이썬 가능자 모집해요\n인공지능 소프트웨어 개발\n탈주 안 하실분 구합니다",
              progress: "1/8"
            }
          ].map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <View style={styles.projectBox}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDetails}>{project.details}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBox}>
                    <Text style={styles.progressText}>{project.progress}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
          <Image style={styles.arrowRight} source={require('./assets/Arrow-right.png')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#050360',
    marginLeft: 10,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 16,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
  },
  badge: {
    position: 'absolute',
    width: 10,
    height: 10,
    left: 15,
    top: 0,
  },
  favoriteContainer: {
    width: 97,
    height: 24,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80, // header 높이만큼 여백 추가
    alignSelf: 'flex-start',
    marginLeft: 23,
  },
  favoriteText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#050360',
  },
  boardContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 314,
  },
  boardItem: {
    width: 150,
    height: 100,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  boardItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boardItemTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#050360',
  },
  boardItemProfessor: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#050360',
    textAlign: 'right',
  },
  boardItemSemester: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#050360',
    marginTop: 5,
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  commentIcon: {
    width: 16,
    height: 16,
  },
  commentBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 7,
    flex: 1,
    justifyContent: 'center',
  },
  commentText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#050360',
  },
  sectionContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 23,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 27,
  },
  sectionIcon: {
    width: 20,
    height: 20,
  },
  sectionText: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#050360',
  },
  projectContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectItem: {
    width: 99,
    height: 124,
    marginRight: 6,
  },
  projectBox: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    padding: 10,
  },
  projectTitle: {
    fontSize: 6,
    fontWeight: 'bold',
    color: '#050360',
  },
  projectDetails: {
    fontSize: 5,
    fontWeight: 'bold',
    color: '#050360',
    marginTop: 5,
  },
  progressContainer: {
    position: 'absolute',
    right: 8,
    top: 12,
  },
  progressBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  progressText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#050360',
  },
  arrowRight: {
    width: 20,
    height: 20,
  },
});

export default HomeScreen;
