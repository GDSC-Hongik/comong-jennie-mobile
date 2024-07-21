import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignUpScreen = () => {
  const [isEditing, setIsEditing] = useState({
    email: false,
    code: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
    department: false,
    year: false,
  });

  const [formData, setFormData] = useState({
    email: 'wbc2104@g.hongik.ac.kr',
    code: '634152',
    password: '********',
    passwordConfirm: '********',
    nickname: '제니',
    department: '컴퓨터공학과',
    year: '2',
  });

  // 각 TextInput에 대한 ref 생성
  const emailInputRef = useRef(null);
  const codeInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passwordConfirmInputRef = useRef(null);
  const nicknameInputRef = useRef(null);
  const departmentInputRef = useRef(null);
  const yearInputRef = useRef(null);

  const handleEdit = (field, ref) => {
    setIsEditing({ ...isEditing, [field]: true });
    setTimeout(() => {
      ref.current.focus();
    }, 100);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleBlur = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
  };

  const renderTextInput = (field, ref, isPassword = false) => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          style={[styles.input, styles.centerText]}
          value={formData[field]}
          onChangeText={(value) => handleChange(field, value)}
          onBlur={() => handleBlur(field)}
          secureTextEntry={isPassword}
          editable={isEditing[field]}
        />
        <TouchableOpacity onPress={() => handleEdit(field, ref)}>
          <Image style={styles.editIcon} source={require('./assets/Edit_icon.png')} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./assets/Logo.png')} />
      <Text style={styles.header}>회원가입</Text>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, styles.spacing]}>학교 메일</Text>
        {renderTextInput('email', emailInputRef)}
        <TouchableOpacity style={styles.buttonSmall}>
          <Text style={[styles.buttonText, styles.centerText]}>인증 번호 발송</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, styles.spacing]}>인증 번호</Text>
        {renderTextInput('code', codeInputRef)}
        <TouchableOpacity style={styles.buttonSmall}>
          <Text style={[styles.buttonText, styles.centerText]}>확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, styles.spacing]}>비밀번호</Text>
        {renderTextInput('password', passwordInputRef, true)}
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, styles.spacing]}>비밀번호 재입력</Text>
        {renderTextInput('passwordConfirm', passwordConfirmInputRef, true)}
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, styles.spacing]}>닉네임</Text>
        {renderTextInput('nickname', nicknameInputRef)}
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, styles.spacing]}>학과</Text>
        {renderTextInput('department', departmentInputRef)}
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, styles.spacing]}>학년</Text>
        {renderTextInput('year', yearInputRef)}
      </View>

      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>회원가입 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    position: 'absolute',
    left: 12,
    top: 40,
    width: 40,
    height: 40,
  },
  header: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '700',
    fontSize: 20,
    color: '#050360',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    height: 50, // 고정 높이
  },
  label: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '700',
    fontSize: 15,
    color: '#000000',
    width: 59,
    textAlignVertical: 'center',
  },
  spacing: {
    marginRight: 12, // 고정 간격
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    height: 40,
    width: 181, // 고정 너비
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Noto Sans KR',
    fontWeight: '700',
    fontSize: 10,
    color: '#000000',
    textAlign: 'center', // 가운데 정렬
  },
  centerText: {
    textAlign: 'center', // 가운데 정렬
  },
  editIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  buttonSmall: {
    width: 51, // 고정 너비
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#050360',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 'auto', // 오른쪽 정렬
  },
  buttonText: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '700',
    fontSize: 9,
    color: '#050360',
    textAlign: 'center', // 가운데 정렬
  },
  submitButtonContainer: {
    alignItems: 'flex-end', // 오른쪽 정렬
    marginTop: 20,
  },
  submitButton: {
    width: 94, // 고정 너비
    height: 59, // 고정 높이
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#050360',
    borderWidth: 1,
    borderRadius: 10,
  },
  submitButtonText: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '700',
    fontSize: 9,
    color: '#050360',
  },
});

export default SignUpScreen;
