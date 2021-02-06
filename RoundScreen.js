import React from 'react';
import {Dimensions, Alert, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'galio-framework';
import EachRound from './EachRound';
import {ReactNativeNumberFormat} from './Util';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {getItemFromAsync, setItemToAsync} from './AsyncStorageHelper';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Math.round(Dimensions.get('window').height);

export default class RoundScreen extends React.Component<Props>{

    constructor(props) {
        super(props);
        
        this.scrollRef = React.createRef();
        const totalMoney = this.props.route.params.totalMoney;
        const moneyForItem = Math.floor(totalMoney * 0.25);

        this.state = {
            totalMoney: totalMoney,
            moneyForItem: moneyForItem,

            roundCount: 0,
            round:[],

            isInputBoxShow: true,
            isMoneyInputButtonShow: true,
            isMoneyForItemShow: false,
            isNextRoundButtonDisabled: true,
        };
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
            secondBuy = currentRoundInfo.secondBuy;
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


        const firstBuy = Math.floor(this.state.moneyForItem * 0.6);
        const secondBuy = Math.floor(this.state.moneyForItem * 0.4);
        
        this.addRoundCard(firstBuy, secondBuy);

        // getItemFromAsync('sub1ScreenState')
        // .then((result) => {
        //     if(result === null || result.totalMoney == 0) {
        //         console.log("Empty Data");
        //     }
        //     else {
        //         this.setState({
        //             isMoneyInputButtonShow: false,
        //             totalMoney: result.totalMoney,
        //             moneyForItem: Math.floor(result.totalMoney * 0.25),
        //             roundCount: result.data[0].roundCount,
        //             round: result.data[0].round,
        //         });
        //     }
        // })
        // .catch(() => {
        //     console.log("Error");
        // })
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

            <KeyboardAwareScrollView 
            style={{flexGrow:1}} 
            enableOnAndroid={true}
            scrollEnabled={false}>   

                <View style={styles.container}>
                    <View style={styles.fullLine}>
                        <Text style={styles.normalText}>총 투자금</Text>
                        <ReactNativeNumberFormat value={this.state.totalMoney} />
                    </View>

                    <View style={styles.fullLine}>
                        <Text style={styles.normalText}>종목 비중</Text>
                        <ReactNativeNumberFormat value={this.state.moneyForItem} />
                    </View>

                    <ScrollView
                        ref={this.scrollRef}
                        onContentSizeChange={() => {
                            this.scrollRef.current.scrollToEnd({animated: true})}
                        }>
                        {roundViewGroup}
                    </ScrollView>

                    <View style={styles.oneLine}>
                        <Button
                            style={styles.button}
                            onPress={()=>this.onNextRound()}>추가 매수</Button>

                        <Button
                            style={styles.button}
                            onPress={()=>this.onEndRound()}>매도 완료</Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      height: 800,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#f5f5f5',
    },
    oneLine: {
        flexDirection: "row",
        alignItems:"center",
    },
    fullLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    normalText: {
        fontSize: 15,
    },
    inputBox: {
    },
    completeButton: {
        alignItems: "flex-end",
    },
});  