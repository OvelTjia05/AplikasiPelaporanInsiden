import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
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

const DetailLaporan = () => {
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
  const getStatusHeader = (status: string) => {
    switch (status) {
      //   case 'Dalam Antrian':
      //     return null;
      //   case 'Sedang Ditindak':
      //     return null;
      case 'Laporan Selesai':
        return 'Kronologi';
      case 'Laporan Ditolak':
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

  const laporan = [
    {
      status: 'Laporan Ditolak',
      desc: `Laporan yang Anda kirimkan telah kami tindak, dan kami dapati bahwa data laporan yang Anda tidak sesuai yang terjadi di lapangan, mohon untuk memberikan data yang terjadi sebenarnya. Terima kaih.`,
      waktu: '19:45',
      tanggal: '6 September 2023',
      gambar: require('../../assets/images/ilustrasi.png'),
      kategoriBidang: 'Poli (Poli Mata)',
      isi: 'loremipsum',
    },
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      {laporan.map((item, index) => (
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
      ))}
      <View style={styles.container1}>
        <Gap height={40} />
        <Text style={styles.txt}>
          Berikut adalah laporan yang Anda kirimkan
        </Text>
        <Gap height={20} />
        <Text style={styles.txtTime}>
          {laporan[0].tanggal}/{laporan[0].waktu}
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
          <Image source={Ilustrasi} />
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
