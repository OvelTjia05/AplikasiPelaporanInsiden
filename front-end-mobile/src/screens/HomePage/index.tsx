import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Header from '../../components/molecules/Header';
import {MyFont} from '../../components/atoms/MyFont';
import {MyColor} from '../../components/atoms/MyColor';
import Gap from '../../components/atoms/Gap';
import {Ilustrasi, Ilustrasi1} from '../../assets/images';
import {
  IconBuatLaporan,
  IconBuatLaporanAnonim,
  IconCentang,
  IconLaporan,
  IconPanahKanan,
  IconSedangDitindak,
  IconTolak,
  IconWaktu,
} from '../../assets/icons';

const HomePage = ({navigation}: any) => {
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
        return '';
    }
  };

  const riwayat = [
    {
      jenis: 'Radiologi',
      waktu: '19:45',
      tanggal: '2023-02-07',
      status: 'Laporan Selesai',
    },
    {
      jenis: 'Radiologi',
      waktu: '19:46',
      tanggal: '2023-09-03',
      status: 'Laporan Ditolak',
    },
    {
      jenis: 'Radiologi',
      waktu: '19:46',
      tanggal: '2023-09-15',
      status: 'Sedang Ditindak',
    },
    {
      jenis: 'Radiologi',
      waktu: '19:46',
      tanggal: '2023-09-14',
      status: 'Dalam Antrian',
    },
  ];

  const dummyCardData = {
    gambar: require('../../assets/images/ilustrasi1.png'),
    judul: '4 Strategi Pemerintah kendalikan TB di Indonesia',
    tanggal: '5 September 2021',
    sumber: 'sehatnegeriku.kemkes.go.id',
  };

  const sortByDateTime = (data: any[]) => {
    return data.slice().sort((a, b) => {
      const dateA = new Date(`${a.tanggal}T${a.waktu}`);
      const dateB = new Date(`${b.tanggal}T${b.waktu}`);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const sortedRiwayat = sortByDateTime(riwayat);

  const renderRiwayatLaporan = (riwayatData: any[]) => {
    return (
      <View style={styles.card}>
        <Text style={styles.txtCardTitle}>Riwayat Laporan</Text>
        {riwayatData.length === 0 ? (
          <Text
            style={{
              color: '#787878',
              fontFamily: 'Poppins-Bold',
              fontSize: 17,
              paddingHorizontal: 20,
            }}>
            Anda belum membuat{'\n'}laporan apapun.
          </Text>
        ) : (
          <>
            {riwayatData.slice(1, 3).map((item, index) => (
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
          </>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Gap height={20} />
      <View style={styles.container1}>
        <Text style={styles.txtWelcome}>
          Selamat Pagi,{'\n'}
          <Text style={styles.txtName}>Roger</Text>
        </Text>
        {riwayat.length === 0 ? (
          <View style={styles.cardLaporanTerakhir}>
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
            <Text style={styles.txtCardTitle}>
              Berikut laporan Anda yang terakhir
            </Text>
            <View
              style={[
                styles.cardContent,
                {
                  backgroundColor: getStatusColor(sortedRiwayat[0].status),
                },
              ]}>
              <Image source={Ilustrasi} />
              <View>
                <Text style={styles.txtCard}>{sortedRiwayat[0].jenis}</Text>
                <Text style={styles.txtCardTime}>{sortedRiwayat[0].waktu}</Text>
                <Text style={styles.txtCard}>{sortedRiwayat[0].tanggal}</Text>
                <Text style={styles.txtCardStatus}>
                  {sortedRiwayat[0].status}
                </Text>
              </View>
              {getStatusIcon(sortedRiwayat[0].status)}
            </View>
          </View>
        )}
        <Gap height={20} />
        {renderRiwayatLaporan(sortedRiwayat)}
        <Gap height={20} />
        <View style={styles.card}>
          <Text style={styles.txtCardTitle}>Berita Kesehatan</Text>
          <View
            style={{
              backgroundColor: MyColor.Light,
              flexDirection: 'row',
              columnGap: 10,
              height: 'auto',
            }}>
            <Image
              source={dummyCardData.gambar}
              resizeMode="contain"
              style={{width: 100}}
            />
            <View style={{flex: 1, maxHeight: 68}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 12,
                  color: '#212121',
                }}>
                {dummyCardData.judul}
              </Text>
              <Text
                style={{
                  fontFamily: MyFont.Primary,
                  fontSize: 10,
                  color: '#212121',
                }}>
                {dummyCardData.tanggal}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Italic',
                  fontSize: 10,
                  color: '#212121',
                }}>
                {dummyCardData.sumber}
              </Text>
            </View>
          </View>
          <Pressable style={styles.cardFooter}>
            <Text
              style={{
                fontFamily: MyFont.Primary,
                fontSize: 12,
                color: MyColor.Light,
              }}>
              Lihat informasi & berita kesehatan lainnya
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
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  cardLaporanTerakhir: {
    flexWrap: 'wrap',
    minHeight: 119,
    backgroundColor: MyColor.Primary,
  },
  txtLaporanTerakhir: {
    padding: 20,
    fontFamily: MyFont.Primary,
    fontSize: 11,
    color: '#fff',
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
  card: {
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
    paddingVertical: 10,
    paddingHorizontal: 20,
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
