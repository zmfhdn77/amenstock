import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Input} from 'galio-framework';
import {ReactNativeNumberFormat} from './Util';
import {CheckBox, Card} from 'react-native-elements';

export default class EachRound extends React.Component<Props> {

    constructor(props) {
        super(props);

        const caller = this.props.caller;
        const roundIndex = this.props.roundIndex;
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
            roundIndex: roundIndex,
            firstChecked: firstChecked,
            secondChecked: secondChecked,
            firstSellChecked: this.props.firstSellChecked,
            secondSellChecked: this.props.secondSellChecked,
            firstBuy: firstBuy,
            secondBuy: secondBuy,
            currentMoney: currentMoney,
            firstSell: firstSell,
            secondSell: secondSell,
            totalSell: totalSell,
            bIsCompleted: bIsCompleted,
        };
    }

    updateRoundInfoToScreen() {
        const roundInfo = {
            firstChecked: this.state.firstChecked,
            secondChecked: this.state.secondChecked,
            firstBuy: this.state.firstBuy,
            secondBuy: this.state.secondBuy,
            firstSell: this.state.firstSell,
            secondSell: this.state.secondSell,
        }

        this.state.caller.updateCurrentRoundInfo(this.state.roundIndex, roundInfo);
    }

    onChangeFirstSell(firstSell) {
        // const totalSell = this.state.secondSell * 1.0 + firstSell * 1.0;

        this.setState({
            firstSell: firstSell,
        }, ()=>{this.updateRoundInfoToScreen()});
    }

    onChangeSecondSell(secondSell) {
        const totalSell = this.state.firstSell * 1.0 + secondSell * 1.0;

        this.setState({
            secondSell: secondSell,
        }, ()=>{this.updateRoundInfoToScreen()});
    }

    onFirstItemChecked() {
        const firstChecked = !this.state.firstChecked;
        const currentMoney = (firstChecked) ? this.state.currentMoney - this.state.firstBuy : this.state.currentMoney + this.state.firstBuy;
        
        this.setState({
            firstChecked: firstChecked,
            currentMoney: currentMoney,
        }, ()=>{this.updateRoundInfoToScreen()});
    }

    onSecondItemChecked() {
        const secondChecked = !this.state.secondChecked;
        const curMoney = (secondChecked) ? 0 : this.state.secondBuy;
        
        this.setState({
            secondChecked: secondChecked,
            currentMoney: curMoney,
        }, ()=>{this.updateRoundInfoToScreen()});
    }

    onFirstSellDone() {
        const firstSellChecked = !this.state.firstSellChecked;
        const firstSell = Number(this.state.firstSell);
        const totalSell = (firstSellChecked) ? 
                        Number(this.state.totalSell) + firstSell
                        : Number(this.state.totalSell) - firstSell;
        
        this.setState({
            firstSellChecked: firstSellChecked,
            totalSell: totalSell,
        }, ()=>{this.updateRoundInfoToScreen()});
    }

    onSecondSellDone() {
        const secondSellChecked = !this.state.secondSellChecked;
        const secondSell = Number(this.state.secondSell);
        const totalSell = (secondSellChecked) ? 
                        Number(this.state.totalSell) + secondSell
                        : Number(this.state.totalSell) - secondSell;
        
        this.setState({
            secondSellChecked: secondSellChecked,
            totalSell: totalSell,
        }, ()=>{this.updateRoundInfoToScreen()});
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
                <Card.Title containerStyle={{borderTopLeftRadius:5, padding:0}} style={styles.cardTitle} >Round {this.state.roundIndex}</Card.Title>
                <View style={styles.container}>
                    <View style={styles.fullLine}>
                        <Text style={styles.normalText}>매수 가능 금액 </Text>
                        <ReactNativeNumberFormat value = {this.state.currentMoney} />
                    </View>
                    <View style={styles.fullLine}>
                        <CheckBox
                            title='1차 매수'
                            containerStyle={{ padding:0, backgroundColor: "transparent", borderWidth: 0 }}
                            size={15}
                            center={true}
                            checked={this.state.firstChecked}
                            disabled={bIsFirstCheckboxDisabled}
                            onPress={()=>this.onFirstItemChecked()}/>
                        <ReactNativeNumberFormat value={this.state.firstBuy} />
                    </View>
            
                    <View style={styles.fullLine}>
                        <CheckBox
                            title='2차 매수'
                            containerStyle={{ padding:0, backgroundColor: "transparent", borderWidth: 0 }}
                            size={15}
                            checked={this.state.secondChecked}
                            disabled={bIsSecondCheckboxDisabled}
                            onPress={()=>this.onSecondItemChecked()} />
                        <ReactNativeNumberFormat value={this.state.secondBuy} />
                    </View>

                    <View style={styles.fullLine}>
                        <Text style={styles.normalText}>매도 완료 금액 </Text>
                        <ReactNativeNumberFormat value = {this.state.totalSell} />
                    </View>

                    <View style={styles.fullLine}>
                        <CheckBox
                            title='1차 매도'
                            containerStyle={{ padding:0, backgroundColor: "transparent", borderWidth: 0 }}
                            size={15}
                            center={true}
                            checked={this.state.firstSellChecked}
                            onPress={()=>this.onFirstSellDone()}/>
                        <Input
                            value={String(this.state.firstSell)}
                            returnKeyType='done'
                            type='numeric'
                            clearButtonMode='while-editing'
                            onChangeText={(newValue)=>this.onChangeFirstSell(newValue)}/>
                    </View>

                    <View style={styles.fullLine}>
                        <CheckBox
                            title='2차 매도'
                            containerStyle={{ padding:0, backgroundColor: "transparent", borderWidth: 0 }}
                            size={15}
                            center={true}
                            checked={this.state.secondSellChecked}
                            onPress={()=>this.onSecondSellDone()}/>
                        <Input
                            value={String(this.state.secondSell)}
                            returnKeyType='done'
                            type='numeric'
                            clearButtonMode='while-editing'
                            onChangeText={(newValue)=>this.onChangeSecondSell(newValue)}/>
                    </View>
                </View>
            </Card>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        
    },
    oneLine: {
        flexDirection: "row",
        alignItems:"center",
        paddingBottom: 10,
    },
    fullLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roundTitle: {
        alignItems: 'center',
        paddingBottom : 10,
    },
    inputBox: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    normalText: {
        fontSize: 15,
    },
    button: {
        width : 100,
        height: 40,
    }
});