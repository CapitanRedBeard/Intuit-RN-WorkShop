/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

class StockTickerApp extends Component {
    render() {
        return (
            <Text style={styles.text}>
                Stock Ticker
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 30,
        margin: 80
    }
});

AppRegistry.registerComponent('StockTickerApp', () => StockTickerApp);
