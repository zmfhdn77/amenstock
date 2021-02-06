import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import {Button, Input} from 'galio-framework';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Sub1Screen extends React.Component<Props>{

    constructor(props) {
        super(props);

        this.state = {
            totalMoney: '',
        }
    }

    onStartRound() {
        this.props.navigation.navigate('종목 추가 매수', {
            totalMoney: this.state.totalMoney,
        })
    }

    onChangeTotalMoney(totalMoney) {
        const totalMoneyInt = Number(totalMoney);

        this.setState({
            totalMoney: totalMoney,
        });
    }

    onHistoryClicked() {
        this.props.navigation.navigate('종목 추가 매수', {
            totalMoney: this.state.totalMoney,
        })
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.cardTitle}>추가 매수 시뮬레이션</Text>
            <Card>
                <Card.Title>총 투자금</Card.Title>
            <Input
                value={String(this.state.totalMoney)}
                returnKeyType='done'
                type='numeric'
                clearButtonMode='while-editing'
                onChangeText={(newValue)=>this.onChangeTotalMoney(newValue)}
                placeholder="투자금 입력" />
            <Button
                style={styles.button}
                onPress={()=>this.onStartRound()}>시작</Button>
            </Card>
            
            <TouchableOpacity
                style={styles.historyButton}
                onPress={()=>this.onHistoryClicked()}>
                    <Text>[세종공업] Round 3 (21.02.04)</Text>
            </TouchableOpacity>
        </View>
           
        )
    }
}

const styles = StyleSheet.create({
    container: {
      height: 800,
      paddingLeft: 10,
      paddingTop: 20,
      backgroundColor: '#f5f5f5',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        height: 22,
    },
    normalText: {
        fontSize: 15,
        height: 22,
    },
    button: {
        width: 116,
        alignSelf: 'center',
    },
    historyButton: {
        height: 50,
        justifyContent: 'center',
    }
});  