import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  IconCentang,
  IconSedangDitindak,
  IconTolak,
  IconWaktu,
} from '../../assets/icons';
import {MyColor} from '../../components/atoms/MyColor';
import Header from '../../components/molecules/Header';
import {MyFont} from '../../components/atoms/MyFont';
import Gap from '../../components/atoms/Gap';
import {Ilustrasi} from '../../assets/images';
import axios from 'axios';

const DetailLaporan = ({navigation, route}: any) => {
  const [laporanDetail, setLaporanDetail] = useState(null);
  const {id_laporan} = route.params;
  console.log('ini page detail laporan: ', id_laporan);

  useEffect(() => {
    getLaporan();
  }, []);

  const getLaporan = async () => {
    await axios
      .get(
        `https://backend-pelaporaninsiden.glitch.me/api/laporan/${id_laporan}`,
      )
      .then(response => {
        setLaporanDetail(response.data.data);
      })
      .catch(error => {
        console.log(error.message);
      });
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
  const getStatusHeader = (status: string) => {
    switch (status) {
      //   case 'Dalam Antrian':
      //     return null;
      //   case 'Sedang Ditindak':
      //     return null;
      case 'selesai':
        return 'Kronologi';
      case 'tolak':
        return 'Alasan Ditolak:';
      default:
        return null;
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

  // const laporan = [
  //   {
  //     status: 'Laporan Ditolak',
  //     desc: `Laporan yang Anda kirimkan telah kami tindak, dan kami dapati bahwa data laporan yang Anda tidak sesuai yang terjadi di lapangan, mohon untuk memberikan data yang terjadi sebenarnya. Terima kaih.`,
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     gambar: require('../../assets/images/ilustrasi.png'),
  //     kategoriBidang: 'Poli (Poli Mata)',
  //     isi: 'loremipsum',
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
      {/* {laporan.map((item, index) => (
        <View
          key={index}
          style={[
            styles.statusLaporan,
            {backgroundColor: getStatusColor(item.status)},
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.txtCardStatus}>{item.status}</Text>
            <View>{getStatusIcon(item.status)}</View>
          </View>
          <Text style={styles.txtCard}>{getStatusHeader(item.status)}</Text>
          <Text style={styles.txtCard}>{item.desc}</Text>
        </View>
      ))} */}
      {laporanDetail && (
        <View
          key={laporanDetail.id_laporan}
          style={[
            styles.statusLaporan,
            {backgroundColor: getStatusColor(laporanDetail.status_laporan)},
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.txtCardStatus}>
              {laporanDetail.status_laporan}
            </Text>
            <View>{getStatusIcon(laporanDetail.status_laporan)}</View>
          </View>
          <Text style={styles.txtCard}>
            {getStatusHeader(laporanDetail.status_laporan)}
          </Text>
          <Text style={styles.txtCard}>{laporanDetail.deskripsi}</Text>
        </View>
      )}
      <View style={styles.container1}>
        <Gap height={40} />
        <Text style={styles.txt}>
          Berikut adalah laporan yang Anda kirimkan
        </Text>
        <Gap height={20} />
        <Text style={styles.txtTime}>
          {laporanDetail &&
            convertToWITDate(new Date(laporanDetail.waktu_submit))}
          /
          {laporanDetail &&
            convertToWITHour(new Date(laporanDetail.waktu_submit))}
        </Text>
        <View
          style={{
            backgroundColor: MyColor.Light,
            padding: 10,
            alignItems: 'center',
            width: '90%',
            borderRadius: 20,
          }}>
          <Text>Foto Pendukung</Text>
          {/* <Image source={{uri: laporanDetail.url_gambar}} /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailLaporan;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  container1: {
    alignItems: 'center',
  },
  statusLaporan: {
    maxHeight: 'auto',
    padding: 20,
  },
  txt: {
    fontFamily: MyFont.Primary,
    fontSize: 14,
    color: 'black',
  },
  txtTime: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: 'black',
  },
  txtCardStatus: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: MyColor.Light,
  },
  txtCard: {
    fontFamily: MyFont.Primary,
    fontSize: 17,
    color: MyColor.Light,
  },
});
