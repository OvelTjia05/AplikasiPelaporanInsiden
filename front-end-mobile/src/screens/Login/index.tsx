import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput as Input,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Gap from '../../components/atoms/Gap';
import {Logo} from '../../assets/images';
import {MyFont} from '../../components/atoms/MyFont';
import {MyColor} from '../../components/atoms/MyColor';
import {
  IconMataTerbuka,
  IconMataTertutup,
  IconPanahKanan,
} from '../../assets/icons';
import Button from '../../components/atoms/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordInput = ({placeholder, onChangeText, value}: any) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.passwordInputContainer}>
      <Input
        style={styles.txtInputPassword}
        placeholder={placeholder}
        placeholderTextColor="#787878"
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity onPress={toggleSecureTextEntry}>
        {secureTextEntry ? <IconMataTertutup /> : <IconMataTerbuka />}
      </TouchableOpacity>
    </View>
  );
};

const Login = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await axios.post(
        'https://backend-pelaporaninsiden.glitch.me/auth/user/login',
        {
          username,
          password,
        },
      );
      console.log('ini response: ', response.data);
      const cookies = response.headers['set-cookie'];
      console.log('ini cookies: ', cookies);
      const cookiesValue = cookies[0];

      const cookieArray = cookiesValue.split(';');
      let refreshToken = '';

      // Loop melalui array cookies untuk mencari nilai 'refresh_token'
      for (const cookie of cookieArray) {
        if (cookie.trim().startsWith('refresh_token=')) {
          refreshToken = cookie.trim().substring('refresh_token='.length); // Mengambil nilai refresh_token
          break; // Keluar dari loop setelah nilai ditemukan
        }
      }

      console.log('ini refresh token jadi: ', refreshToken);

      await AsyncStorage.setItem('refresh_token', refreshToken);

      const value = await AsyncStorage.getItem('refresh_token');
      console.log('ini adalah value:::::: ', value);
      if (response.data.code == '200') {
        console.log('masuk sini');
        const dataUser = response.data.data;
        console.log('ini di LOGIN: ', dataUser);
        console.log('ini di LOGIN id user: ', dataUser.id_user);
        navigation.navigate('Navigation', dataUser);
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Gap height={110} />
      <View style={styles.logoContainer}>
        <Image source={Logo} resizeMode="contain" style={styles.logo} />
        <Text style={styles.txtLogo}>RSUD Dr.Sam Ratulangi{'\n'}Tondano</Text>
      </View>
      <Gap height={40} />
      <Text style={styles.txt}>Buat Laporan dengan Akun{'\n'}</Text>
      <Text style={styles.txtBold}>Silahkan masuk dengan akun Anda{'\n'}</Text>
      <Gap height={40} />
      <Input
        style={styles.txtInput}
        placeholder="Masukan username Anda"
        placeholderTextColor="#787878"
        onChangeText={setUsername}
        value={username}
      />
      <Gap height={30} />
      <PasswordInput
        placeholder="Masukan password Anda"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
        <Text style={styles.txtLupaPass}>Tolong, saya lupa password</Text>
      </TouchableOpacity>
      <Gap height={40} />
      <Button
        label="Masuk"
        width={193}
        backgroundColor={MyColor.Primary}
        textColor="#efefef"
        onClick={login}
        icons={<IconPanahKanan />}
      />
      <Gap height={10} />
      <Button
        label="Belum punya akun"
        width={193}
        backgroundColor="#efefef"
        textColor={MyColor.Primary}
        onClick={() => {
          navigation.navigate('SignUp');
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 33,
    height: 43,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtLogo: {
    fontFamily: MyFont.Primary,
    fontSize: 11,
    color: 'black',
  },
  txt: {
    fontFamily: MyFont.Primary,
    fontSize: 15,
    color: 'black',
  },
  txtBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: MyColor.Primary,
  },
  txtInput: {
    fontSize: 14,
    fontFamily: MyFont.Primary,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingStart: 10,
    width: '100%',
    marginBottom: 20,
    color: 'black',
  },
  txtInputPassword: {
    fontSize: 14,
    fontFamily: MyFont.Primary,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingStart: 10,
    width: '85%',
    color: 'black',
  },
  txtLupaPass: {
    fontFamily: MyFont.Primary,
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
  },
});

export default Login;
