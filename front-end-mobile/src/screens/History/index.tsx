import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import axios from 'axios';

const History = ({navigation, route}: any) => {
  const [laporan, setLaporan] = useState([]);
  const dataUser = route.params;

  useEffect(() => {
    getAllLaporan();
  }, []);

  const getAllLaporan = async () => {
    if (dataUser.id_user) {
      await axios
        .get(
          `https://backend-pelaporaninsiden.glitch.me/api/laporan/user/${dataUser.id_user}`,
        )
        .then(response => {
          console.log('ini response data data: ', response.data.data);
          setLaporan(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'antrian':
        return MyColor.Primary;
      case 'tindak':
        return '#A37F00';
      case 'selesai':
        return '#008656';
      case 'tolak':
        return '#8D0000';
      default:
        return 'white';
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'antrian':
        return <IconWaktu />;
      case 'tindak':
        return <IconSedangDitindak />;
      case 'selesai':
        return <IconCentang />;
      case 'tolak':
        return <IconTolak />;
      default:
        return null;
    }
  };

  // const riwayat = [
  //   {
  //     jenis: 'Radiologi',
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     status: 'Laporan Selesai',
  //   },
  //   {
  //     jenis: 'Radiologi',
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     status: 'Sedang Ditindak',
  //   },
  //   {
  //     jenis: 'Radiologi',
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     status: 'Dalam Antrian',
  //   },
  //   {
  //     jenis: 'Radiologi',
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     status: 'Laporan Ditolak',
  //   },
  //   {
  //     jenis: 'Radiologi',
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     status: 'Laporan Ditolak',
  //   },
  // ];

  function convertToWITHour(utcDate: any) {
    const offset = 7; // Offset waktu WIT dari UTC adalah +7 jam
    const localTime = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);

    const hours = localTime.getUTCHours().toString().padStart(2, '0');
    const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  function convertToWITDate(utcDate: any) {
    const offset = 7; // Offset waktu WIT dari UTC adalah +7 jam
    const localTime = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);

    const year = localTime.getUTCFullYear().toString();
    const month = (localTime.getUTCMonth() + 1).toString().padStart(2, '0'); // Bulan dimulai dari 0, tambahkan 1
    const day = localTime.getUTCDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

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
        {laporan.length === 0 ? (
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
            {laporan.map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.cardContent,
                  {
                    backgroundColor: getStatusColor(item.status_laporan),
                  },
                ]}
                key={index}
                onPress={() =>
                  navigation.navigate('DetailLaporan', {
                    id_laporan: item.id_laporan,
                  })
                }>
                <View style={{flexDirection: 'row', columnGap: 20}}>
                  <Image
                    source={{uri: item.url_gambar}}
                    width={50}
                    height={50}
                  />
                  <View>
                    <Text style={styles.txtCard}>{item.kategori_bidang}</Text>
                    <Text style={styles.txtCardTime}>
                      {convertToWITHour(new Date(item.waktu_submit))}
                    </Text>
                    <Text style={styles.txtCardTime}>
                      {convertToWITDate(new Date(item.waktu_submit))}
                    </Text>
                    <Text style={styles.txtCardStatus}>
                      {item.status_laporan}
                    </Text>
                  </View>
                </View>
                {getStatusIcon(item.status_laporan)}
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
