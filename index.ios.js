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

class SearchPage extends Component {
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
    textFields: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
        
    },
    navContainer: {
        flex: 1,
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
