import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import axios from 'axios';

type MajorSelectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MajorSelect'
>;

export const subMap: { [key: string]: string } = {
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
  "임베디드시스템및실험": "ES&L",
};

export const profMap: { [key: string]: string } = {
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
  "김일도": "KimID",
};

const MajorSelectScreen: React.FC = () => {
  const navigation = useNavigation<MajorSelectScreenNavigationProp>();

  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});
  const [subjectOpenStates, setSubjectOpenStates] = useState<{ [key: number]: { [subject: string]: boolean } }>({});
  const [subjectsMap, setSubjectsMap] = useState<{ [key: number]: string[] }>({});
  const [professorsMap, setProfessorsMap] = useState<{ [key: number]: { [subject: string]: string[] } }>({});

  const handleGradeToggle = async (grade: number) => {
    const newOpenState = !openStates[grade];
    setOpenStates(prevState => ({
      ...prevState,
      [grade]: newOpenState,
    }));
    
    if (newOpenState) {
      setSubjectOpenStates(prevState => ({
        ...prevState,
        [grade]: Object.keys(prevState[grade] || {}).reduce((acc, subject) => {
          acc[subject] = false;
          return acc;
        }, {} as { [subject: string]: boolean })
      }));
      
      if (!subjectsMap[grade]) {
        await fetchSubjectsForGrade(grade);
      }
    }
  };

  const fetchSubjectsForGrade = async (grade: number) => {
    try {
      const response = await axios.get(`https://comong-jennie-server.onrender.com/main/major/${grade}/`);
      const uniqueSubjects: string[] = Array.from(new Set(response.data.map((item: any) => {
        const subjectKey = Object.keys(subMap).find(key => subMap[key] === item.sub);
        return subjectKey || item.sub;
      })));
      setSubjectsMap(prevState => ({
        ...prevState,
        [grade]: uniqueSubjects,
      }));
    } catch (error) {  
      setSubjectsMap(prevState => ({
        ...prevState,
        [grade]: [],
      }));
    }
  };

  const handleSubjectToggle = async (grade: number, subject: string) => {
    setSubjectOpenStates(prevState => ({
      ...prevState,
      [grade]: {
        ...(prevState[grade] || {}),
        [subject]: !prevState[grade]?.[subject],
      },
    }));

    const mappedSubject = subMap[subject];
    if (mappedSubject && (!professorsMap[grade] || !professorsMap[grade][mappedSubject])) {
      await fetchProfessorsForSubject(grade, subject);
    }
  };

  const fetchProfessorsForSubject = async (grade: number, subject: string) => {
    const mappedSubject = subMap[subject];
    if (mappedSubject) {
      try {
        const response = await axios.get(`https://comong-jennie-server.onrender.com/main/major/${grade}/${mappedSubject}/`);
        const uniqueProfessors: string[] = Array.from(new Set(response.data.map((item: any) => {
          const professorKey = Object.keys(profMap).find(key => profMap[key] === item.profs);
          return professorKey || item.profs;
        })));
        setProfessorsMap(prevState => ({
          ...prevState,
          [grade]: {
            ...(prevState[grade] || {}),
            [mappedSubject]: uniqueProfessors,
          },
        }));
      } catch (error) {  
        setProfessorsMap(prevState => ({
          ...prevState,
          [grade]: {
            ...(prevState[grade] || {}),
            [mappedSubject]: [],
          },
        }));
      }
    }
  };

  const handleGradeClick = (grade: number) => {
    navigation.navigate('MajorGrade', { grade });
  };

  const handleSubjectClick = (grade: number, subject: string) => {
    const mappedSubject = subMap[subject];
    if (mappedSubject) {
      navigation.navigate('MajorSub', { grade, subject: mappedSubject });
    } else {
      console.error(`Subject mapping for ${subject} not found.`);
    }
  };

  const handleProfessorClick = (grade: number, subject: string, professor: string) => {
    const mappedProfessor = profMap[professor];
    const mappedSubject = subMap[subject];
    if (mappedProfessor && mappedSubject) {
      navigation.navigate('MajorProf', { grade, subject: mappedSubject, professor: mappedProfessor });
    } else {
      console.error(`Professor mapping for ${professor} not found.`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.title}>전공과목 게시판</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {[2, 3, 4].map(grade => (
          <View key={grade} style={styles.gradeContainer}>
            <View style={styles.gradeHeader}>
              <TouchableOpacity onPress={() => handleGradeToggle(grade)}>
                <Image source={require('../assets/folder.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGradeClick(grade)} style={styles.gradeText}>
                <Text style={styles.text}>{grade}학년</Text>
              </TouchableOpacity>
            </View>
            {openStates[grade] && subjectsMap[grade]?.length > 0 && subjectsMap[grade].map(subject => (
              <View key={subject} style={styles.subjectContainer}>
                <View style={styles.subjectHeader}>
                  <TouchableOpacity onPress={() => handleSubjectToggle(grade, subject)}>
                    <Image source={require('../assets/folder.png')} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSubjectClick(grade, subject)} style={styles.subjectText}>
                    <Text style={styles.text}>{subject}</Text>
                  </TouchableOpacity>
                </View>
                {subjectOpenStates[grade]?.[subject] && professorsMap[grade]?.[subMap[subject]]?.map(professor => (
                  <View key={professor} style={styles.professorContainer}>
                    <TouchableOpacity>
                      <Image source={require('../assets/folder.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleProfessorClick(grade, subject, professor)} style={styles.professorText}>
                      <Text style={styles.text}>{professor}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // 전체 배경색 흰색
  },
  header: {
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // 헤더 배경색 흰색
    paddingHorizontal: 20,
    zIndex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 20,
    color: '#050360',
    marginLeft: 10,
    fontWeight: 'bold', // 제목을 볼드체로 설정
    textAlign: 'center', // 제목을 가운데 정렬
    flex: 1, // 제목을 가운데 정렬하기 위해 flex 사용
  },
  scrollView: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingLeft: 27, // 좌측 여백을 27px로 설정
  },
  gradeContainer: {
    marginBottom: 12,
  },
  gradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  gradeText: {
    marginLeft: 30,
    backgroundColor: '#fff', // 학년 텍스트 배경색 흰색
  },
  subjectContainer: {
    marginBottom: 12,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    marginLeft: 30,
    backgroundColor: '#fff', // 과목 헤더 배경색 흰색
  },
  subjectText: {
    marginLeft: 30,
    backgroundColor: '#fff', // 과목 텍스트 배경색 흰색
  },
  professorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 60,
    marginBottom: 2,
    backgroundColor: '#fff', // 교수 컨테이너 배경색 흰색
  },
  professorText: {
    marginLeft: 30,
    backgroundColor: '#fff', // 교수 텍스트 배경색 흰색
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    color: '#050360',
  },
});

export default MajorSelectScreen;
