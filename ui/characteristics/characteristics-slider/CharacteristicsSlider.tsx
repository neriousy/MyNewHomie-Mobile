import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CharacteristicsType } from '../../../providers/user-provider/types';

export default function CharacteristicsSlider({
  name,
  trait,
  value,
  marks,
  setValue,
  disabled,
}: {
  name: string;
  trait: keyof CharacteristicsType;
  value: number;
  marks: string[];
  setValue?: (value: any, name: keyof CharacteristicsType) => void;
  disabled?: boolean;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{name}</Text>
      <Slider
        step={1}
        value={value}
        onValueChange={setValue ? (value) => setValue(value, trait) : undefined}
        minimumValue={1}
        maximumValue={5}
        disabled={disabled}
      />
      <View style={styles.rowContainer}>
        <Text>{marks[0]}</Text>
        <Text>{marks[1]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerText: {
    fontWeight: 'bold',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
