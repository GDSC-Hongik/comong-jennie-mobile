import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';


const ResumeInput: React.FC = ( ) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>이력서 추가하기</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>이력서 이름</Text>
                <TextInput style={styles.input} placeholder="이력서의 이름을 입력해주세요" multiline />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>개발프로젝트 경험</Text>
                <TextInput style={styles.input} placeholder="개발프로젝트 경험에 대해 작성해주세요" multiline />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>공모전/대회 경험</Text>
                <TextInput style={styles.input} placeholder="공모전/대회 경험에 대해 작성해주세요" multiline />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>기타 외부 경험</Text>
                <TextInput style={styles.input} placeholder="기타 외부 경험에 대해 작성해주세요" multiline />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>GitHub 링크</Text>
                <TextInput style={styles.input} placeholder="깃허브 링크를 입력해주세요" />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>보유 기술 및 기술 스택</Text>
                <TextInput style={styles.input} placeholder="보유 기술에 대해 작성해주세요" multiline />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>어필</Text>
                <TextInput style={styles.input} placeholder="추가로 하고싶은 말이 있다면 작성해주세요" multiline />
            </View>

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>저장하기</Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    input: {
        fontSize: 14,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0080DC',
        borderRadius: 10,
        height: 45,
        marginBottom: 15,
        marginTop: 20,
      },
      buttonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
      }, 
});

export default ResumeInput;
