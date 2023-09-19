import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {MyColor} from '../../components/atoms/MyColor';
import Header from '../../components/molecules/Header';
import Line from '../../components/atoms/Line';
import Title from '../../components/atoms/Title';
import {MyFont} from '../../components/atoms/MyFont';
import Button from '../../components/atoms/Button';
import {IconPanahKanan} from '../../assets/icons';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const KategoriBidang = ({navigation, route}: any) => {
  const dataUser = route.params;

  const [checked, setChecked] = useState('Farmasi');
  const [isPoliExpanded, setIsPoliExpanded] = useState(false);
  const [selectedPoli, setSelectedPoli] = useState('Farmasi');

  const togglePoliOptions = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsPoliExpanded(!isPoliExpanded);
  };

  const renderPoliOption = (poliName: string) => (
    <TouchableOpacity
      style={[
        styles.btnPoliOptions,
        {
          backgroundColor:
            selectedPoli === poliName ? MyColor.Primary : '#efefef',
        },
      ]}
      onPress={() => setSelectedPoli(poliName)}>
      <Text style={{color: selectedPoli === poliName ? '#efefef' : '#212121'}}>
        {poliName}
      </Text>
    </TouchableOpacity>
  );

  const handleRadioButtonChange = (value: string) => {
    setChecked(value);
    setSelectedPoli(value);
    if (value === 'Poli') {
      togglePoliOptions();
    } else {
      setIsPoliExpanded(false);
    }
  };

  const SubmitKategori = () => {
    if (selectedPoli === 'Poli') {
      Alert.alert('Harap pilih jenis poli');
    } else {
      console.log('kategori bidang: ', selectedPoli);
      navigation.navigate('BuatLaporanFoto', {
        dataUser,
        kategori_bidang: selectedPoli,
      });
    }
  };

  return (
    <ScrollView>
      <Header />
      <View style={styles.container}>
        <Text style={styles.txtBuatLaporan}>Buat Laporan</Text>
        <Title label="Kategori Bidang" />
        <Line height={2} />
        <RadioButton.Group
          onValueChange={handleRadioButtonChange}
          value={checked}>
          <View style={styles.radioButton}>
            <RadioButton.Android value="Farmasi" color={MyColor.Primary} />
            <Text>Farmasi</Text>
          </View>
          <View
            style={{
              paddingVertical: 4,
              backgroundColor: MyColor.Light,
              marginBottom: 10,
              borderRadius: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={togglePoliOptions}
                style={styles.accordionTitle}>
                <RadioButton.Android value="Poli" color={MyColor.Primary} />
              </TouchableOpacity>
              <Text>Poli</Text>
            </View>
            {isPoliExpanded && (
              <View style={styles.poliOptionsContainer}>
                {renderPoliOption('Poli Umum')}
                {renderPoliOption('Poli Mata')}
                {renderPoliOption('Poli Paru')}
                {renderPoliOption('Poli Gigi')}
                {renderPoliOption('Poli Anak')}
                {renderPoliOption('Poli THT')}
              </View>
            )}
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Android value="Staff" color={MyColor.Primary} />
            <Text>Staff</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Android value="Lainnya" color={MyColor.Primary} />
            <Text>Lainnya</Text>
          </View>
        </RadioButton.Group>
      </View>
      <View style={styles.footer}>
        <Button
          label="Kembali"
          width={150}
          backgroundColor="#efefef"
          textColor={MyColor.Primary}
          onClick={() => navigation.navigate('Navigation', dataUser)}
        />
        <Button
          label="Selanjutnya"
          width={150}
          backgroundColor={MyColor.Primary}
          textColor="#efefef"
          // onClick={() => navigation.navigate('BuatLaporanTeks', dataUser)}
          onClick={SubmitKategori}
          icons={<IconPanahKanan />}
        />
      </View>
    </ScrollView>
  );
};

export default KategoriBidang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '85%',
    alignSelf: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    backgroundColor: MyColor.Light,
    marginBottom: 10,
    borderRadius: 10,
  },
  poliOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: MyColor.Light,
    borderRadius: 10,
    justifyContent: 'center',
  },
  btnPoliOptions: {
    alignItems: 'center',
    backgroundColor: '#efefef',
    width: 100,
    borderRadius: 10,
    paddingVertical: 10,
  },
  accordionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MyColor.Light,
  },
  txtBuatLaporan: {
    fontSize: 18,
    color: '#212121',
    marginVertical: 20,
    fontFamily: MyFont.Primary,
  },
  footer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
