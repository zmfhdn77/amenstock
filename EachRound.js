import React from 'react';
import {StyleSheet, View} from 'react-native';
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

            firtsCheckBoxDisabled: false,
            secondCheckBoxDisabled: true,

            firstBuy: this.props.firstBuy,
            secondBuy: this.props.secondBuy,

            firstInputBoxEditable: true,
            secondInputBoxEditable: false,
           
            buttonDisabled: true,

            currentMoney: curMoney,

            caller: this.props.caller,

            firstSell: 0,
            secondSell: 0,
            totalSell: 0,
        };
    }

    onChangeFirstSell(firstSell) {
        const totalSell = this.state.secondSell * 1.0 + firstSell * 1.0;
        
        let secondInputBoxEditable = false;
        let buttonDisabled = true;

        if(totalSell != 0) {
            secondInputBoxEditable = true;
            buttonDisabled = false;
        }

        this.setState({
            secondInputBoxEditable: secondInputBoxEditable,
            buttonDisabled: buttonDisabled,
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
        const firstChecked = !this.state.firstChecked;
        const curMoney = (firstChecked) ? this.state.currentMoney - this.state.firstBuy : this.state.currentMoney + this.state.firstBuy;
        const secondCheckBoxDisabled = !firstChecked;
        
        this.setState({
            secondCheckBoxDisabled: secondCheckBoxDisabled,
            firstChecked: firstChecked,
            currentMoney: curMoney,
        })
    }

    onSecondItemChecked() {
        const secondChecked = !this.state.secondChecked;
        const curMoney = (secondChecked) ? this.state.currentMoney - this.state.secondBuy : this.state.currentMoney + this.state.secondBuy;
        const firtsCheckBoxDisabled = secondChecked;
        
        this.setState({
            firtsCheckBoxDisabled: firtsCheckBoxDisabled,
            secondChecked: secondChecked,
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

        this.setState({
            firtsCheckBoxDisabled: true,
            secondCheckBoxDisabled: true,

            firstInputBoxEditable: false,
            secondInputBoxEditable: false,
           
            buttonDisabled: true,
        })

        this.state.caller.addRoundCard(this.state.caller, this.state.roundCount+1, firstBuy, secondBuy);
        return;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.roundTitle}>
                    <Text h6>[Round {this.state.roundCount}]</Text>
                </View>
                <View style={styles.oneLine}>
                    <View style={styles.lineBox}>
                        <View style={styles.oneLine}>
                            <Checkbox
                                disabled={this.state.firtsCheckBoxDisabled}
                                onChange={()=>this.onFirstItemChecked()} 
                                color="primary" 
                                label="1차 매수"/>
                            <ReactNativeNumberFormat value={this.state.firstBuy} />
                        </View>
                
                        <View style={styles.oneLine}>
                            <Checkbox
                                disabled={this.state.secondCheckBoxDisabled}
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
                            editable={this.state.firstInputBoxEditable}
                            type='numeric'
                            onChangeText={(newValue)=>this.onChangeFirstSell(newValue)}
                            placeholder="1차 매도금 입력" />
                    </View>
                </View>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>2차 매도</Text>
                    <View style={styles.inputBox}>
                        <Input
                            editable={this.state.secondInputBoxEditable}
                            type='numeric'
                            onChangeText={(newValue)=>this.onChangeSecondSell(newValue)}
                            placeholder={(this.state.secondInputBoxEditable) ? "2차 매도금 입력" : "1차 매도 미실시"} />
                    </View>
                </View>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>매도금 합계</Text>
                    <ReactNativeNumberFormat value={this.state.totalSell} />
                </View>

                <View style={styles.oneLine}>
                    <Button
                        disabled={this.state.buttonDisabled}
                        style={styles.button}
                        onPress={()=>this.onNextRound()}>재매수 발생</Button>
                </View>
            </View>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20
    },
    oneLine: {
        flexDirection: "row",
        alignItems:"center",
        paddingBottom: 10,
    },
    roundTitle: {
        alignItems: 'center',
        paddingBottom : 10,
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