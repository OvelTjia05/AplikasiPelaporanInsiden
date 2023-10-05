import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../../components/atoms/Button';
import {MyColor} from '../../components/atoms/MyColor';
import Header from '../../components/molecules/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveIdUserAction,
  saveNameAction,
  saveRoleAction,
  saveTokenAction,
  saveUsernameAction,
} from '../../../redux/action';
import axios from 'axios';

const Settings = ({navigation}: any) => {
  const dispatch = useDispatch();
  const token = useSelector((data: any) => data.token);

  const logout = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`, // Tambahkan token ke header dengan format Bearer
      };
      const response = await axios.delete(
        `https://backend-pelaporan-final.glitch.me/auth/user/logout`,
        {headers},
      );

      await AsyncStorage.setItem('id_user', '');
      await AsyncStorage.setItem('name', '');
      await AsyncStorage.setItem('token', '');
      await AsyncStorage.setItem('role', '');
      dispatch(saveIdUserAction(''));
      dispatch(saveNameAction(''));
      dispatch(saveTokenAction(''));
      dispatch(saveRoleAction(''));

      navigation.navigate('WelcomePage');
    } catch (error) {
      console.log('ini error login: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container1}>
        <Button
          label="Log out"
          width={150}
          onClick={logout}
          textColor={MyColor.Light}
          backgroundColor={MyColor.Primary}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
