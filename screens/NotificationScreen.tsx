// NotificationScreen.tsx 알림 화면

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, NotificationScreenNavigationProp } from '../types/navigation';
import NotificationBox from '../src/components/NotificationBox';

interface Props {
  navigation: NotificationScreenNavigationProp;
}

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  
    return (
      <View style={styles.container}>
        <NotificationBox title={'컴퓨터네트워크(박준철) 새 글 알림'} detail={'과제 2번 풀이 비교해 볼 사람...'}></NotificationBox>
        <NotificationBox title={'알고리즘분석(하란) 새 글 알림'} detail={'이거 설마 진짜 손으로 다 써야 됨?'}></NotificationBox>
      </View>
    );
    
  };

  const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
  }
);

export default NotificationScreen;