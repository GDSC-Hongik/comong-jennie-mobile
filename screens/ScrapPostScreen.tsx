//ScrapPostScreen.tsx 스크랩 한 게시글 보기//LikePostScreen.tsx 좋아요 한 게시글 보기

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, NotificationScreenNavigationProp } from '../types/navigation';
import NotificationBox2 from '../src/components/NotificationBox2';

interface Props {
  navigation: NotificationScreenNavigationProp; 
}

const ScrapPostScreen: React.FC<Props> = ({ navigation }) => {
  
    return (
      <View style={styles.container}>
        <NotificationBox2 title={'컴퓨터네트워크(박준철) 새 글 알림'} detail={'과제 2번 풀이 비교해 볼 사람...'}></NotificationBox2>
        <NotificationBox2 title={'알고리즘분석(하란) 새 글 알림'} detail={'이거 설마 진짜 손으로 다 써야 됨?'}></NotificationBox2>
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