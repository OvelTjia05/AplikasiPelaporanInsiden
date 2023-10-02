import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MyFont} from '../../components/atoms/MyFont';
import {MyColor} from '../../components/atoms/MyColor';
import Button from '../../components/atoms/Button';
import {IconPanahKanan} from '../../assets/icons';
import {Checkbox} from 'react-native-paper';
import axios from 'axios';

const SubmitLaporan = ({navigation, route}: any) => {
  const dataUser = route.params;
  const [checked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!checked);
    console.log(checked);
  };

  useEffect(() => {
    console.log('Ini di langkah 4', dataUser);
  }, []);

  const handleSubmit = async () => {
    if (!checked) {
      Alert.alert(
        'Peringatan',
        'Anda harus menyetujui pernyataan sebelum mengirim laporan.',
      );
    } else {
      console.log(dataUser);
      try {
        const response = await axios.post(
          `https://backend-pelaporan-final.glitch.me/api/laporan/user/${dataUser.id_user}`,
          {
            nama_pasien: dataUser.name,
            no_rekam_medis: dataUser.nomorMR,
            ruangan: dataUser.lokasiInsiden,
            umur: dataUser.age,
            asuransi: dataUser.insurance,
            jenis_kelamin_pasien: dataUser.gender,
            waktu_mendapatkan_pelayanan: dataUser.selectedDateTime,
            waktu_kejadian_insiden: dataUser.waktuInsiden,
            insiden: dataUser.insiden,
            kronologis_insiden: dataUser.kronologiInsiden,
            insiden_terjadi_pada_pasien: dataUser.pasienTerkait,
            // dampak_insiden_terhadap_pasien: dataUser.
          },
        );
        console.log('ini response: ', response.data);
        const token = response.data.data.token;
        console.log('ini token: ', token);

        if (response.data.code == '200') {
          // navigation.navigate('Navigation', dataUser);
          console.log('Laporan Terkirim');
        }
      } catch {}
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={handleCheckboxToggle}
          // uncheckedColor={MyColor.Primary}
          color={MyColor.Primary}
        />
        <Text style={styles.txt}>
          Saya telah mengisi formulir sesuai dengan apa yang sebenarnya terjadi
          di lapangan. Saya bertanggung jawab jika informasi yang saya berikan
          tidak sama seperti yang terjadi di lapangan.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          label="Kembali"
          backgroundColor={MyColor.Light}
          textColor={MyColor.Primary}
          width={126}
          onClick={() => {
            navigation.navigate('FotoPendukung');
          }}
        />
        <Button
          label="Kirim Laporan"
          backgroundColor={MyColor.Primary}
          textColor={MyColor.Light}
          width={173}
          icons={<IconPanahKanan />}
          onClick={handleSubmit}
        />
      </View>
    </View>
  );
};

export default SubmitLaporan;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
  },
  txt: {
    flex: 1,
    fontFamily: 'Poppins-Bold',
    color: MyColor.Primary,
    fontSize: 18,
  },
  footer: {
    backgroundColor: MyColor.Light,
    flexDirection: 'row',
    columnGap: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
