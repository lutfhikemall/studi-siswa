import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MapelCategory} from '../../../../components';

const Category = ({navigation}) => {
  const category = [
    {name: 'ujian', screen: 'Ujian'},
    {name: 'konsultasi', screen: 'Konsultasi'},
    {name: 'meeting', screen: 'Meeting'},
  ];

  return (
    <View style={styles.root}>
      {category.map((item, index) => {
        return (
          <MapelCategory
            key={index}
            category={item.name}
            onPress={() => navigation.navigate(item.screen)}
          />
        );
      })}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
