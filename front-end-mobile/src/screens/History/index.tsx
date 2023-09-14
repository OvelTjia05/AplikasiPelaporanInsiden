import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../../components/molecules/Header';
import {MyColor} from '../../components/atoms/MyColor';
import {
  IconCentang,
  IconLaporan,
  IconSedangDitindak,
  IconTolak,
  IconWaktu,
} from '../../assets/icons';
import {Ilustrasi} from '../../assets/images';
import {MyFont} from '../../components/atoms/MyFont';
import Gap from '../../components/atoms/Gap';

const History = ({navigation}: any) => {
  const getStatusColor = (status: string) => {
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
        return 'white';
    }
  };

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

  const riwayat = [
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
      status: 'Sedang Ditindak',
    },
    {
      jenis: 'Radiologi',
      waktu: '19:45',
      tanggal: '6 September 2023',
      status: 'Dalam Antrian',
    },
    {
      jenis: 'Radiologi',
      waktu: '19:45',
      tanggal: '6 September 2023',
      status: 'Laporan Ditolak',
    },
    {
      jenis: 'Radiologi',
      waktu: '19:45',
      tanggal: '6 September 2023',
      status: 'Laporan Ditolak',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Gap height={20} />
      <View style={styles.container1}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 17,
            color: MyColor.Primary,
          }}>
          Riwayat Laporan
        </Text>
        <Gap height={10} />
        {riwayat.length === 0 ? (
          <View style={styles.cardTidakAdaLaporan}>
            <Text style={styles.txtLaporanTerakhir}>
              Anda belum membuat laporan apapun
            </Text>
            <TouchableOpacity
              style={styles.createReportButton}
              onPress={() => navigation.navigate('BuatLaporanFoto')}>
              <Text style={styles.createReportButtonText}>
                Tekan disini untuk {'\n'}membuat laporan baru!
              </Text>
              <Image source={IconLaporan} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.txt}>Berikut adalah riwayat laporan anda</Text>
            <Gap height={10} />
            {riwayat.map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.cardContent,
                  {
                    backgroundColor: getStatusColor(item.status),
                  },
                ]}
                key={index}
                onPress={() => navigation.navigate('DetailLaporan')}>
                <View style={{flexDirection: 'row', columnGap: 20}}>
                  <Image source={Ilustrasi} />
                  <View>
                    <Text style={styles.txtCard}>{item.jenis}</Text>
                    <Text style={styles.txtCardTime}>{item.waktu}</Text>
                    <Text style={styles.txtCard}>{item.tanggal}</Text>
                    <Text style={styles.txtCardStatus}>{item.status}</Text>
                  </View>
                </View>
                {getStatusIcon(item.status)}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  container1: {
    alignSelf: 'center',
    paddingBottom: 80,
  },
  card: {},
  cardTidakAdaLaporan: {
    flexWrap: 'wrap',
    minHeight: 119,
    borderRadius: 20,
    backgroundColor: MyColor.Primary,
    // marginBottom: 20,
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 20,
    height: 120,
    marginBottom: 20,
    borderRadius: 20,
  },
  createReportButton: {
    flexDirection: 'row',
    columnGap: 60,
    paddingHorizontal: 20,
  },
  createReportButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
  },
  txt: {
    fontFamily: MyFont.Primary,
    fontSize: 14,
    color: 'black',
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
  txtLaporanTerakhir: {
    padding: 20,
    fontFamily: MyFont.Primary,
    fontSize: 11,
    color: '#fff',
  },
});
