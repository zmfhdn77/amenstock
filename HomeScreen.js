import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import {Button} from 'galio-framework';

export default class HomeScreen extends React.Component<Props> {
    render() {
        return (
        
        <ImageBackground source={require('./assets/amenstock_logo.png')} style={styles.bgImage}>
            <View style={styles.container}>
                <Button 
                onPress={() => this.props.navigation.navigate('추가 매수 시뮬레이션')}>
                추가 매수 시뮬레이션</Button>
                <Button 
                onPress={() => this.props.navigation.navigate('종목 전환 시뮬레이션')}>
                종목 전환 시뮬레이션</Button>
            </View>
        </ImageBackground>
    )};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgImage: {
        flex: 1,
        resizeMode: 'center',
    },      
});