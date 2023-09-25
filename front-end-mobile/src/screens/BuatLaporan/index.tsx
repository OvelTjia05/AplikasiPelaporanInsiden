import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Header from '../../components/molecules/Header';

const Tab = createMaterialTopTabNavigator();

const BuatLaporan = ({navigation}: any) => {
  const [description, setDescription] = useState('');
  const [dangerLevel, setDangerLevel] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');

  const isStep1Valid = name && address && age;
  const isStep2Valid = description;
  const isStep3Valid = dangerLevel;

  const handleStep1Next = () => {
    if (isStep1Valid) {
      setCurrentStep(1);
    } else {
      Alert.alert('Error', 'Please fill in all fields for Step 1.');
    }
  };

  const handleStep2Next = () => {
    if (isStep2Valid) {
      setCurrentStep(2);
    } else {
      Alert.alert('Error', 'Please fill in all fields for Step 2.');
    }
  };

  const handleSubmit = () => {
    if (isStep3Valid) {
      // Handle submission logic here
      Alert.alert('Success', 'Report submitted successfully.');
    } else {
      Alert.alert('Error', 'Please fill in all fields for Step 3.');
    }
  };

  const Step1 = ({route}: any) => {
    const {
      name,
      address,
      age,
      setName,
      setAddress,
      setAge,
      handleNext,
      isValid,
      isActive,
    } = route.params;

    return (
      <View style={styles.container}>
        <Text>Input Biodata</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={text => setAddress(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={text => setAge(text)}
          style={styles.input}
        />
        <View style={isActive ? styles.activeTab : null}>
          <Button title="Next" onPress={handleNext} disabled={!isValid} />
        </View>
      </View>
    );
  };

  const Step2 = ({route}: any) => {
    const {description, setDescription, handleNext, isValid, isActive} =
      route.params;

    return (
      <View style={styles.container}>
        <Text>Input Deskripsi Laporan</Text>
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={text => setDescription(text)}
          style={styles.input}
          multiline
        />
        <View style={isActive ? styles.activeTab : null}>
          <Button title="Next" onPress={handleNext} disabled={!isValid} />
        </View>
      </View>
    );
  };

  const Step3 = ({route}: any) => {
    const {dangerLevel, setDangerLevel, handleSubmit, isValid, isActive} =
      route.params;

    return (
      <View style={styles.container}>
        <Text>Input Tingkat Bahaya</Text>
        <TextInput
          placeholder="Danger Level"
          value={dangerLevel}
          onChangeText={text => setDangerLevel(text)}
          style={styles.input}
        />
        <View style={isActive ? styles.activeTab : null}>
          <Button title="Submit" onPress={handleSubmit} disabled={!isValid} />
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Header />
      <Tab.Navigator>
        <Tab.Screen
          name="Step1"
          component={Step1}
          initialParams={{
            name,
            address,
            age,
            setName,
            setAddress,
            setAge,
            handleNext: handleStep1Next,
            isValid: isStep1Valid,
            isActive: currentStep === 0,
          }}
        />
        <Tab.Screen
          name="Step2"
          component={Step2}
          initialParams={{
            description,
            setDescription,
            handleNext: handleStep2Next,
            isValid: isStep2Valid,
            isActive: currentStep === 1,
          }}
        />
        <Tab.Screen
          name="Step3"
          component={Step3}
          initialParams={{
            dangerLevel,
            setDangerLevel,
            handleSubmit,
            isValid: isStep3Valid,
            isActive: currentStep === 2,
          }}
        />
      </Tab.Navigator>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
  },
  activeTab: {
    backgroundColor: 'green',
  },
});

export default BuatLaporan;
