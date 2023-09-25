import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Gap from '../../components/atoms/Gap';
import {BackgroundRS, Ilustrasi} from '../../assets/images';
import {MyColor} from '../../components/atoms/MyColor';
import {MyFont} from '../../components/atoms/MyFont';
import Header from '../../components/molecules/Header';
import Title from '../../components/atoms/Title';
import Button from '../../components/atoms/Button';
import axios from 'axios';

const SubmitLaporan = ({navigation, route}: any) => {
  const data = route.params;
  const {dataUser} = route.params;

  const setImageCamera = data.data.setImageCamera;
  const setDeskripsiPrev = data.data.setDeskripsi;
  console.log('ini di submit laporan: ', data);
  console.log(
    'ini di submit laporan user 2: ',
    data.data.dataUser.dataUser.id_user,
  );
  console.log('ini di submit laporan user: ', dataUser);

  const [id_user, set_id_user] = useState(data.data.dataUser.dataUser.id_user);
  const [kategori_bidang, set_kategori_bidang] = useState(
    data.data.dataUser.kategori_bidang,
  );
  const [deskripsi, setDeskripsi] = useState(data.deskripsi);
  const [gambar, setGambar] = useState(data.data.imageCamera);

  const submit = async () => {
    console.log('ini halaman submit laporan======\n');
    console.log('ini id user: ', id_user);
    console.log('kategori bidang: ', kategori_bidang);
    console.log('deskripsi: ', deskripsi);
    console.log('gambar: ', gambar);
    console.log('ini gambar uri: ', gambar.uri);

    const formData = new FormData();
    formData.append('kategori_bidang', kategori_bidang);
    formData.append('deskripsi', deskripsi);
    formData.append('gambar', {
      uri: gambar.uri,
      type: gambar.type,
      name: gambar.fileName,
    });

    console.log('ini username : ', data.data.dataUser.dataUser.username);
    console.log('ini accessToken : ', data.data.dataUser.dataUser.accessToken);

    try {
      const response = await axios.post(
        `https://backend-pelaporaninsiden.glitch.me/api/laporan/${id_user}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      navigation.navigate('Navigation', {
        id_user,
        username: data.data.dataUser.dataUser.username,
        accessToken: data.data.dataUser.dataUser.accessToken,
      });
      setImageCamera(null);
      setDeskripsiPrev('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.container1}>
        <Gap height={40} />
        <Text style={styles.txt}>
          Berikut adalah laporan yang Anda kirimkan
        </Text>
        <Gap height={20} />
        <View style={styles.box}>
          <Title label="Foto Pendukung" />
          <Image style={styles.img} source={{uri: gambar.uri}} />
        </View>
        <Gap height={30} />
        <View style={styles.box}>
          <Title label="Kategori Bidang" />
          <Text numberOfLines={undefined} style={styles.txt}>
            {kategori_bidang}
          </Text>
        </View>
        <View style={styles.box}>
          <Title label="Deskripsi" />
          <Text numberOfLines={undefined} style={styles.txt}>
            {deskripsi}
          </Text>
        </View>
        <Gap height={50} />
      </View>
      <View style={styles.footer}>
        <Button
          label="Kembali"
          textColor={MyColor.Primary}
          backgroundColor={MyColor.Light}
          width={150}
          onClick={() => {
            navigation.navigate('BuatLaporanTeks', {
              dataUser: {
                dataUser: {
                  id_user: data.data.dataUser.dataUser.id_user,
                  username: data.data.dataUser.dataUser.username,
                  accessToken: data.data.dataUser.dataUser.accessToken,
                },
                kategori_bidang,
              },
              imageCamera: data.data.imageCamera,
              setImageCamera: data.data.setImageCamera,
            });
          }}
        />
        <Button
          label="Submit"
          textColor={MyColor.Light}
          backgroundColor={MyColor.Primary}
          width={150}
          // onClick={() => {
          //   navigation.navigate('Navigation');
          // }}
          onClick={submit}
        />
      </View>
    </ScrollView>
  );
};

export default SubmitLaporan;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
  },
  txt: {
    fontFamily: MyFont.Primary,
    fontSize: 14,
    color: 'black',
  },
  img: {
    // maxWidth: '100%',
    height: 300,
    width: 300,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  box: {
    backgroundColor: MyColor.Light,
    padding: 10,
    width: '90%',
    borderRadius: 20,
    minHeight: 100,
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 30,
    bottom: 10,
    // backgroundColor: 'grey',
  },
});
