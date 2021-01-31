import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, Text, Input} from 'galio-framework';
import {Button} from 'galio-framework';

export default class EachRound extends React.Component<Props> {

    constructor(props) {
        super(props);

        const curMoney = this.props.firstBuy + this.props.secondBuy;
        this.state = {
            firstChecked: false,
            secondChecked: false,

            firstBuy: this.props.firstBuy,
            secondBuy: this.props.secondBuy,
            currentMoney: curMoney,
            totalSell: 0,
        };
    }

    onChangeFirstSell(firstSell) {
        this.setState({
            totalSell: this.state.totalSell + firstSell * 1.0,
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.oneLine}>
                    <View style={styles.roundTitle}>
                        <Text h6>Round 1</Text>
                    </View>
                    <View style={styles.lineBox}>
                        <View style={styles.oneLine}>
                            <Checkbox 
                                onChange={()=>this.onFirstItemChecked()} 
                                color="primary" 
                                label="1차 매수"/>
                            <Text style={styles.normalText}>{this.state.firstBuy}</Text>
                            <Text style={styles.normalText}>(15%)</Text>
                        </View>
                
                        <View style={styles.oneLine}>
                            <Checkbox 
                                onChange={()=>this.onSecondItemChecked()}
                                color="primary" 
                                label="2차 매수"/>
                            <Text style={styles.normalText}>{this.state.secondBuy}</Text>
                            <Text style={styles.normalText}>(10%)</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>현금 보유 금액</Text>
                    <Text style={styles.normalText}>{this.state.currentMoney}</Text>
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
                            onChangeText={(newValue)=>this.onChangeSecondSell(newValue)}
                            placeholder="2차 매도금 입력" />
                    </View>
                </View>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>매도금 합계</Text>
                    <Text style={styles.normalText}>{this.state.totalSell}</Text>
                </View>

                <View style={styles.oneLine}>
                    <Button style={styles.button}>재매수 발생</Button>
                    <Button style={styles.button}>매도 완료</Button>
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