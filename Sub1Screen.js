import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'galio-framework';
import EachRound from './EachRound';
import {ReactNativeNumberFormat} from './Util';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {getItemFromAsync, setItemToAsync} from './AsyncStorageHelper';
import { ScrollView } from 'react-native-gesture-handler';

export default class Sub1Screen extends React.Component<Props>{

    constructor(props) {
        super(props);
        
        this.scroll;

        this.state = {
            totalMoney: 0,
            moneyForItem:0,

            roundCount: 0,
            round:[],

            isInputBoxShow: true,
            isMoneyInputButtonShow: true,
            isMoneyForItemShow: false,
            isNextRoundButtonDisabled: true,
        };
    }

    onChangeTotalMoney(totalMoney) {
        const totalMoneyInt = parseInt(totalMoney);
        const moneyForItem = Math.floor(totalMoneyInt * 0.25)

        this.setState({
            totalMoney: totalMoney,
            moneyForItem: moneyForItem,
        });
    }

    onPressMoneyInput() {
        this.setState({
            isMoneyForItemShow: true,
            isMoneyInputButtonShow: false,
            isInputBoxShow: false,
        })

        const firstBuy = this.state.moneyForItem * 0.6;
        const secondBuy = this.state.moneyForItem * 0.4;
        this.addRoundCard(firstBuy, secondBuy);
    }

    addRoundCard(firstBuy, secondBuy) {

        let roundItem = {
            firstBuy: firstBuy,
            secondBuy: secondBuy,
            firstChecked: false,
            secondChecked: false,
            firstSell : 0,
            secondSell : 0
        }

        this.setState({
            round: [...this.state.round,roundItem],
            roundCount: this.state.roundCount+1,
        })
    }

    saveCurrentStateToStorage() {
        console.log("saveCurrentStateToStorage");

        const currentState = {
            totalMoney : this.state.totalMoney,
            data : 
            [
                {
                    name : "종목A",
                    roundCount : this.state.roundCount,
                    round : this.state.round,
                }
            ]
        }

        setItemToAsync('sub1ScreenState', currentState);
    }

    initRoundCard() {
        this.setState({
            totalMoney : 0,
            moneyForItem: 0,

            roundCount: 0,
            round: [],

            isInputBoxShow: true,
            isMoneyForItemShow: false,
            isMoneyInputButtonShow: true,
            isNextRoundButtonDisabled: true,
        }, this.saveCurrentStateToStorage());
    }

    onNextRound() {
        const currentRoundInfo = this.state.round[this.state.roundCount - 1];
        const currentTotalSell = Number(currentRoundInfo.firstSell) + Number(currentRoundInfo.secondSell);

        let firstBuy, secondBuy;

        if(currentRoundInfo.secondChecked) {
            firstBuy = currentTotalSell * 0.6;
            secondBuy = currentTotalSell * 0.4;
        }
        else {
            firstBuy = currentTotalSell;
        }

        this.addRoundCard(firstBuy, secondBuy);

        return;
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

    updateCurrentRoundInfo(roundIndex, roundInfo) {
        let currentRoundInfo = this.state.round;
        currentRoundInfo[roundIndex -1] = roundInfo;

        const isNextRoundButtonDisabled = (roundInfo.firstSell == 0);
        
        this.setState({
            round: currentRoundInfo,
            isNextRoundButtonDisabled: isNextRoundButtonDisabled,
        })
    }

    componentDidMount() {
        getItemFromAsync('sub1ScreenState')
        .then((result) => {
            if(result === null || result.totalMoney == 0) {
                console.log("Empty Data");
            }
            else {
                this.setState({
                    isMoneyInputButtonShow: false,
                    totalMoney: result.totalMoney,
                    moneyForItem: Math.floor(result.totalMoney * 0.25),
                    roundCount: result.data[0].roundCount,
                    round: result.data[0].round,
                });
            }
        })
        .catch(() => {
            console.log("Error");
        })
    }

    componentWillUnmount() {
        this.saveCurrentStateToStorage();
    }

    render() {

        if(this.state.moneyForItem != 0)
        {
            this.isMoneyForItemShow  = true;
        }

        let roundViewGroup = this.state.round.map((item, key) =>
        {
            const bIsCompleted = ((key+1) != this.state.roundCount);

            return(
                <View key = {key}>
                    <EachRound caller={this} 
                        roundIndex={key+1}
                        firstBuy={item.firstBuy}
                        secondBuy={item.secondBuy}
                        firstChecked={item.firstChecked}
                        secondChecked={item.secondChecked}
                        firstSell={item.firstSell}
                        secondSell={item.secondSell}
                        bIsCompleted={bIsCompleted}/>
                </View>
            )
        });

        return (

            <View style={styles.container}>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>총 투자금</Text>
                    {(this.state.isInputBoxShow) ? <View style={styles.inputBox}>
                        <Input
                            value={String(this.state.totalMoney)}
                            type='decimal-pad'
                            clearButtonMode='always'
                            onChangeText={(newValue)=>this.onChangeTotalMoney(newValue)}
                            placeholder="투자금 입력" />
                    </View>
                    : <ReactNativeNumberFormat value={this.state.totalMoney} />}
                </View>

                {this.isMoneyForItemShow && <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목 비중</Text>
                    <ReactNativeNumberFormat value={this.state.moneyForItem} />
                </View>}

                <View style={styles.oneLine}>
                   {(this.state.isMoneyInputButtonShow) ? <Button 
                        style={styles.button} 
                        onPress={()=>this.onPressMoneyInput()}> 투자금 입력 </Button>
                        : <Button
                            disabled={this.state.isNextRoundButtonDisabled}
                            style={styles.button}
                            onPress={()=>this.onNextRound()}>재매수 발생</Button>}

                    {!this.state.isMoneyInputButtonShow && <Button
                        style={styles.button}
                        onPress={()=>this.onEndRound()}>매도 완료</Button>}
                </View>

                <ScrollView ref="scrollView"
                    onContentSizeChange={(width,height) => 
                        this.refs.scrollView.scrollTo({y:height})}>
                    {roundViewGroup}
                </ScrollView>
            </View>
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