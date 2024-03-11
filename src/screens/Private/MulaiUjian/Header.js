import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconMenu, IconPlay} from '../../../assets';
import {functions} from '../../../context';
import {colors, fonts, useTimer} from '../../../utils';

const Header = ({ujian, hasilUjian, onPressPeta}) => {
  const [milisecondstart] = useState(
    hasilUjian.started_at && hasilUjian.started_at.toMillis(),
  );

  const [milisecondend] = useState(Date.now());

  const {countDownStr, countDownSeconds, stopTimer} = useTimer(
    milisecondstart,
    milisecondend,
    ujian.waktu,
  );

  useEffect(() => {
    if (countDownSeconds <= 0) {
      const handleEndKuis = async (e) => {
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

      stopTimer();
      handleEndKuis();
    }
  }, [countDownSeconds, hasilUjian.id, stopTimer]);

  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <IconPlay />
      </TouchableOpacity>
      {countDownSeconds > 0 && <Text style={styles.timer}>{countDownStr}</Text>}
      {countDownSeconds <= 0 && <Text style={styles.timer}>Waktu Habis</Text>}
      <TouchableOpacity onPress={onPressPeta}>
        <IconMenu />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timer: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.primary[600],
  },
});
