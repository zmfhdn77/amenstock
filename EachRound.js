import React from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {Checkbox, Text, Input} from 'galio-framework';
import {Button} from 'galio-framework';
import {ReactNativeNumberFormat} from './Util';

export default class EachRound extends React.Component<Props> {

    constructor(props) {
        super(props);

        const curMoney = this.props.firstBuy + this.props.secondBuy;

        this.state = {
            roundCount: this.props.roundCount,
            firstChecked: false,
            secondChecked: false,

            firstBuy: this.props.firstBuy,
            secondBuy: this.props.secondBuy,

            currentMoney: curMoney,

            caller: this.props.caller,

            firstSell: 0,
            secondSell: 0,
            totalSell: 0,
        };
    }

    onChangeFirstSell(firstSell) {
        const totalSell = this.state.secondSell * 1.0 + firstSell * 1.0;
        this.setState({
            firstSell: firstSell,
            totalSell: totalSell,
        })
    }

    onChangeSecondSell(secondSell) {
        const totalSell = this.state.firstSell * 1.0 + secondSell * 1.0;
        this.setState({
            secondSell: secondSell,
            totalSell: totalSell,
        })
    }

    onFirstItemChecked() {
        const curMoney = (this.state.firstChecked) ? this.state.currentMoney + this.state.firstBuy : this.state.currentMoney - this.state.firstBuy;
        this.setState({
            firstChecked: !this.state.firstChecked,
            currentMoney: curMoney,
        })
    }

    onSecondItemChecked() {
        const curMoney = (this.state.secondChecked) ? this.state.currentMoney + this.state.secondBuy : this.state.currentMoney - this.state.secondBuy;
        this.setState({
            secondChecked: !this.state.secondChecked,
            currentMoney: curMoney,
        })
    }

    onNextRound() {
        let firstBuy, secondBuy;

        if(this.state.secondChecked) {
            firstBuy = this.state.totalSell * 0.6;
            secondBuy = this.state.totalSell * 0.4;
        }
        else {
            firstBuy = this.state.totalSell;
            secondBuy = this.state.currentMoney;
        }

        this.state.caller.addRoundCard(this.state.caller, this.state.roundCount+1, firstBuy, secondBuy);
        return;
    }

    onEndRound() {
        Alert.alert(
            "거래 완료",
            "거래가 완료되었습니다. 처음으로 돌아갑니다.",
            [
              { text: "OK", onPress: () => this.state.caller.initRoundCard() }
            ],
            { cancelable: false }
          );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.oneLine}>
                    <View style={styles.roundTitle}>
                        <Text h6>Round {this.state.roundCount}</Text>
                    </View>
                    <View style={styles.lineBox}>
                        <View style={styles.oneLine}>
                            <Checkbox 
                                onChange={()=>this.onFirstItemChecked()} 
                                color="primary" 
                                label="1차 매수"/>
                            <ReactNativeNumberFormat value={this.state.firstBuy} />
                        </View>
                
                        <View style={styles.oneLine}>
                            <Checkbox
                                disabled={!this.state.firstChecked}
                                onChange={()=>this.onSecondItemChecked()}
                                color="primary" 
                                label="2차 매수"/>
                            <ReactNativeNumberFormat value={this.state.secondBuy} />
                        </View>
                    </View>
                </View>

                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>현금 보유 금액</Text>
                    <ReactNativeNumberFormat value={this.state.currentMoney} />
                </View>

                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>1차 매도</Text>
                    <View style={styles.inputBox}>
                        <Input
                            type='numeric'
                            onChangeText={(newValue)=>this.onChangeFirstSell(newValue)}
                            placeholder="1차 매도금 입력" />
                    </View>
                </View>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>2차 매도</Text>
                    <View style={styles.inputBox}>
                        <Input
                            editable={this.state.firstSell != 0}
                            type='numeric'
                            onChangeText={(newValue)=>this.onChangeSecondSell(newValue)}
                            placeholder={(this.state.firstSell != 0) ? "2차 매도금 입력" : "1차 매도 미실시"} />
                    </View>
                </View>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>매도금 합계</Text>
                    <Text style={styles.normalText}>{this.state.totalSell}</Text>
                </View>

                <View style={styles.oneLine}>
                    <Button 
                        style={styles.button}
                        onPress={()=>this.onNextRound()}>재매수 발생</Button>
                    <Button 
                        style={styles.button}
                        onPress={()=>this.onEndRound()}>매도 완료</Button>
                </View>
            </View>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    oneLine: {
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "flex-start",
    },
    roundTitle: {
        justifyContent: "flex-start",
        flex: 1,
    },
    lineBox: {
        flex:4,
    },
    inputBox: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    normalText: {
        fontSize: 20,
    },
    button: {
        width : 100,
        height: 40,
    }
});