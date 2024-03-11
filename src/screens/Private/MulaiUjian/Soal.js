import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import HTML from 'react-native-render-html';
import {
  IconInfo,
  IconArrowRightDark,
  IconArrowLeftDisable,
  IconArrowLeft,
  IconMenuActive,
} from '../../../assets';
import {Button, Gap} from '../../../components';
import {firestore, functions} from '../../../context';
import {colors, fonts} from '../../../utils';
import Header from './Header';

const QuizModal = ({onYes, onCancel, open}) => {
  return (
    <Modal visible={open} transparent animationType="fade">
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kumpulkan Ujian</Text>
          <Text style={styles.cardDesc}>
            Apakah kamu yakin ingin mengumpulkan jawaban kamu sekarang?
          </Text>
          <TouchableOpacity style={styles.cardBtn} onPress={onYes}>
            <Text style={styles.cardBtnTxt}>Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardBtnSec} onPress={onCancel}>
            <Text style={styles.cardBtnTxtSec}>Batalkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const SoalModal = ({
  open,
  soal,
  jawaban,
  onPress,
  onSubmit,
  goToIndex,
  handleClose,
}) => {
  return (
    <Modal visible={open} transparent animationType="fade">
      <TouchableOpacity style={styles.btnActive} onPress={onPress}>
        <IconMenuActive />
      </TouchableOpacity>
      <View style={styles.cardSoal}>
        <View style={styles.headerSoal}>
          <Text style={styles.txt}>
            {jawaban.length} / {soal.length}
          </Text>
          <Text style={styles.desc}>soal diisi</Text>
        </View>
        <View style={styles.wrap}>
          {soal.map((item, index) => {
            const no = index + 1;

            const activeJawaban =
              jawaban.find((jawab) => jawab.id === item) || {};

            return (
              <TouchableOpacity
                onPress={() => {
                  goToIndex(index);
                  handleClose();
                }}
                style={
                  activeJawaban.jawaban
                    ? styles.circleSoalActive
                    : styles.circleSoal
                }
                key={index}>
                <Text style={styles.circleTxt}>{no <= 10 ? `0${no}` : no}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.btnSoal}>
          <Button title="Kumpulkan Ujian" onPress={onSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const Soal = ({
  ujian,
  hasilUjian,
  jawaban,
  soal,
  ujian_id,
  hasil_ujian_id,
  orderIds,
}) => {
  const [soalIndex, setSoalIndex] = useState(0);

  const [open, setOpen] = useState(false);

  const [openPeta, setOpenPeta] = useState(false);

  const infoAlert = () => {
    Alert.alert(
      'Info',
      'Pilihlah Jawaban Yang Benar',
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );
  };

  const handleAnswer = (Jawaban) => async (e) => {
    if (activeJawaban.jawaban === Jawaban) {
      await firestore
        .doc(`hasil_ujian/${hasil_ujian_id}/detail/${activeSoal.id}`)
        .delete();
    } else {
      await firestore
        .doc(`hasil_ujian/${hasil_ujian_id}/detail/${activeSoal.id}`)
        .set(
          {
            jawaban: Jawaban,
            soal_id: activeSoal.id,
            ujian_id: ujian_id,
          },
          {merge: true},
        );
    }
  };

  const handlePrevious = () => {
    if (soalIndex === 0) {
      return null;
    } else {
      setSoalIndex((index) => index - 1);
    }
  };

  const handleNext = () => {
    if (soalIndex === orderIds.length - 1) {
      return null;
    } else {
      setSoalIndex((index) => index + 1);
    }
  };

  const activeSoal = soal.find((item) => item.id === orderIds[soalIndex]) || {};

  const activeJawaban =
    jawaban.find((item) => item.id === orderIds[soalIndex]) || {};

  const no = soalIndex + 1;

  const handleSubmit = async () => {
    try {
      const endUjian = functions.httpsCallable('endUjian');

      await endUjian({
        hasil_ujian_id: hasilUjian.id,
        waktu: Date.now(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const htmlContent = activeSoal.pertanyaan || '<p>Loading...</p>';

  const handlePeta = () => {
    if (openPeta === true) {
      setOpenPeta(false);
    } else {
      setOpenPeta(true);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Gap height={30} />
      <Header ujian={ujian} hasilUjian={hasilUjian} onPressPeta={handlePeta} />
      <Gap height={16} />
      <View style={styles.content}>
        <View style={styles.headerContent}>
          <View style={styles.number}>
            <Text style={styles.txt}>{no < 10 ? `0${no}` : no}</Text>
          </View>
          <TouchableOpacity>
            <IconInfo onPress={infoAlert} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.soal}>
            <HTML
              source={{html: htmlContent}}
              imagesMaxWidth={Dimensions.get('window').width / 1.1}
            />
            <View style={styles.wrapChoice}>
              {Object.keys(activeSoal.pilihan_jawaban || [])
                .sort()
                .map((key, index) => {
                  const pilihan = activeSoal.pilihan_jawaban[key];
                  return (
                    <View key={key}>
                      {pilihan.type === 'text' && (
                        <TouchableOpacity
                          onPress={handleAnswer(key)}
                          style={
                            activeJawaban.jawaban === key
                              ? styles.choiceActive
                              : styles.choice
                          }>
                          <View style={styles.circle}>
                            <Text style={styles.txt}>{key}</Text>
                          </View>
                          <Gap width={10} />
                          <Text style={styles.choiceTxt}>{pilihan.text}</Text>
                        </TouchableOpacity>
                      )}
                      {pilihan.type === 'image' && (
                        <TouchableOpacity
                          onPress={handleAnswer(key)}
                          style={
                            activeJawaban.jawaban === key
                              ? styles.choiceActive
                              : styles.choice
                          }>
                          <View style={styles.circle}>
                            <Text style={styles.txt}>{key}</Text>
                          </View>
                          <Gap width={10} />
                          <Image
                            source={{
                              uri: pilihan.url,
                            }}
                            style={styles.choiceImg}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContent}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={soalIndex === 0}
            style={styles.btnPrev}>
            {soalIndex === 0 ? <IconArrowLeftDisable /> : <IconArrowLeft />}
          </TouchableOpacity>
          {soalIndex < orderIds.length - 1 ? (
            <TouchableOpacity onPress={handleNext} style={styles.btnNext}>
              <IconArrowRightDark />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text>Kumpulkan</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <QuizModal
        open={open}
        onYes={handleSubmit}
        onCancel={() => setOpen(false)}
      />
      <SoalModal
        open={openPeta}
        soal={orderIds}
        jawaban={jawaban}
        onPress={handlePeta}
        onSubmit={handleSubmit}
        handleClose={() => setOpenPeta(false)}
        goToIndex={(index) => {
          setSoalIndex(index);
        }}
      />
    </View>
  );
};

export default Soal;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContent: {
    padding: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: colors.button.disable.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
    textTransform: 'uppercase',
  },
  soal: {
    flex: 1,
    padding: 16,
  },
  choiceActive: {
    flexDirection: 'row',
    borderColor: colors.border,
    backgroundColor: colors.cardLight,
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  choice: {
    flexDirection: 'row',
    borderColor: colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: colors.button.disable.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceTxt: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: fonts.primary[400],
  },
  choiceImg: {
    flex: 1,
    height: 150,
    resizeMode: 'stretch',
  },
  footerContent: {
    padding: 16,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnAlert: {
    width: 50,
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
  },
  btnPrev: {
    width: 41,
    height: 41,
    borderRadius: 41 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.button.disable.background,
  },
  btnNext: {
    width: 41,
    height: 41,
    borderRadius: 41 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    width: '100%',
    height: 264,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  cardDesc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.text.subTitle,
    textAlign: 'center',
    width: 200,
    marginTop: 12,
    marginBottom: 30,
  },
  cardBtn: {
    width: 104,
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBtnTxt: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.primary[300],
  },
  cardBtnSec: {
    marginTop: 13,
    width: 60,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBtnTxtSec: {
    color: colors.text.subTitle,
    fontSize: 14,
    fontFamily: fonts.primary[300],
  },
  cardSoal: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerSoal: {
    padding: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.subTitle,
  },
  wrap: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  circleSoal: {
    width: 57,
    height: 57,
    borderRadius: 57 / 2,
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20 - 9,
  },
  btnSoal: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  circleSoalActive: {
    width: 57,
    height: 57,
    borderRadius: 57 / 2,
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20 - 9,
    backgroundColor: colors.cardLight,
  },
  btnActive: {
    position: 'absolute',
    right: 16,
    top: 30,
  },
  circleTxt: {
    fontSize: 18,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
});
