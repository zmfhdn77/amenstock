import React from 'react';
import NumberFormat from 'react-number-format';
import {StyleSheet, Text} from 'react-native';
import CurrencyInput from 'react-native-currency-input';

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

// export function CurrencyInputBox(caller, initValue,) {
//     console.log("initInput : " + initValue);
//     const [value, setValue] = React.useState(this.props.initValue); // can also be null
  
//     return (
//       <CurrencyInput
//         value={value}
//         onChangeValue={setValue}
//         style={styles.inputBasic}
//         delimiter=","
//         separator="."
//         type='numeric'
//         precision={0}
//         onChangeText={(formattedValue) => {

//         }}
//       />
//     );
//   }

const styles = StyleSheet.create({
    currencyText: {
        fontSize: 20,
        paddingLeft: 30,
    },
    inputBasic: {
        marginVertical: 8,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#cdcdcd',
        paddingHorizontal: 12,
        height: 54,
    },
});