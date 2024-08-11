//HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Icon } from '../src/index';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const goToClassScreen = () => {
    navigation.navigate('Class');
  };

  const goToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  const goToLogInScreen = () => {
    navigation.navigate('LogIn');
  };

  return (
    <View style={styles.container}>
      {/*<Icon style={styles.icon} />*/}
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Go to Class Screen" onPress={goToClassScreen} />
      <Button title="Go to Sign Up Screen" onPress={goToSignUpScreen} />
      <Button title="Go to Log In Screen" onPress={goToLogInScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,

    
  },
  icon: {
    width: 40,
  },
});

export default HomeScreen;