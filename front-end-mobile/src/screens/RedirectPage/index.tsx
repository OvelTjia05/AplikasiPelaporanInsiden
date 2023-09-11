import {StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react';
import React from 'react';

const RedirectPage = ({navigation}: any) => {
  useEffect(() => {
    const navigateToDashboard = setTimeout(() => {
      navigation.replace('BuatLaporanFoto');
    }, 0);

    return () => clearTimeout(navigateToDashboard);
  }, [navigation]);
  return <View></View>;
};

export default RedirectPage;

const styles = StyleSheet.create({});
