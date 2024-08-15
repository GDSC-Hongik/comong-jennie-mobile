//현재 작성되어 있는 이력서 관리 화면. 간단히 보기 지원, 이력서 추가, 작성되어 있는 이력서 수정 창으로 이동하는 버튼 필요.

//ResumeScreen.tsx 이력서 보기 화면

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ResumeScreenNavigationProp } from '../types/navigation';
import ResumeBox from '../src/components/ResumeBox';

interface Props {
  navigation: ResumeScreenNavigationProp;
}

const ResumeScreen: React.FC<Props> = ({ navigation }) => {
  
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ResumeBox 
                resumeName={'프론트 이력서'}
                projectExperience={'3회'}
                competitionExperience={'0회'}
                externalExperience={'코드잇 강의 수강함'}
                githubLink={'https://github.com/yuuuhooo'}
                technicalSkills={'HTML, CSS, JS, React'}
                appeal={'열심히 할게요!'}
            ></ResumeBox>

            <ResumeBox 
                resumeName={'백 이력서'}
                projectExperience={'2회'}
                competitionExperience={'공모전 1회'}
                externalExperience={'@@프로그램 수료'}
                githubLink={'https://github.com/yuuuhooo'}
                technicalSkills={'JAVA'}
                appeal={'열심히 하겠습니다'}
            ></ResumeBox>
            
            <View style={styles.addBox}>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addText} onPress={() => navigation.navigate('ResumeEdit')}>이력서 추가하기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
    
  };

  const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 40,
    },
    editButton: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    editText: {
        fontSize: 16,
        color: '#0080DC',

    },
    box: {
        flexDirection: 'row',
    },
    addBox: {
        flexDirection: 'row',
        marginBottom: 80,
    },
    addButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderColor: '#000000',
        borderWidth: 1,
    },
    addText: {
        color: '#050360',
        fontWeight: 'bold',
    }
  }
);

  

export default ResumeScreen;