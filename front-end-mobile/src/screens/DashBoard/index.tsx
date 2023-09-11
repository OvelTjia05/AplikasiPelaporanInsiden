import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Gap from '../../components/atoms/Gap';
import {MyColor} from '../../components/atoms/MyColor';
import {BackgroundRS1, Logo} from '../../assets/images';
import {MyFont} from '../../components/atoms/MyFont';
import {IconBuatLaporan, IconBuatLaporanAnonim} from '../../assets/icons';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/atoms/Button';

const {width, height} = Dimensions.get('screen');
const w = width * 0.8;
const h = w * 0.2;

const DashBoard = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundRS1}
        resizeMode="cover"
        style={styles.bg}>
        <LinearGradient
          colors={['transparent', '#efefef']}
          style={styles.overlay}></LinearGradient>
        <View style={styles.content}>
          <Image source={Logo} resizeMode="contain" style={styles.logo} />
          <Gap height={20} />
          <Text style={styles.txt}>RSUD Dr.Sam Ratulangi Tondano</Text>
          <Gap height={40} />
          <Text style={styles.txtTitle}>
            Aplikasi <Text style={styles.txtBold}>Pelaporan</Text> Insiden
          </Text>
          <Gap height={40} />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('BuatLaporanFoto')}>
            <Text style={styles.btnTxt}>Buat Laporan</Text>
            <IconBuatLaporan />
          </TouchableOpacity>
          <Gap height={20} />
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: 'transparent', height: h}]}
            onPress={() => navigation.navigate('SplashScreen')}>
            <Text style={[styles.btnTxt, {color: MyColor.Primary}]}>
              Riwayat Laporan
            </Text>
            <IconBuatLaporanAnonim />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '50%',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '50%',
    position: 'absolute',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 20,
    backgroundColor: MyColor.Primary,
    width: w,
    height: 87,
    borderRadius: 27,
    borderColor: '#007FA4',
    borderWidth: 2,
  },
  btnTxt: {
    fontFamily: MyFont.Primary,
    color: '#fff',
    fontSize: 18,
  },
  logo: {
    height: 70,
  },
  txt: {
    textAlign: 'center',
    width: '45%',
    fontSize: 13,
    color: '#000',
  },
  txtTitle: {
    width: '70%',
    fontSize: 38,
    color: MyColor.Primary,
    lineHeight: 60,
  },
  txtBold: {
    fontFamily: 'Poppins-Bold',
  },
});
