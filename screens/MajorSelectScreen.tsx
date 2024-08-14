import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; 
import axios from 'axios';

type MajorSelectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MajorSelect'
>;

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

const MajorSelectScreen: React.FC = () => {
  const navigation = useNavigation<MajorSelectScreenNavigationProp>();

  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]); 
  const [professors, setProfessors] = useState<string[]>([]);

  const handleGradeToggle = async (grade: number) => {
    if (selectedGrade === grade) {
      setSelectedGrade(null);
      setSubjects([]); 
      setSelectedSubject(null);
      setProfessors([]);
    } else {
      setSelectedGrade(grade);
      setSelectedSubject(null);
      setProfessors([]);
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
      setSubjects(uniqueSubjects);
      
    } catch (error: any) {  
      if (error.response && error.response.status === 404) {
        setSubjects([]); 
      } else {
        setSubjects([]); 
      }
    }
  };

  const handleSubjectToggle = async (subject: string) => {
    if (selectedSubject === subject) {
      setSelectedSubject(null);
      setProfessors([]);
    } else {
      setSelectedSubject(subject);
      await fetchProfessorsForSubject(selectedGrade!, subject);
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
        setProfessors(uniqueProfessors);
      } catch (error: any) {  
        setProfessors([]); 
      }
    } else {
      console.error(`Subject mapping for ${subject} not found.`);
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

  const handleProfessorClick = (professor: string) => {
    const mappedProfessor = profMap[professor];
    if (selectedGrade !== null && selectedSubject && mappedProfessor) {
      navigation.navigate('MajorProf', { grade: selectedGrade, subject: subMap[selectedSubject], professor: mappedProfessor });
    } else {
      console.error(`Professor mapping for ${professor} not found.`);
    }
  };

  return (
    <View>
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
          {selectedGrade === grade && subjects.length > 0 && subjects.map((subject) => (
            <View key={subject}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleSubjectToggle(subject)}>
                  <Image source={require('../assets/folder.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubjectClick(grade, subject)}>
                  <Text>{subject} 정보 보기</Text>
                </TouchableOpacity>
              </View>
              {selectedSubject === subject && professors.map((professor) => (
                <View key={professor} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <Image source={require('../assets/folder.png')} style={{ width: 24, height: 24 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleProfessorClick(professor)}>
                    <Text>{professor} 정보 보기</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default MajorSelectScreen;
