import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'galio-framework';
import { ReactNativeNumberFormat } from './Util';

export default class Sub2Screen extends React.Component<Props> {
    constructor(props) {
        super(props);
        
        this.state = {
            totalMoney: '',
            ATargetIncome: '',
            AMount: '',
            ACurIncome: '',
            BTargetIncome: '',

            AMoney: '',
            AIncomeMoney: '',
            BIncomeMoney: '',
            DiffMoney: '',

            bIsValueShow: false,
        };
    }

    onChangeTotalMoney(totalMoney) {
        const totalMoneyInt = parseInt(totalMoney);

        this.setState({
            totalMoney: totalMoney,
        });
    }

    onChangeATargetIncome(value) {
        const ATargetIncome = parseInt(value);

        this.setState({
            ATargetIncome: ATargetIncome,
        })
    }

    onChangeAMount(value) {
        const AMount = parseInt(value);

        this.setState({
            AMount: AMount,
        })
    }

    onChangeACurIncome(value) {
        const ACurIncome = parseInt(value);

        this.setState({
            ACurIncome: ACurIncome,
        })
    }

    onChangeBTargetIncome(value) {
        const BTargetIncome = parseInt(value);

        this.setState({
            BTargetIncome: BTargetIncome,
        })
    }

    onPressCalStart() {
        const AMoney = Math.floor(this.state.totalMoney * 0.25);
        const ATargetIncome = this.state.ATargetIncome / 100;
        const AMount = this.state.AMount / 100;
        const ACurIncome = this.state.ACurIncome / 100;
        const BTargetIncome = this.state.BTargetIncome / 100;

        const AIncomeMoney = AMoney * ATargetIncome * AMount;
        const BIncomeMoney = AMoney * AMount * (1 + ACurIncome) *  (1 + BTargetIncome) - AMoney * AMount;
        const DiffMoney = BIncomeMoney - AIncomeMoney;

        this.setState({
            AMoney: AMoney,
            AIncomeMoney: AIncomeMoney,
            BIncomeMoney: BIncomeMoney,
            DiffMoney: DiffMoney,
            bIsValueShow: true,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>총 투자금</Text>
                    <View style={styles.inputBox}>
                        <Input
                            type='decimal-pad'
                            clearButtonMode='always'
                            onChangeText={(newValue)=>this.onChangeTotalMoney(newValue)}/>
                    </View>
                </View>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목A 목표 수익률 (%)</Text>
                    <View style={styles.inputBox}>
                        <Input
                            type='decimal-pad'
                            clearButtonMode='always'
                            onChangeText={(newValue)=>this.onChangeATargetIncome(newValue)}/>
                    </View>
                </View>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목A 매도 비율 (%)</Text>
                    <View style={styles.inputBox}>
                        <Input
                            type='decimal-pad'
                            clearButtonMode='always'
                            onChangeText={(newValue)=>this.onChangeAMount(newValue)}/>
                    </View>
                </View>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목A 현재 수익률 (%)</Text>
                    <View style={styles.inputBox}>
                        <Input
                            type='decimal-pad'
                            clearButtonMode='always'
                            onChangeText={(newValue)=>this.onChangeACurIncome(newValue)}/>
                    </View>
                </View>
                <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목B 목표 수익률 (%)</Text>
                    <View style={styles.inputBox}>
                        <Input
                            type='decimal-pad'
                            clearButtonMode='always'
                            onChangeText={(newValue)=>this.onChangeBTargetIncome(newValue)}/>
                    </View>
                </View>
                <Button
                    onPress={()=>this.onPressCalStart()}
                    >수익금 계산</Button>
                {this.state.bIsValueShow && <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목A 투자금</Text>
                    <ReactNativeNumberFormat value={this.state.AMoney} />
                </View>}
                {this.state.bIsValueShow && <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목A 유지시 수익금</Text>
                    <ReactNativeNumberFormat value={this.state.AIncomeMoney} />
                </View>}
                {this.state.bIsValueShow && <View style={styles.oneLine}>
                    <Text style={styles.normalText}>종목B 전환시 수익금</Text>
                    <ReactNativeNumberFormat value={this.state.BIncomeMoney} />
                </View>}
                {this.state.bIsValueShow && <View style={styles.oneLine}>
                    <Text style={styles.normalText}>수익금 차이</Text>
                    <ReactNativeNumberFormat value={this.state.DiffMoney} />
                </View>}
            </View>
    )};
}

const styles = StyleSheet.create ({
    container: {
        flex:1,
        justifyContent: 'center',
        padding: 30,
    },
    oneLine: {
        flexDirection: "row",
        alignItems:"center",
        paddingBottom: 10,
    },
    inputBox: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    normalText: {
        fontSize: 20,
    },
});