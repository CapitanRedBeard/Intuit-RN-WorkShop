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
    TextInput,
    View,
    NavigatorIOS
} from 'react-native';

import SearchPage from './SearchPage';

class StockTickerApp extends React.Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.navContainer}
                initialRoute={{
          title: 'Stock Finder',
          component: SearchPage
        }}/>
        );
    }
}

const styles = StyleSheet.create({
    navContainer: {
        flex: 1
    }
});

AppRegistry.registerComponent('StockTickerApp', () => StockTickerApp);
