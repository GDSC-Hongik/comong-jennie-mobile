import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
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

  // 학년, 과목, 교수 상태를 독립적으로 관리하는 객체
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});
  const [subjectsMap, setSubjectsMap] = useState<{ [key: number]: string[] }>({});
  const [professorsMap, setProfessorsMap] = useState<{ [key: number]: { [subject: string]: string[] } }>({});

  const handleGradeToggle = async (grade: number) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [grade]: !prevState[grade], // 클릭한 학년의 상태만 변경
    }));

    if (!openStates[grade] && !subjectsMap[grade]) {
      await fetchSubjectsForGrade(grade);
    }
  };

  const fetchSubjectsForGrade = async (grade: number) => {
    try {
      const response = await axios.get(`https://comong-jennie-server.onrender.com/main/major/${grade}/`);
      const uniqueSubjects: string[] = Array.from(new Set(response.data.map((item: any) => {
        const subjectKey = Object.keys(subMap).find(key => subMap[key] === item.sub);
        return subjectKey || item.sub;
      })));
      setSubjectsMap((prevState) => ({
        ...prevState,
        [grade]: uniqueSubjects,
      }));
    } catch (error: any) {  
      setSubjectsMap((prevState) => ({
        ...prevState,
        [grade]: [],
      }));
    }
  };

  const handleSubjectToggle = async (grade: number, subject: string) => {
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
        setProfessorsMap((prevState) => ({
          ...prevState,
          [grade]: {
            ...(prevState[grade] || {}),
            [mappedSubject]: uniqueProfessors,
          },
        }));
      } catch (error: any) {  
        setProfessorsMap((prevState) => ({
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
    <View >
      {[2, 3, 4].map((grade) => (
        <View key={grade}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleGradeToggle(grade)}>
              <Image source={require('../assets/folder.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleGradeClick(grade)}>
              <Text>{grade}학년 정보 보기</Text>
            </TouchableOpacity>
          </View>
          {openStates[grade] && subjectsMap[grade]?.length > 0 && subjectsMap[grade].map((subject) => (
            <View key={subject}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleSubjectToggle(grade, subject)}>
                  <Image source={require('../assets/folder.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubjectClick(grade, subject)}>
                  <Text>{subject} 정보 보기</Text>
                </TouchableOpacity>
              </View>
              {professorsMap[grade]?.[subMap[subject]]?.map((professor) => (
                <View key={professor} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <Image source={require('../assets/folder.png')} style={{ width: 24, height: 24 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleProfessorClick(grade, subject, professor)}>
                    <Text>{professor} 정보 보기</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
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
    marginTop: 40,
  },
});

export default MajorSelectScreen;
