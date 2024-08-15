//LikePostScreen.tsx 좋아요 한 게시글 보기

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, NotificationScreenNavigationProp } from '../types/navigation';
import NotificationBox3 from '../src/components/NotificationBox3';
import TitleComponent from '../src/components/TitleComponent';

interface Props {
  navigation: NotificationScreenNavigationProp; 
}

const LikePostScreen: React.FC<Props> = ({ navigation }) => {
  
    return (
        
      <View style={styles.container}>
        <TitleComponent title={'좋아요 한 게시글'} >
        </TitleComponent>
        <NotificationBox3 title={'컴퓨터네트워크(박준철)'} detail={'과제 2번 풀이 비교해 볼 사람...'}></NotificationBox3>
        <NotificationBox3 title={'알고리즘분석(하란)'} detail={'24년 1학기 족보'}></NotificationBox3>
        <NotificationBox3 title={'프로그래밍언어론(박필원)'} detail={'솔직히 수업 듣고 남은 거 서버 구축 비용밖에 없음'}></NotificationBox3>
        
      </View>
    );
    
  };

  const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
  }
);

export default LikePostScreen;