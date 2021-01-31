import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'galio-framework';
import EachRound from './EachRound';


export default class MainPage extends React.Component<Props>{

    constructor(props) {
        super(props);
        this.state = {
            moneyForItem:0,
        };
    }

    onChangeTotalMoney(totalMoney) {
        this.setState({
            moneyForItem: totalMoney * 0.25,
        });
    }

    addRoundCard(firstBuy, secondBuy) {
        return <EachRound firstBuy={firstBuy} secondBuy={secondBuy}/>;
    }

    render() {
        let roundCardView = this.addRoundCard(this.state.moneyForItem * 0.6, this.state.moneyForItem * 0.4);
        return (
            <View style={styles.container}>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>총 투자금</Text>
                    <View style={styles.inputBox}>
                        <Input
                            type='numeric'
                            onChangeText={(newValue)=>this.onChangeTotalMoney(newValue)}
                            placeholder="투자금 입력" />
                    </View>
                    <Text style={styles.normalText}>(100%)</Text>
                </View>

                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목 비중</Text>
                    <Text style={styles.normalText}>{this.state.moneyForItem}</Text>
                    <Text style={styles.normalText}>(25%)</Text>
                </View>

                <Button 
                    style={styles.button} 
                    onPress={()=>this.addRoundCard()}> 투자금 입력 </Button>

                {roundCardView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    oneLine: {
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "flex-start",
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