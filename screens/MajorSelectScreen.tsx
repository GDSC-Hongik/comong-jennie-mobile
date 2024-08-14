import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const subMap: { [key: string]: string } = {
  "자료구조및프로그래밍": "DSandProg",
  "논리회로설계및실험": "LCandExp",
  "인터넷프로그래밍": "IntProg",
  "HCI윈도우즈프로그래밍": "HCIWinProg",
  "알고리즘분석": "AlgoAnal",
  "컴퓨터구조": "CompArch",
  "프로그래밍언어론": "PLang",
  "컴퓨터네트워크": "CompNet",
  "비디오이미지프로세싱": "VIP",
  "AIML응용프로젝트1": "AIMLProj1",
  "창직종합설계프로젝트1": "InnovDesProj1",
  "창직종합설계프로젝트2": "InnovDesProj2",
  "AIML응용프로젝트2": "AIMLProj2",
  "블록체인": "Blockchain",
  "딥러닝자연어처리": "DLNLP",
  "운영체제": "OS",
  "오토마타": "Automata",
  "기초데이터베이스": "BasicDB",
  "디지털시스템설계": "DigSysDes",
  "문제해결기법": "ProblemSolv",
  "기계학습기초": "MLBasics",
  "어셈블리언어및실습": "AssemblyLang",
  "데이터통신": "DataComm",
  "멀티미디어응용수학": "MMAppMath",
  "소프트웨어공학": "SoftEng",
  "응용데이터베이스": "AppliedDB",
  "정보보안": "InfoSec",
  "컴퓨터그래픽스와메타버스": "CGandMetaverse",
  "기계학습심화": "MLAdv",
  "임베디드시스템및실험": "EmbeddedSys",
};

const profMap: { [key: string]: string } = {
  "배성일": "Pae",
  "송하윤": "Song",
  "이혜영1": "LeeH1",
  "Leonard Mcmillan": "McMillan",
  "이기철": "LeeK",
  "이준용": "LeeJY",
  "김상곤": "KimSG",
  "김한규": "KimHG",
  "김영호": "KimYH",
  "최윤화": "Choi",
  "이장호": "LeeJH",
  "박재영2": "ParkJY2",
  "하란": "Ha",
  "권건우": "Kwon",
  "박필원": "ParkPW",
  "표창우": "Pyo",
  "박준철": "ParkJC",
  "박준상1": "ParkJS1",
  "김태형3": "KimTH3",
  "김은삼": "KimES",
  "이윤규": "LeeYG",
  "박지헌": "ParkJH",
  "김선일": "KimSI",
  "윤영": "Yoon",
  "김경창": "KimGC",
  "김일도": "KimID",
};

const MajorSelectScreen: React.FC = () => {
  const navigation = useNavigation();

  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [professors, setProfessors] = useState<string[]>([]);

  const handleGradeToggle = (grade: number) => {
    if (selectedGrade === grade) {
      setSelectedGrade(null);
      setSubjects([]);
      setSelectedSubject(null);
      setProfessors([]);
    } else {
      setSelectedGrade(grade);
      setSelectedSubject(null);
      setProfessors([]);
      // 실제 데이터 로딩은 텍스트 클릭에서 처리
    }
  };

  const handleSubjectToggle = (subject: string) => {
    if (selectedSubject === subject) {
      setSelectedSubject(null);
      setProfessors([]);
    } else {
      setSelectedSubject(subject);
      setProfessors([]);
      // 실제 데이터 로딩은 텍스트 클릭에서 처리
    }
  };

  const handleGradeClick = (grade: number) => {
    navigation.navigate('MajorGrade', { grade });
  };

  const handleSubjectClick = (grade: number, subject: string) => {
    navigation.navigate('MajorSub', { grade, subject: subMap[subject] });
  };

  const handleProfessorClick = (professor: string) => {
    if (selectedGrade !== null && selectedSubject) {
      navigation.navigate('Major', {
        grade: selectedGrade,
        subject: subMap[selectedSubject],
        professor: profMap[professor],
      });
    }
  };

  return (
    <View>
      {[1, 2, 3, 4].map((grade) => (
        <View key={grade}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleGradeToggle(grade)}>
              <Image source={require('./assets/folder.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleGradeClick(grade)}>
              <Text>Grade {grade} 정보 보기</Text>
            </TouchableOpacity>
          </View>
          {selectedGrade === grade && subjects.map((subject) => (
            <View key={subject}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleSubjectToggle(subject)}>
                  <Image source={require('./assets/folder.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubjectClick(grade, subject)}>
                  <Text>{subject} 정보 보기</Text>
                </TouchableOpacity>
              </View>
              {selectedSubject === subject && professors.map((professor) => (
                <View key={professor} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <Image source={require('./assets/folder.png')} style={{ width: 24, height: 24 }} />
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
