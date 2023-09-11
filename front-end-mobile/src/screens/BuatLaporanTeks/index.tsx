import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput as Input,
} from 'react-native';
import React from 'react';
import Header from '../../components/molecules/Header';
import TextInput from '../../components/molecules/TextInput';
import {MyFont} from '../../components/atoms/MyFont';
import Title from '../../components/atoms/Title';
import Line from '../../components/atoms/Line';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';
import {IconPanahKanan} from '../../assets/icons';
import {MyColor} from '../../components/atoms/MyColor';

const BuatLaporanTeks = ({navigation}: any) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Header />
      <View style={styles.container}>
        <Text style={[styles.txt, {marginVertical: 20}]}>Buat Laporan</Text>
        <Title label="Isi Laporan" />
        <Line height={2} />
        <Gap height={10} />
        <Text style={styles.txt}>
          Silahkan memasukkan foto yang bisa mendukung & berhubungan dengan
          pelaporan Anda
        </Text>
        <Gap height={20} />
        <Input
          style={styles.txtInput}
          placeholder="Ketik disini..."
          placeholderTextColor="#A9A9A9"
          textAlignVertical="top"
          multiline={true}
        />
      </View>
      <View style={styles.footer}>
        <Button
          label="Kembali"
          width={150}
          backgroundColor="#efefef"
          textColor={MyColor.Primary}
          onClick={() => navigation.navigate('DashBoard')}
        />
        <Button
          label="Selanjutnya"
          width={150}
          backgroundColor={MyColor.Primary}
          textColor="#efefef"
          onClick={() => navigation.navigate('BuatLaporanTeks')}
          icons={<IconPanahKanan />}
        />
      </View>
    </ScrollView>
  );
};

export default BuatLaporanTeks;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginTop: 30,
    width: '85%',
    alignSelf: 'center',
  },
  txt: {
    fontFamily: MyFont.Primary,
    color: '#212121',
    fontSize: 18,
  },
  txtInput: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: MyFont.Primary,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingStart: 10,
    width: '100%',
    minHeight: 200,
    height: 'auto',
    // paddingVertical: 20,
    color: 'black',
  },
  footer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
});
