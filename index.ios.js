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
    View
} from 'react-native';

class StockTickerApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickerText: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textFields}>
                    Search for stocks
                </Text>
                <Text style={styles.textFields}>
                    Search by ticker
                </Text>
                <TextInput style={styles.searchInput}
                           placeholder={"INTU, APPL"}
                           onChangeText={(text) => this.setState({tickerText: text})}
                           value={this.state.tickerText}
                />
                <Text style={styles.textFields}>
                    {this.state.tickerText}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textFields: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black'
    }
});

AppRegistry.registerComponent('StockTickerApp', () => StockTickerApp);
