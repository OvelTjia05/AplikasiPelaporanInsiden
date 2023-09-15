import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import Gap from '../../components/atoms/Gap';
import {BackgroundRS, Ilustrasi} from '../../assets/images';
import {MyColor} from '../../components/atoms/MyColor';
import {MyFont} from '../../components/atoms/MyFont';
import Header from '../../components/molecules/Header';
import Title from '../../components/atoms/Title';
import Button from '../../components/atoms/Button';

const SubmitLaporan = ({navigation}: any) => {
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
          <Image style={styles.img} source={Ilustrasi} />
        </View>
        <Gap height={30} />
        <View style={styles.box}>
          <Title label="Deskripsi" />
          <Text numberOfLines={undefined}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            debitis corrupti nam? Temporibus repellendus sint incidunt culpa
            ullam recusandae ab sapiente dolorum magnam sunt, eos autem laborum
            amet modi, similique illum rerum alias quae, at ad quis quidem
            nostrum. Eius vero omnis fuga sint architecto ut odio asperiores
            reprehenderit doloribus accusamus dignissimos culpa porro, quasi
            nihil impedit corporis, fugit delectus, laborum iure soluta iste
            minus ab optio quos. Perferendis, ipsam eos! Architecto libero
            inventore ipsum maiores consequuntur sed quia, accusamus eius
            deleniti cupiditate itaque soluta corrupti dolore officia quibusdam
            magnam nobis quod id consectetur suscipit? Laborum qui natus maiores
            ex consequatur recusandae excepturi exercitationem architecto.
            Fugiat quaerat quos, minus necessitatibus facilis accusantium sunt
            impedit velit incidunt nemo repellendus sapiente hic deserunt
            voluptate vitae dolore placeat! Distinctio sunt quas, veniam nisi,
            libero labore laboriosam dolore voluptates deserunt illo debitis
            natus fugiat nulla maxime quidem facilis iste minus porro dolores!
            Veritatis voluptate inventore dicta, delectus quos pariatur itaque
            quasi nesciunt ex et totam dolore id aut? Animi odio maiores quis
            tempore. Et, velit eius mollitia nam suscipit quibusdam dolorem
            laborum quisquam hic. Corrupti consequuntur, atque dolore officia
            sunt delectus aperiam obcaecati! Obcaecati deleniti voluptatum
            officiis, perspiciatis quis quasi recusandae minus et enim!
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
            navigation.navigate('BuatLaporanTeks');
          }}
        />
        <Button
          label="Submit"
          textColor={MyColor.Light}
          backgroundColor={MyColor.Primary}
          width={150}
          onClick={() => {
            navigation.navigate('Navigation');
          }}
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
    maxWidth: '100%',
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
