import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../components/molecules/Header';
import {MyColor} from '../../components/atoms/MyColor';
import Title from '../../components/atoms/Title';
import {MyFont} from '../../components/atoms/MyFont';
import {
  IconCentang,
  IconLaporan,
  IconRiwayat,
  IconSedangDitindak,
  IconSettings,
  IconTolak,
  IconWaktu,
} from '../../assets/icons';
import {Path, Svg} from 'react-native-svg';
import Gap from '../../components/atoms/Gap';
import {Ilustrasi1} from '../../assets/images';

const AdminHomepage = ({navigation}: any) => {
  const today = new Date();

  const dataDummy = {
    username: 'Roger',
    role: 'Petugas Rumah Sakit',
  };

  const dataDummyLaporan = [
    {
      tanggal_laporan_dikirim: '2023-09-21T06:39:54.000Z',
      status: 'dalam antrian',
      url_gambar: `${Ilustrasi1}`,
    },
    {
      tanggal_laporan_dikirim: '2023-08-211T09:30:50.000Z',
      status: 'laporan ditolak',
      url_gambar: `${Ilustrasi1}`,
    },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'dalam antrian':
        return MyColor.Primary;
      case 'investigasi':
        return '#A37F00';
      case 'laporan selesai':
        return '#008656';
      case 'laporan ditolak':
        return '#8D0000';
      default:
        return 'transparent';
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'dalam antrian':
        return <IconWaktu />;
      case 'investigasi':
        return <IconSedangDitindak />;
      case 'laporan elesai':
        return <IconCentang />;
      case 'laporan ditolak':
        return <IconTolak />;
      default:
        return '';
    }
  };

  const convertStatus = (status: any) => {
    switch (status) {
      case 'dalam antrian':
        return 'Dalam Antrian';
      case 'investigasi':
        return 'Sedang di Investigasi';
      case 'laporan selesai':
        return 'Laporan Selesai';
      case 'laporan ditolak':
        return 'Laporan Ditolak';
      default:
        return null;
    }
  };

  function formatHour(date: any) {
    const localTime = new Date(date.getTime());

    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  function formatDate(date: any) {
    const localTime = new Date(date.getTime());

    const year = localTime.getFullYear().toString();
    const month = getMonthName(localTime.getMonth());
    const day = localTime.getDate().toString();

    return `${day} ${month} ${year}`;
  }
  function formatDate2(date: any) {
    const localTime = new Date(date.getTime());

    const year = localTime.getFullYear().toString();
    const month = localTime.getMonth();
    const day = localTime.getDate().toString();

    return `${day}/${month}/${year}`;
  }

  function getMonthName(monthIndex: any) {
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return monthNames[monthIndex];
  }

  const todayReport = () => {
    return (
      <View>
        {dataDummyLaporan.length === 0 ? (
          <View style={styles.cardTodayReport}>
            <Text style={styles.txtTodayReport}>
              Tidak ada laporan hari ini 👏
            </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.txtCardTitle}>
              Laporan{' '}
              <Text style={{fontFamily: 'Poppins-Bold'}}>
                hari ini ({formatDate2(today)})
              </Text>
            </Text>
            {dataDummyLaporan.map((item, index) => (
              <View
                style={[
                  styles.cardContent,
                  {
                    backgroundColor: getStatusColor(item.status),
                  },
                ]}
                key={index}>
                <View style={{flexDirection: 'row', columnGap: 20}}>
                  <Image
                    source={{
                      uri: item.url_gambar,
                    }}
                    style={styles.cardImage}
                  />
                  <View>
                    <Text style={styles.txtCardTime}>
                      {formatHour(new Date(item.tanggal_laporan_dikirim))}
                    </Text>
                    <Text style={styles.txtCard}>
                      {formatDate(new Date(item.tanggal_laporan_dikirim))}
                    </Text>
                    <Text style={styles.txtCardStatus}>
                      {convertStatus(item.status)}
                    </Text>
                  </View>
                </View>
                {getStatusIcon(item.status)}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const currentMonthReport = () => {
    return (
      <View>
        {dataDummyLaporan.length === 0 ? (
          <View style={styles.cardTodayReport}>
            <Text style={styles.txtTodayReport}>
              Tidak ada laporan bulan ini 👏
            </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.txtCardTitle}>
              Laporan{' '}
              <Text style={{fontFamily: 'Poppins-Bold'}}>
                Bulan {getMonthName(today.getMonth())}
              </Text>
            </Text>
            {dataDummyLaporan.map((item, index) => (
              <View
                style={[
                  styles.cardContent,
                  {
                    backgroundColor: getStatusColor(item.status),
                  },
                ]}
                key={index}>
                <View style={{flexDirection: 'row', columnGap: 20}}>
                  <Image
                    source={{
                      uri: item.url_gambar,
                    }}
                    style={styles.cardImage}
                  />
                  <View>
                    <Text style={styles.txtCardTime}>
                      {formatHour(new Date(item.tanggal_laporan_dikirim))}
                    </Text>
                    <Text style={styles.txtCard}>
                      {formatDate(new Date(item.tanggal_laporan_dikirim))}
                    </Text>
                    <Text style={styles.txtCardStatus}>
                      {convertStatus(item.status)}
                    </Text>
                  </View>
                </View>
                {getStatusIcon(item.status)}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Header backgroundTransparent />
      <View style={styles.welcomeUser}>
        <View>
          <Text style={styles.txtWelcome}>Selamat Pagi,</Text>
          <Text style={styles.txtUsername}>{dataDummy.username}</Text>
          {/* <Title label={dataDummy.username} /> */}
          <Text style={styles.txtRole}>{dataDummy.role}</Text>
        </View>
        <View style={{flexDirection: 'row', columnGap: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AdminHistoryItems');
            }}>
            <Image source={IconRiwayat} tintColor="black" />
          </TouchableOpacity>
          <IconSettings />
        </View>
      </View>
      <View style={styles.container}>
        <Gap height={20} />
        {todayReport()}
        <Gap height={20} />
        {currentMonthReport()}
        <Gap height={20} />
        <TouchableOpacity
          style={styles.btnReportList}
          onPress={() => navigation.navigate('AdminHistoryItems')}>
          <Text style={styles.txtCardStatus}>Daftar Semua Laporan</Text>
          <Image source={IconRiwayat} tintColor={MyColor.Light} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdminHomepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeUser: {
    backgroundColor: MyColor.Light,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    flexWrap: 'wrap',
    minHeight: 114,
    maxHeight: 'auto',
    borderRadius: 20,
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    width: '100%',
  },
  cardImage: {
    resizeMode: 'cover',
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardTodayReport: {
    borderRadius: 20,
    flexWrap: 'wrap',
    minHeight: 119,
    backgroundColor: MyColor.Primary,
  },
  btnReportList: {
    borderRadius: 20,
    backgroundColor: MyColor.Primary,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 15,
    alignItems: 'center',
  },
  txtTodayReport: {
    padding: 20,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#fff',
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
  txtWelcome: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'black',
  },
  txtUsername: {
    fontFamily: 'Poppins-Bold',
    fontSize: 21,
    color: MyColor.Primary,
  },
  txtRole: {
    fontFamily: MyFont.Primary,
    fontSize: 15,
    color: MyColor.Primary,
  },
  Icon: {
    tintColor: 'red',
  },
});
