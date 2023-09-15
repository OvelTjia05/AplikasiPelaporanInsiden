import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';

import KategoriBidang from './src/screens/KategoriBidang';
import Login from './src/screens/Login';
import BuatLaporanFoto from './src/screens/BuatLaporanFoto';
import BuatLaporanTeks from './src/screens/BuatLaporanTeks';
import WelcomePage from './src/screens/WelcomePage';
import SignUp from './src/screens/SignUp';
import ForgetPass from './src/screens/ForgetPass';
import CreatePass from './src/screens/CreatePass';
import Navigation from './src/Navigation';
import DetailLaporan from './src/screens/DetailLaporan';
import SubmitLaporan from './src/screens/SubmitLaporan';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="KategoriBidang"
          component={KategoriBidang}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Navigation"
          component={Navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPass"
          component={ForgetPass}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePass"
          component={CreatePass}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BuatLaporanTeks"
          component={BuatLaporanTeks}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BuatLaporanFoto"
          component={BuatLaporanFoto}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailLaporan"
          component={DetailLaporan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubmitLaporan"
          component={SubmitLaporan}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
