import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import Header from '../../components/molecules/Header';
import {MyFont} from '../../components/atoms/MyFont';
import {MyColor} from '../../components/atoms/MyColor';
import Gap from '../../components/atoms/Gap';
import {Ilustrasi} from '../../assets/images';
import {
  IconCentang,
  IconPanahKanan,
  IconSedangDitindak,
  IconTolak,
  IconWaktu,
} from '../../assets/icons';

const HomePage = () => {
  // Fungsi untuk mendapatkan warna berdasarkan status
  const getStatusColor = (status: any) => {
    switch (status) {
      case 'Dalam Antrian':
        return MyColor.Primary;
      case 'Sedang Ditindak':
        return '#A37F00';
      case 'Laporan Selesai':
        return '#008656';
      case 'Laporan Ditolak':
        return '#8D0000';
      default:
        return 'white'; // Atur warna default sesuai kebutuhan
    }
  };

  // Fungsi untuk mendapatkan ikon berdasarkan status
  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'Dalam Antrian':
        return <IconWaktu />;
      case 'Sedang Ditindak':
        return <IconSedangDitindak />;
      case 'Laporan Selesai':
        return <IconCentang />;
      case 'Laporan Ditolak':
        return <IconTolak />;
      default:
        return null;
    }
  };

  //data dummy untuk riwayat
  const riwayat = [
    {
      jenis: 'UTD',
      waktu: '19:45',
      tanggal: '6 September 2023',
      status: 'Laporan Ditolak',
    },
    {
      jenis: 'Radiologi',
      waktu: '19:45',
      tanggal: '6 September 2023',
      status: 'Laporan Selesai',
    },
    {
      jenis: 'Radiologi',
      waktu: '19:45',
      tanggal: '6 September 2023',
      status: 'Dalam Antrian',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Gap height={20} />
      <View style={styles.container1}>
        <Text style={styles.txtWelcome}>
          Selamat Pagi,{'\n'}
          <Text style={styles.txtName}>Roger</Text>
        </Text>
        <View style={styles.cardLaporanTerakhir}>
          <Text>Anda belum membuat laporan apapun</Text>
        </View>
        <Gap height={20} />
        <View style={styles.cardRiwayatLaporan}>
          <Text style={styles.txtCardTitle}>Riwayat Laporan</Text>
          {riwayat.length === 0 ? (
            <Text style={{color: 'black'}}>
              Anda belum membuat laporan apapun
            </Text>
          ) : (
            <>
              {riwayat.map((item, index) => (
                <View
                  style={[
                    styles.cardContent,
                    {
                      backgroundColor: getStatusColor(item.status),
                    },
                  ]}
                  key={index}>
                  <Image source={Ilustrasi} />
                  <View>
                    <Text style={styles.txtCard}>{item.jenis}</Text>
                    <Text style={styles.txtCardTime}>{item.waktu}</Text>
                    <Text style={styles.txtCard}>{item.tanggal}</Text>
                    <Text style={styles.txtCardStatus}>{item.status}</Text>
                  </View>
                  {getStatusIcon(item.status)}
                </View>
              ))}
            </>
          )}
          <Pressable style={styles.cardFooter}>
            <Text
              style={{
                fontFamily: MyFont.Primary,
                fontSize: 14,
                color: MyColor.Light,
              }}>
              Lihat lebih lengkap di menu riwayat
            </Text>
            <IconPanahKanan />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  container1: {
    flex: 1,
    padding: 20,
  },
  cardLaporanTerakhir: {
    flexWrap: 'wrap',
    height: 'auto',
    minHeight: 119,
    borderRadius: 20,
    backgroundColor: MyColor.Primary,
  },
  cardRiwayatLaporan: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    flexWrap: 'wrap',
    minHeight: 114,
    maxHeight: 'auto',
    borderRadius: 20,
  },
  txtWelcome: {
    color: 'black',
    fontFamily: MyFont.Primary,
    fontSize: 16,
  },
  txtName: {
    color: MyColor.Primary,
    fontFamily: 'Poppins-Bold',
    fontSize: 21,
  },
  txtCardTitle: {
    fontFamily: MyFont.Primary,
    fontSize: 17,
    color: '#000000',
    padding: 10,
  },
  txtCard: {
    fontSize: 11,
    color: 'white',
    fontFamily: MyFont.Primary,
  },
  txtCardTime: {
    fontSize: 14,
    color: 'white',
    fontFamily: MyFont.Primary,
  },
  txtCardStatus: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120,
    backgroundColor: MyColor.Primary,
    width: '100%',
  },
  cardFooter: {
    backgroundColor: MyColor.Primary,
    padding: 10,
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
