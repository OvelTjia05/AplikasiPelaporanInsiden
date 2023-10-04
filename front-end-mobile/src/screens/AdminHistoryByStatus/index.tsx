import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AdminHistoryByStatus = ({navigation, route}: any) => {
  const dataUser = route.params;
  const [laporanList, setLaporanList] = useState<any | null>(null);

  useEffect(() => {
    // getLaporan();
    console.log('Ini di history by status: ', dataUser);
  }, []);

  // const getLaporan = async () => {
  //   try {
  //     const headers = {
  //       Authorization: `Bearer ${dataUser.token}`,
  //     };
  //     const response = await axios.get(
  //       `https://backend-pelaporan-final.glitch.me/api/laporan?status=${status}`,
  //       {headers},
  //     );
  //     setLaporanList(response.data.data);
  //     console.log('ini response.data.data', response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View>
      <Text>AdminHistoryByStatus</Text>
    </View>
  );
};

export default AdminHistoryByStatus;

const styles = StyleSheet.create({});
