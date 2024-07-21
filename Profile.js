import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState({ nickname: false, department: false, grade: false });
  const [profileData, setProfileData] = useState({
    nickname: '학생 3',
    department: '컴퓨터공학과',
    grade: '3',
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleChange = (field, value) => {
    const newData = { ...profileData, [field]: value };
    setProfileData(newData);
    saveProfileData(newData);
  };

  const loadProfileData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('profileData');
      if (jsonValue != null) {
        setProfileData(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load profile data.', e);
    }
  };

  const saveProfileData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('profileData', jsonValue);
    } catch (e) {
      console.error('Failed to save profile data.', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image style={styles.logo} source={require('./assets/Logo.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>프로필</Text>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={require('./assets/Ellipse.png')} />
          <View style={styles.awardSection}>
            <Image style={styles.awardIcon} source={require('./assets/Award.png')} />
            <Text style={styles.awardText}>GOLD</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          {['nickname', 'department', 'grade'].map((field, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.label}>
                {field === 'nickname' ? '닉네임' : field === 'department' ? '학과' : '학년'}
              </Text>
              <View style={styles.inputBox}>
                {isEditing[field] ? (
                  <TextInput
                    style={styles.inputText}
                    value={profileData[field]}
                    onChangeText={(value) => handleChange(field, value)}
                    onBlur={() => handleEdit(field)}
                    autoFocus
                    maxLength={10}
                  />
                ) : (
                  <Text style={styles.inputText}>{profileData[field]}</Text>
                )}
                <TouchableOpacity onPress={() => handleEdit(field)}>
                  <Image style={styles.editIcon} source={require('./assets/Pencil.png')} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>좋아요 한 게시물</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>스크랩 한 게시물</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#050360',
    marginLeft: 10,
  },
  profileSection: {
    flexDirection: 'row',
    marginTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  awardSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  awardIcon: {
    width: 27,
    height: 27,
  },
  awardText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 5,
  },
  infoContainer: {
    marginLeft: 20,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
    width: 60,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    justifyContent: 'space-between',
    height: 30,
  },
  inputText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    flex: 1,
    height: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
    lineHeight: 20,
  },
  editIcon: {
    width: 16,
    height: 16,
    marginLeft: 10,
  },
  button: {
    width: '100%',
    height: 36,
    borderColor: '#050360',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#050360',
  },
});

export default Profile;
