import React from 'react';
import {Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'galio-framework';
import EachRound from './EachRound';
import {ReactNativeNumberFormat} from './Util';


export default class MainPage extends React.Component<Props>{

    constructor(props) {
        super(props);
        
        this.state = {
            totalMoney:0,
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
            totalMoney: 0,
            roundArray: [],
            moneyForItem: 0,
        })
    }

    onEndRound() {
        Alert.alert(
            "거래 완료",
            "거래가 완료되었습니다. 처음으로 돌아갑니다.",
            [
              { text: "OK", onPress: () => this.initRoundCard() }
            ],
            { cancelable: false }
          );
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
                <View style={styles.completeButton}>
                    
                </View>

                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>총 투자금</Text>
                    <View style={styles.inputBox}>
                        <Input
                            value={this.state.totalMoney}
                            type='numeric'
                            onChangeText={(newValue)=>this.onChangeTotalMoney(newValue)}
                            placeholder="투자금 입력" />
                    </View>
                </View>

                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목 비중</Text>
                    <ReactNativeNumberFormat value={this.state.moneyForItem} />
                </View>

                <View style={styles.oneLine}>
                    <Button 
                        style={styles.button} 
                        onPress={()=>this.addRoundCard(this, 1, this.state.moneyForItem * 0.6, this.state.moneyForItem * 0.4)}> 투자금 입력 </Button>
                    <Button
                        disabled={this.state.secondInputBoxDisabled}
                        style={styles.button}
                        onPress={()=>this.onEndRound()}>매도 완료</Button>
                </View>

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
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 100,
      backgroundColor: '#fff',
    },
    roundCard: {
        backgroundColor: '#8fbc8f',
        paddingBottom: 10,
        borderTopLeftRadius: 10, // to provide rounded corners
        borderTopRightRadius: 10, // to provide rounded corners
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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

    },
    completeButton: {
        alignItems: "flex-end",
    },
});  