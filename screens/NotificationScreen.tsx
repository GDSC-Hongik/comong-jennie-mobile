// NotificationScreen.tsx 알림 화면

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, NotificationScreenNavigationProp } from '../types/navigation';

interface Props {
  navigation: NotificationScreenNavigationProp;
}

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  
    return (
      <View>
      </View>
    );
    
  };

export default NotificationScreen;