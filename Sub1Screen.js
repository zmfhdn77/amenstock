import React from 'react';
import {Alert, findNodeHandle, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'galio-framework';
import EachRound from './EachRound';
import {ReactNativeNumberFormat} from './Util';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {getItemFromAsync, setItemToAsync} from './AsyncStorageHelper';

export default class Sub1Screen extends React.Component<Props>{

    constructor(props) {
        super(props);
        
        this.scroll;

        getItemFromAsync('totalMoney')
        .then((result) => console.log("get result :", result))
        .catch((error) => console.log("실패:", error))

        this.state = {
            scroll: 0,
            totalMoney: (getItemFromAsync('totalMoney') === null) ? '' : String(getItemFromAsync('totalMoney')),
            moneyForItem:0,
            roundArray:[],
            isInputBoxShow: true,
            isCompleteButtonShow: false,
            isMoneyInputButtonShow: true,
            isMoneyForItemShow: false,
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
            isCompleteButtonShow: true,
            isMoneyForItemShow: true,
            isMoneyInputButtonShow: false,
            isInputBoxShow: false,
        })

        setItemToAsync('totalMoney', this.state.totalMoney);
        this.addRoundCard(this,
        1,
        this.state.moneyForItem * 0.6,
        this.state.moneyForItem * 0.4)            
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
            isInputBoxShow: true,
            isCompleteButtonShow: false,
            isMoneyForItemShow: false,
            isMoneyInputButtonShow: true,
            isInputBoxShow: true,
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

    _scrollToInput (reactNode: Input) {
        this.scroll.props.scrollIntoView(reactNode)
    }

    render() {
        let roundViewGroup = this.state.roundArray.map((item, key) =>
        {
            return(
                <View key = {key}>
                    {item}
                </View>
            );    
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

                {this.state.isMoneyForItemShow && <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목 비중</Text>
                    <ReactNativeNumberFormat value={this.state.moneyForItem} />
                </View>}

                <View style={styles.oneLine}>
                   {this.state.isMoneyInputButtonShow && <Button 
                        style={styles.button} 
                        onPress={()=>this.onPressMoneyInput()}> 투자금 입력 </Button>}
                    {this.state.isCompleteButtonShow && <Button
                        disabled={this.state.secondInputBoxDisabled}
                        style={styles.button}
                        onPress={()=>this.onEndRound()}>매도 완료</Button>}
                </View>

                <KeyboardAwareScrollView
                innerRef={ref => {
                    this.scroll = ref
                  }}>
                    {roundViewGroup}
                </KeyboardAwareScrollView>
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