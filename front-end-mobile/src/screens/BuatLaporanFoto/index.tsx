import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import Header from '../../components/molecules/Header';
import {MyFont} from '../../components/atoms/MyFont';
import Title from '../../components/atoms/Title';
import Line from '../../components/atoms/Line';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';
import {MyColor} from '../../components/atoms/MyColor';
import {IconPanahKanan} from '../../assets/icons';

interface ImageData {
  uri: string;
}

const BuatLaporanFoto = ({navigation}: any) => {
  const [imageCamera, setImageCamera] = useState<ImageData | null>(null);

  const openCamera = () => {
    const options: any = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, (res: ImagePickerResponse) => {
      if (res.didCancel) {
        console.log('Cancel ambil gambar');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        const data = res.assets?.[0] as ImageData;
        setImageCamera(data);
        console.log(data);
      }
    });
  };

  const openGallery = () => {
    const options: any = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (res: ImagePickerResponse) => {
      if (res.didCancel) {
        console.log('Cancel memilih gambar dari galeri');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        const data = res.assets?.[0] as ImageData;
        setImageCamera(data);
        console.log(data);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Header />
      <View style={styles.container}>
        <Text style={[styles.txt, {marginVertical: 20}]}>Buat Laporan</Text>
        <Title label="Foto Pendukung" />
        <Line height={2} />
        <Gap height={10} />
        <Text style={styles.txt}>
          Silakan masukkan foto yang dapat mendukung dan terkait dengan
          pelaporan Anda
        </Text>
        <Gap height={40} />
        {imageCamera != null && (
          <Image source={{uri: imageCamera.uri}} style={styles.image} />
        )}
        <Button
          onClick={openCamera}
          label="Ambil Foto"
          backgroundColor={MyColor.Primary}
          textColor="#efefef"
          width={130}
        />
        <Gap height={10} />
        <Button
          onClick={openGallery}
          label="Pilih Foto"
          backgroundColor={MyColor.Primary}
          textColor="#efefef"
          width={130}
        />
        <Gap height={30} />
      </View>
      <View style={styles.footer}>
        <Button
          label="Kembali"
          width={150}
          backgroundColor="#efefef"
          textColor={MyColor.Primary}
          onClick={() => navigation.navigate('Navigation')}
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

export default BuatLaporanFoto;

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
  image: {
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  footer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
