import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ResumeEdit from '../components/ResumeInput'; // ResumeEdit 컴포넌트 임포트

interface ResumeBoxProps {
    resumeName: string;
    projectExperience: string;
    competitionExperience: string;
    externalExperience: string;
    githubLink: string;
    technicalSkills: string;
    appeal: string;
}

const handleButtonPress = () => {
    {
        return <ResumeEdit />; // ResumeEdit 화면 렌더링
      }
  };


const ResumeBox: React.FC<ResumeBoxProps> = ({
    resumeName,
    projectExperience,
    competitionExperience,
    externalExperience,
    githubLink,
    technicalSkills,
    appeal,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{resumeName}</Text>
            
            <View style={styles.item}>
                <Text style={styles.label}>개발프로젝트 경험:</Text>
                <Text style={styles.content}>{projectExperience}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>공모전/대회 경험:</Text>
                <Text style={styles.content}>{competitionExperience}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>기타 외부 경험:</Text>
                <Text style={styles.content}>{externalExperience}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>GitHub 링크:</Text>
                <Text style={styles.content}>{githubLink}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>보유 기술 및 기술 스택:</Text>
                <Text style={styles.content}>{technicalSkills}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>어필</Text>
                <Text style={styles.content}>{appeal}</Text>
            </View>

            <View style={styles.box}>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editText} onPress={handleButtonPress}>이력서 수정하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        margin: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#050360',
    },
    item: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#050360',
    },
    content: {
        fontSize: 14,
        color: '#555',
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
    }
});

export default ResumeBox;