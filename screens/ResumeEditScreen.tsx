//지금 작성되어 있는 이력서 수정할 수 있게 수정 페이지 지원.

//ResumeEditScreen.tsx 이력서 수정 화면

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ResumeInput from '../src/components/ResumeInput';
import { ResumeEditScreenNavigationProp } from '../types/navigation';


interface Props {
    navigation: ResumeEditScreenNavigationProp;
  }

const ResumeEditScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ResumeInput />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default ResumeEditScreen;
