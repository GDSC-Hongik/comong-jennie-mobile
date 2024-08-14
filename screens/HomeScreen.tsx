//아이콘 추가 안 됨 이슈 해결해야 됨

//HomeScreen.tsx 메인 화면
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { ImageComponent } from 'react-native';
import { inlineStyles } from 'react-native-svg';


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const goToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  const goToLogInScreen = () => {
    navigation.navigate('LogIn');
  };


  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.text}>Home Screen</Text>
        <Button title="Go to Sign Up Screen" onPress={goToSignUpScreen} />
        <Button title="Go to Log In Screen" onPress={goToLogInScreen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    //alignItems: 'center',
  },
  topbar: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
  },
  icon: {
    width: 40,
  },
  comong : {
    width: 40,
  }
});

export default HomeScreen;