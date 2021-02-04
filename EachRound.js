import React from 'react';
import {findNodeHandle, StyleSheet, Event, View} from 'react-native';
import {Checkbox, Text, Input} from 'galio-framework';
import {Button} from 'galio-framework';
import {ReactNativeNumberFormat} from './Util';
import {Card} from 'react-native-elements';

export default class EachRound extends React.Component<Props> {

    constructor(props) {
        super(props);

        const caller = this.props.caller;
        const roundCount = this.props.roundCount;
        const firstChecked = this.props.firstChecked;
        const secondChecked = this.props.secondChecked;
        const firstBuy = Math.floor(this.props.firstBuy);
        const secondBuy = Math.floor(this.props.secondBuy);
        let currentMoney = firstBuy + secondBuy;
        currentMoney = (firstChecked) ? currentMoney - firstBuy : currentMoney;
        currentMoney = (secondChecked) ? currentMoney - secondBuy : currentMoney;
        const firstSell = this.props.firstSell;
        const secondSell = this.props.secondSell;
        const totalSell = firstSell + secondSell;
        const bIsCompleted = this.props.bIsCompleted;

        this.state = {
            caller: caller,
            roundCount: roundCount,
            firstChecked: firstChecked,
            secondChecked: secondChecked,
            firstBuy: firstBuy,
            secondBuy: secondBuy,
            currentMoney: currentMoney,
            firstSell: firstSell,
            secondSell: secondSell,
            totalSell: totalSell,
            bIsCompleted: bIsCompleted,
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
        const firstChecked = !this.state.firstChecked;
        const currentMoney = (firstChecked) ? this.state.currentMoney - this.state.firstBuy : this.state.currentMoney + this.state.firstBuy;
        
        this.setState({
            firstChecked: firstChecked,
            currentMoney: currentMoney,
        })
    }

    onSecondItemChecked() {
        const secondChecked = !this.state.secondChecked;
        const curMoney = (secondChecked) ? 0 : this.state.secondBuy;
        
        this.setState({
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
            bIsCompleted: true,
        })

        this.state.caller.addRoundCard(this.state.caller, this.state.roundCount+1, firstBuy, secondBuy);
        return;
    }

    render() {
        const bIsFirstCheckboxDisabled = (this.state.bIsCompleted || this.state.secondChecked);
        const bIsSecondCheckboxDisabled = (this.state.bIsCompleted || !this.state.firstChecked);
        const bIsFirstInputBoxEditable = (!this.state.bIsCompleted && this.state.firstChecked);
        const bIsSecondInputBoxEditable = (!this.state.bIsCompleted && 
                                            this.state.firstChecked &&
                                            this.state.firstSell != 0);
        const bIsButtonShow = (!this.state.bIsCompleted && this.state.totalSell != 0);

        return (
            <Card>
                <Card.Title>[Round {this.state.roundCount}]</Card.Title>
                <Card.Divider />
                <View style={styles.container}>
                    <View style={styles.oneLine}>
                        <View style={styles.lineBox}>
                            <View style={styles.oneLine}>
                                <Checkbox
                                    initialValue={this.state.firstChecked}
                                    disabled={bIsFirstCheckboxDisabled}
                                    onChange={()=>this.onFirstItemChecked()} 
                                    color="primary" 
                                    label="1차 매수"/>
                                <ReactNativeNumberFormat value={this.state.firstBuy} />
                            </View>
                    
                            <View style={styles.oneLine}>
                                <Checkbox
                                    initialValue={this.state.secondChecked}
                                    disabled={bIsSecondCheckboxDisabled}
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

                    <Card.Divider />
                    {this.state.firstChecked && <View style={styles.oneLine}>
                        <Text style={styles.normalText}>1차 매도</Text>
                        <View style={styles.inputBox}>
                            <Input
                                value={String(this.state.firstSell)}
                                editable={bIsFirstInputBoxEditable}
                                type='numeric'
                                onChangeText={(newValue)=>this.onChangeFirstSell(newValue)}
                                placeholder="1차 매도 미실시" />
                        </View>
                    </View>}
                    {this.state.firstChecked && <View style={styles.oneLine}>
                        <Text style={styles.normalText}>2차 매도</Text>
                        <View style={styles.inputBox}>
                            <Input
                                value={String(this.state.secondSell)}
                                editable={bIsSecondInputBoxEditable}
                                type='numeric'
                                onChangeText={(newValue)=>this.onChangeSecondSell(newValue)}
                                placeholder={"2차 매도 미실시"} />
                        </View>
                    </View>}
                    {this.state.firstChecked && <View style={styles.oneLine}>
                        <Text style={styles.normalText}>매도금 합계</Text>
                        <ReactNativeNumberFormat value={this.state.totalSell} />
                    </View>}

                    <View style={styles.oneLine}>
                        {bIsButtonShow && <Button
                            style={styles.button}
                            onPress={()=>this.onNextRound()}>재매수 발생</Button>}
                    </View>
                </View>
            </Card>
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