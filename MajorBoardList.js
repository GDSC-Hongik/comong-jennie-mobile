import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MajorBoardList = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState({
    firstYear: false,
    secondYear: false,
    thirdYear: false,
    fourthYear: false,
  });

  const [subjectsExpanded, setSubjectsExpanded] = useState({
    firstYear: {},
    secondYear: {},
    thirdYear: {},
    fourthYear: {},
  });

  const toggleExpand = (year) => {
    setExpanded((prevState) => ({
      ...prevState,
      [year]: !prevState[year],
    }));
  };

  const toggleSubjectExpand = (year, subject) => {
    setSubjectsExpanded((prevState) => ({
      ...prevState,
      [year]: {
        ...prevState[year],
        [subject]: !prevState[year][subject],
      },
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('./assets/Logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.title}>전공과목 게시판</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => toggleExpand('firstYear')} style={styles.yearContainer}>
            <View style={styles.folderContainer}>
              <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
              <Text style={styles.yearText}>1학년</Text>
            </View>
          </TouchableOpacity>
          {expanded.firstYear && (
            <View style={styles.subjectContainer}>
              <TouchableOpacity onPress={() => toggleSubjectExpand('firstYear', 'computerScience')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>컴퓨터공학개론</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.firstYear.computerScience && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>김선일 교수님</Text>
                  </View>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>장문정 교수님</Text>
                  </View>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>조수현 교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('firstYear', 'cProgramming')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>C프로그래밍</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.firstYear.cProgramming && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity onPress={() => toggleExpand('secondYear')} style={styles.yearContainer}>
            <View style={styles.folderContainer}>
              <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
              <Text style={styles.yearText}>2학년</Text>
            </View>
          </TouchableOpacity>
          {expanded.secondYear && (
            <View style={styles.subjectContainer}>
              <TouchableOpacity onPress={() => toggleSubjectExpand('secondYear', 'oop')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>객체지향프로그래밍</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.secondYear.oop && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>김상곤 교수님</Text>
                  </View>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>이준용 교수님</Text>
                  </View>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>Mac Millan 교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('secondYear', 'digitalCircuit')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>논리회로설계및실험</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.secondYear.digitalCircuit && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('secondYear', 'internetProgramming')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>인터넷프로그래밍</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.secondYear.internetProgramming && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('secondYear', 'dataCommunication')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>데이터통신</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.secondYear.dataCommunication && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('secondYear', 'assemblyLanguage')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>어셈블리언어및실습</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.secondYear.assemblyLanguage && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('secondYear', 'dataStructures')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>자료구조프로그래밍</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.secondYear.dataStructures && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity onPress={() => toggleExpand('thirdYear')} style={styles.yearContainer}>
            <View style={styles.folderContainer}>
              <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
              <Text style={styles.yearText}>3학년</Text>
            </View>
          </TouchableOpacity>
          {expanded.thirdYear && (
            <View style={styles.subjectContainer}>
              <TouchableOpacity onPress={() => toggleSubjectExpand('thirdYear', 'computerArchitecture')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>컴퓨터구조</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.thirdYear.computerArchitecture && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('thirdYear', 'programmingLanguages')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>프로그래밍언어론</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.thirdYear.programmingLanguages && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('thirdYear', 'computerNetworks')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>컴퓨터네트워크</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.thirdYear.computerNetworks && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('thirdYear', 'operatingSystems')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>운영체제</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.thirdYear.operatingSystems && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('thirdYear', 'automata')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>오토마타</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.thirdYear.automata && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('thirdYear', 'problemSolving')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>문제해결기법</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.thirdYear.problemSolving && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity onPress={() => toggleExpand('fourthYear')} style={styles.yearContainer}>
            <View style={styles.folderContainer}>
              <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
              <Text style={styles.yearText}>4학년</Text>
            </View>
          </TouchableOpacity>
          {expanded.fourthYear && (
            <View style={styles.subjectContainer}>
              <TouchableOpacity onPress={() => toggleSubjectExpand('fourthYear', 'softwareEngineering')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>소프트웨어공학</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.fourthYear.softwareEngineering && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('fourthYear', 'blockchain')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>블록체인</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.fourthYear.blockchain && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('fourthYear', 'informationSecurity')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>정보보안</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.fourthYear.informationSecurity && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => toggleSubjectExpand('fourthYear', 'machineLearning')}>
                <View style={styles.folderContainer}>
                  <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                  <Text style={styles.subjectText}>기계학습심화</Text>
                </View>
              </TouchableOpacity>
              {subjectsExpanded.fourthYear.machineLearning && (
                <View style={styles.professorContainer}>
                  <View style={styles.folderContainer}>
                    <Image source={require('./assets/Folder.png')} style={styles.folderIcon} />
                    <Text style={styles.professorText}>교수님</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    marginTop: 70, // header 높이만큼 스크롤뷰에 여백 추가
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    width: '100%',
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#050360',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    paddingTop: 10, // header와 내용 간의 여백 추가
  },
  yearContainer: {
    marginVertical: 0,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingLeft: 22,
    marginBottom: 0,
  },
  yearText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#050360',
  },
  subjectContainer: {
    paddingLeft: 42,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    marginBottom: 0,
  },
  subjectText: {
    fontSize: 16,
    color: '#050360',
    marginVertical: 5,
  },
  professorContainer: {
    paddingLeft: 42,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    marginBottom: 0,
  },
  professorText: {
    fontSize: 14,
    color: '#050360',
  },
  folderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  folderIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

export default MajorBoardList;
