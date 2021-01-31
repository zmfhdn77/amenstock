import React from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'galio-framework';
import EachRound from './EachRound';
import {ReactNativeNumberFormat} from './Util';


export default class MainPage extends React.Component<Props>{

    constructor(props) {
        super(props);
        this.state = {
            moneyForItem:0,
            roundArray:[],
        };
    }

    onChangeTotalMoney(totalMoney) {
        this.setState({
            moneyForItem: totalMoney * 0.25,
        });
    }

    addRoundCard(caller, roundCount, firstBuy, secondBuy) {
    
        this.setState({
            roundArray: [...this.state.roundArray, <EachRound caller={caller} roundCount={roundCount} firstBuy={firstBuy} secondBuy={secondBuy}/>],
        })
    }

    initRoundCard() {
        this.setState({
            roundArray: [],
            moneyForItem: 0,
        })
    }

    render() {
        let roundViewGroup = this.state.roundArray.map((item) =>
        {
            return(
                <View style={styles.roundCard}>
                    {item}
                </View>
            );    
        });

        return (

            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>총 투자금</Text>
                    <View style={styles.inputBox}>
                        <Input
                            type='numeric'
                            onChangeText={(newValue)=>this.onChangeTotalMoney(newValue)}
                            placeholder="투자금 입력" />
                    </View>
                </View>

                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목 비중</Text>
                    <ReactNativeNumberFormat value={this.state.moneyForItem} />
                </View>

                <Button 
                    style={styles.button} 
                    onPress={()=>this.addRoundCard(this, 1, this.state.moneyForItem * 0.6, this.state.moneyForItem * 0.4)}> 투자금 입력 </Button>
                    <ScrollView>
                        {roundViewGroup}
                    </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
      backgroundColor: '#fff',
    },
    roundCard: {
        paddingTop: 20,
    },
    oneLine: {
        flexDirection: "row",
        alignItems:"center",
    },
    normalText: {
        fontSize: 20,
    },
    inputBox: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    button: {
        width : 100,
        height: 40,
    }
});  