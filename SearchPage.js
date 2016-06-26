import React, {Component} from 'react';
import StockResults from './StockResults';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    NavigatorIOS,
    ActivityIndicator,
    Image,
    TouchableHighlight
} from 'react-native';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickerText: '',
            isLoading: false,
            message: ''
        }
    }

    render() {
        let spinner = this.state.isLoading ?
            ( <ActivityIndicator
                size='large'/> ) :
            ( <View/>);

        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>
                    Tickr
                </Text>
                <Image source={require('./Resources/Stocks.png')} style={styles.image}/>
                <Text style={styles.textFields}>
                    Search by ticker
                </Text>

                <View style={styles.flowRight}>
                    <TextInput style={styles.searchInput}
                               placeholder={"INTU, APPL"}
                               placeholderTextColor="grey"
                               selectionColor="white"
                               onChangeText={(text) => this.setState({tickerText: text})}
                               value={this.state.tickerText}
                    />
                    <TouchableHighlight style={styles.button}
                                        underlayColor='#99d9f4'
                                        onPress={this.onSearchPressed.bind(this)}>
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>

                {spinner}

                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }

    _executeQuery(query) {
        this.setState({isLoading: true});

        fetch(query, {method: "GET"})
            .then((response) => response.json())
            .then(json => this._handleResponse(json))
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                }));
    }

    _handleResponse(response) {
        this.setState({isLoading: false, message: ''});

        this.props.navigator.push({
            title: 'Results',
            component: StockResults,
            passProps: {list: response.list.resources}
        });
    }

    onSearchPressed() {
        let query = urlForQueryAndPage(this.state.tickerText);
        this._executeQuery(query);
    }

}

function urlForQueryAndPage(tickers) {
    data = {
        format: 'json',
        view: 'detail'
    };

    var querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');

    return 'http://finance.yahoo.com/webservice/v1/symbols/' + tickers + '/quote?' + querystring;
}

const styles = StyleSheet.create({
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: "#001d3d",
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    textFields: {
        marginBottom: 20,
        marginTop: 20,
        fontSize: 24,
        textAlign: 'center',
        color: 'white'
    },
    textTitle: {
        color: 'white',
        fontSize: 48,
        marginBottom: 20,
    },
    container: {
        backgroundColor: "#001d3d",
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
        flex: 1

    },
    navContainer: {
        flex: 1,
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 10,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    image: {
        height: 165,
        marginBottom: 20
    }
});

module.exports = SearchPage;
