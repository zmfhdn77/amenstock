import React from 'react';
import NumberFormat from 'react-number-format';
import {StyleSheet, Text} from 'react-native';

export function ReactNativeNumberFormat({ value }) {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        prefix={''}
        renderText={formattedValue => <Text style={styles.currencyText}>{formattedValue}</Text>} // <--- Don't forget this!
      />
    );
  }

const styles = StyleSheet.create({
    currencyText: {
        fontSize: 20,
        paddingLeft: 30,
    },
});