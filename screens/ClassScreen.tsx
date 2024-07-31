// ClassScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ClassScreen = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>('1');

  const handleGradeChange = (itemValue: string) => {
    setSelectedGrade(itemValue);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://comong-jennie-server.onrender.com/main/major/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grade: selectedGrade }),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', `Server responded with: ${JSON.stringify(result)}`);
      } else {
        Alert.alert('Error', 'Server returned an error');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', `Request failed: ${error.message}`);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Grade</Text>
      <Picker
        selectedValue={selectedGrade}
        style={styles.picker}
        onValueChange={handleGradeChange}
      >
        <Picker.Item label="Grade 1" value="1" />
        <Picker.Item label="Grade 2" value="2" />
        <Picker.Item label="Grade 3" value="3" />
        <Picker.Item label="Grade 4" value="4" />
      </Picker>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
});

export default ClassScreen;
