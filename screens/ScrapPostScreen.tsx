//ScrapPostScreen.tsx 스크랩 한 게시글 보기//LikePostScreen.tsx 좋아요 한 게시글 보기

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, NotificationScreenNavigationProp } from '../types/navigation';
import NotificationBox3 from '../src/components/NotificationBox3';
import TitleComponent from '../src/components/TitleComponent';

interface Props {
  navigation: NotificationScreenNavigationProp; 
}

const ScrapPostScreen: React.FC<Props> = ({ navigation }) => {
  
    return (
      <View style={styles.container}>
        <TitleComponent title={'스크랩 한 게시글'} >
        </TitleComponent>
        <NotificationBox3 title={'컴퓨터네트워크(박준철)'} detail={'과제 2번 풀이 비교해 볼 사람...'}></NotificationBox3>
        <NotificationBox3 title={'알고리즘분석(하란)'} detail={'란골 과제 문제 번호'}></NotificationBox3>
        <NotificationBox3 title={'알고리즘분석(하란)'} detail={'24년 1학기 족보'}></NotificationBox3>
      </View>
    );
    
  };

  const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
  }
);

export default ScrapPostScreen;