import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    NavigatorIOS,
    Image
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
                <Text style={styles.textTitle}>
                    Tickr
                </Text>
                <Image source={require('./Resources/Stocks.png')} style={styles.image}/>
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
        textAlign: 'center',
        color: '#656565'
    },
    textTitle: {
        color: '#656565',
        fontSize: 30,
        marginBottom: 20,
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
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        height: 138,
        flex: 1,
        marginBottom: 20
    }
});

module.exports = SearchPage;