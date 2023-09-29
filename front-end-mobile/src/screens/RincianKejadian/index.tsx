import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput as Input,
} from 'react-native';
import React, {useState} from 'react';
import Title from '../../components/atoms/Title';
import {MyFont} from '../../components/atoms/MyFont';
import {MyColor} from '../../components/atoms/MyColor';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';
import {IconPanahKanan} from '../../assets/icons';

const RincianKejadian = ({navigation}: any) => {
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [insiden, setInsiden] = useState('');
  const [kronologiInsiden, setKronologiInsiden] = useState('');
  const [pelaporPertama, setPelaporPertama] = useState('');
  const [pasienTerkait, setPasienTerkait] = useState('');
  const [lokasiInsiden, setLokasiInsiden] = useState('');
  const [unitTerkait, setUnitTerkait] = useState('');
  const [tindakLanjut, setTindakLanjut] = useState('');
  const [tindakLanjutOleh, setTindakLanjutOleh] = useState('');
  const [isPernahTerjadi, setIsPernahTerjadi]: any = useState(undefined);
  const [deskripsiPernahTerjadi, setDeskripsiPernahTerjadi] = useState('');

  const datePick = () => {
    const showDateTimePicker = () => {
      setDateTimePickerVisible(true);
    };

    const hideDateTimePicker = () => {
      setDateTimePickerVisible(false);
    };

    const handleDateConfirm = (date: Date) => {
      setSelectedDateTime(date);
      hideDateTimePicker();
      console.log(date);
    };

    const formatDateTime = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} - ${hours}:${minutes}`;
    };

    return (
      <View>
        <TouchableOpacity
          style={[styles.button, {height: 40, width: '100%'}]}
          onPress={showDateTimePicker}>
          <Text style={styles.txtButton}>
            {formatDateTime(selectedDateTime)}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          mode="datetime"
          timeZoneName="Asia/Makassar"
          onConfirm={handleDateConfirm}
          onCancel={hideDateTimePicker}
        />
      </View>
    );
  };

  const btnPelaporPertama = () => {
    const handlePelaporPertama = (option: string) => {
      setPelaporPertama(option);
    };
    return (
      <View style={styles.containerBtn}>
        <TouchableOpacity
          style={[
            styles.button,
            pelaporPertama === 'Dokter' && styles.selectedButton,
          ]}
          onPress={() => handlePelaporPertama('Dokter')}>
          <Text
            style={[
              styles.txtButton,
              pelaporPertama === 'Dokter' && styles.txtBtnActive,
            ]}>
            Dokter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            pelaporPertama === 'Perawat' && styles.selectedButton,
          ]}
          onPress={() => handlePelaporPertama('Perawat')}>
          <Text
            style={[
              styles.txtButton,
              pelaporPertama === 'Perawat' && styles.txtBtnActive,
            ]}>
            Perawat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            pelaporPertama === 'Petugas lainnya' && styles.selectedButton,
          ]}
          onPress={() => handlePelaporPertama('Petugas lainnya')}>
          <Text
            style={[
              styles.txtButton,
              pelaporPertama === 'Petugas lainnya' && styles.txtBtnActive,
            ]}>
            Petugas lainnya
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            pelaporPertama === 'Pasien' && styles.selectedButton,
          ]}
          onPress={() => handlePelaporPertama('Pasien')}>
          <Text
            style={[
              styles.txtButton,
              pelaporPertama === 'Pasien' && styles.txtBtnActive,
            ]}>
            Pasien
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            pelaporPertama === 'Keluarga / Pendamping' && styles.selectedButton,
          ]}
          onPress={() => handlePelaporPertama('Keluarga / Pendamping')}>
          <Text
            style={[
              styles.txtButton,
              pelaporPertama === 'Keluarga / Pendamping' && styles.txtBtnActive,
            ]}>
            Keluarga / Pendamping
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            pelaporPertama === 'Pengunjung' && styles.selectedButton,
          ]}
          onPress={() => handlePelaporPertama('Pengunjung')}>
          <Text
            style={[
              styles.txtButton,
              pelaporPertama === 'Pengunjung' && styles.txtBtnActive,
            ]}>
            Pengunjung
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            pelaporPertama === 'Lain-lain' && styles.selectedButton,
          ]}
          onPress={() => handlePelaporPertama('Lain-lain')}>
          <Text
            style={[
              styles.txtButton,
              pelaporPertama === 'Lain-lain' && styles.txtBtnActive,
            ]}>
            Lain-lain
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const btnPasienTerkait = () => {
    const handlePasienTerkait = (option: string) => {
      setPasienTerkait(option);
      console.log('pasien terkait: ', option);
    };

    return (
      <View style={styles.containerBtn}>
        <TouchableOpacity
          style={[
            styles.button,
            pasienTerkait === 'Pasien rawat inap' && styles.selectedButton,
          ]}
          onPress={() => handlePasienTerkait('Pasien rawat inap')}>
          <Text
            style={[
              styles.txtButton,
              pasienTerkait === 'Pasien rawat inap' && styles.txtBtnActive,
            ]}>
            Pasien rawat inap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            pasienTerkait === 'Pasien rawat jalan' && styles.selectedButton,
          ]}
          onPress={() => handlePasienTerkait('Pasien rawat jalan')}>
          <Text
            style={[
              styles.txtButton,
              pasienTerkait === 'Pasien rawat jalan' && styles.txtBtnActive,
            ]}>
            Pasien rawat jalan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            pasienTerkait === 'Pasien UGD' && styles.selectedButton,
          ]}
          onPress={() => handlePasienTerkait('Pasien UGD')}>
          <Text
            style={[
              styles.txtButton,
              pasienTerkait === 'Pasien UGD' && styles.txtBtnActive,
            ]}>
            Pasien UGD
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const btnTindakLanjutOleh = () => {
    const handleTindakLanjutOleh = (option: string) => {
      setTindakLanjutOleh(option);
      console.log('follow-up by: ', option);
    };

    return (
      <View style={styles.containerBtn}>
        <TouchableOpacity
          style={[
            styles.button,
            tindakLanjutOleh === 'Tim' && styles.selectedButton,
          ]}
          onPress={() => handleTindakLanjutOleh('Tim')}>
          <Text
            style={[
              styles.txtButton,
              tindakLanjutOleh === 'Tim' && styles.txtBtnActive,
            ]}>
            Tim
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            tindakLanjutOleh === 'Dokter' && styles.selectedButton,
          ]}
          onPress={() => handleTindakLanjutOleh('Dokter')}>
          <Text
            style={[
              styles.txtButton,
              tindakLanjutOleh === 'Dokter' && styles.txtBtnActive,
            ]}>
            Dokter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            tindakLanjutOleh === 'Perawat' && styles.selectedButton,
          ]}
          onPress={() => handleTindakLanjutOleh('Perawat')}>
          <Text
            style={[
              styles.txtButton,
              tindakLanjutOleh === 'Perawat' && styles.txtBtnActive,
            ]}>
            Perawat
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const btnPernahTerjadi = () => {
    const handlePernahTerjadi = (option: boolean) => {
      setIsPernahTerjadi(option);
      console.log('pernah terjadi: ', option);
    };
    console.log('desc', deskripsiPernahTerjadi);
    return (
      <View>
        <View style={[styles.containerBtn, {columnGap: 20}]}>
          <TouchableOpacity
            style={[
              styles.button,
              {width: 'auto', flex: 1},
              isPernahTerjadi === true && styles.selectedButton,
            ]}
            onPress={() => handlePernahTerjadi(true)}>
            <Text
              style={[
                styles.txtButton,
                isPernahTerjadi === true && styles.txtBtnActive,
              ]}>
              Ya
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {width: 'auto', flex: 1},
              isPernahTerjadi === false && styles.selectedButton,
            ]}
            onPress={() => handlePernahTerjadi(false)}>
            <Text
              style={[
                styles.txtButton,
                isPernahTerjadi === false && styles.txtBtnActive,
              ]}>
              Tidak
            </Text>
          </TouchableOpacity>
        </View>
        <Gap height={20} />
        {isPernahTerjadi ? (
          <View
            style={{
              height: 263,
              backgroundColor: MyColor.Primary,
              borderRadius: 10,
              padding: 10,
              // display: 'none',
            }}>
            <Text style={[styles.txtDesc]}>
              Kapan? dan langkah / tindakan apa yang telah diambil pada unit
              kerja tersebut untuk mencegah terulangnya kejadian yang sama?
            </Text>
            <Input
              style={styles.inputBox2}
              // placeholder="Nama anda"
              placeholderTextColor="#787878"
              onChangeText={setDeskripsiPernahTerjadi}
              value={deskripsiPernahTerjadi}
              multiline={true}
            />
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Title label="Rincian Kejadian" />
        <Text style={styles.txtSection}>Waktu Insiden</Text>
        {datePick()}
        <Text style={styles.txtSection}>Insiden</Text>
        <Input
          style={styles.inputBox}
          // placeholder="Nama anda"
          placeholderTextColor="#787878"
          onChangeText={setInsiden}
          value={insiden}
          multiline={true}
        />
        <Text style={styles.txtSection}>Kronologis Insiden</Text>
        <Input
          style={styles.inputBox}
          // placeholder="Nama anda"
          placeholderTextColor="#787878"
          onChangeText={setKronologiInsiden}
          value={kronologiInsiden}
          multiline={true}
        />
        <Text style={styles.txtSection}>
          Orang Pertama Yang Melaporkan Insiden
        </Text>
        {btnPelaporPertama()}
        <Text style={styles.txtSection}>Insiden Menyangkut Pasien</Text>
        {btnPasienTerkait()}
        <Text style={styles.txtSection}>Tempat Insiden</Text>
        <Input
          style={styles.inputBox}
          // placeholder="Nama anda"
          placeholderTextColor="#787878"
          onChangeText={setLokasiInsiden}
          value={lokasiInsiden}
          multiline={true}
        />
        <Text style={styles.txtSection}>
          Unit / Departemen terkait yang menyebabkan insiden
        </Text>
        <Input
          style={styles.inputBox}
          // placeholder="Nama anda"
          placeholderTextColor="#787878"
          onChangeText={setUnitTerkait}
          value={unitTerkait}
          multiline={true}
        />
        <Text style={styles.txtSection}>
          Tindak lanjut yang dilakukan segera setelah kejadian, dan hasilnya
        </Text>
        <Input
          style={styles.inputBox}
          // placeholder="Nama anda"
          placeholderTextColor="#787878"
          onChangeText={setTindakLanjut}
          value={tindakLanjut}
          multiline={true}
          // blurOnSubmit={true}
        />
        <Text style={styles.txtSection}>
          Tindak lanjut setelah insiden, dilakukan oleh
        </Text>
        {btnTindakLanjutOleh()}
        <Text style={styles.txtSection}>
          Apakah kejadian yang sama pernah terjadi di Unit Kerja lain?
        </Text>
        {btnPernahTerjadi()}
      </View>
      <View style={styles.footer}>
        <Button
          label="Kembali"
          backgroundColor={MyColor.Light}
          textColor={MyColor.Primary}
          width={126}
          onClick={() => {
            navigation.navigate('DataKarakteristikPasien');
          }}
        />
        <Button
          label="Lanjut"
          backgroundColor={MyColor.Primary}
          textColor={MyColor.Light}
          width={173}
          icons={<IconPanahKanan />}
          onClick={() => {
            navigation.navigate('FotoPendukung');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default RincianKejadian;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  txtDesc: {
    flex: 1,
    fontFamily: MyFont.Primary,
    color: MyColor.Light,
    fontSize: 18,
  },
  txtSection: {
    fontFamily: MyFont.Primary,
    color: 'black',
    fontSize: 18,
    marginTop: 20,
  },
  txtButton: {
    fontFamily: MyFont.Primary,
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  txtBtnActive: {
    color: MyColor.Light,
  },
  inputBox: {
    paddingVertical: 0,
    minHeight: 40,
    fontFamily: MyFont.Primary,
    fontSize: 16,
    color: 'black',
    backgroundColor: MyColor.Light,
    borderRadius: 10,
    marginBottom: 10,
  },
  inputBox2: {
    textAlignVertical: 'top',
    padding: 10,
    height: 106,
    fontFamily: MyFont.Primary,
    fontSize: 16,
    color: 'black',
    backgroundColor: MyColor.Light,
    borderRadius: 10,
    marginBottom: 10,
  },
  containerBtn: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  button: {
    marginRight: 'auto',
    height: 52,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: MyColor.Light,
  },
  selectedButton: {
    backgroundColor: MyColor.Primary,
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
