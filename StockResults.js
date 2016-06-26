import React, {Component} from 'react';
import DetailPage from './DetailPage';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableHighlight,
    ListView,
    Image,
    NavigatorIOS
} from 'react-native';

var oneDigit = function(num) {
    return Math.round( num * 10 ) / 10;
} 

class StockResults extends Component {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.resource.fields.symbol !== r2.resource.fields.symbol});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.list)
        };
    }

    detailedView(data) {A
        this.props.navigator.push({
            title: data.name,
            component: DetailPage,
            passProps: {data: data}
        });   
    }

    renderRow(rowData, sectionID, rowID) {
        var ticker = rowData.resource.fields.name;
        var price = "$" + oneDigit(rowData.resource.fields.price);
        var deltaInPercent = oneDigit(+rowData.resource.fields.chg_percent);
        var caret = deltaInPercent >= 0 ? 
            <Image source={require('./Resources/caret-up.png')} style={styles.caret}/> :
            <Image source={require('./Resources/caret-down.png')} style={styles.caret}/>

        deltaInPercent = deltaInPercent + "%";
        return (
            <TouchableHighlight underlayColor='#666666' style={styles.rowWrapper} 
                onPress={() => {
                    this.props.navigator.push({
                        title: data.name,
                        component: DetailPage,
                        passProps: {data: rowData.resource.fields}
                    }); 
                }}>
                <View>
                    <Text style={styles.ticker}>{ticker}</Text>
                    <View style={styles.info}>
                        <Text style={styles.price}>{price}</Text>
                        {caret}
                        <Text style={styles.delta}>{deltaInPercent}</Text>
                    </View>
                </View> 
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
        );
    }

}


const styles = StyleSheet.create({
    rowWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: 80,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    info: {
        flexDirection: 'row',
    },
    ticker: {
        fontSize: 18,
        paddingLeft: 10,
        paddingTop: 10
    },
    caret: {
        height: 24,
        width: 24,
        marginLeft: 10,
        marginTop: 5
    },
    price: {
        fontSize: 18,
        paddingLeft: 10,
        paddingTop: 5
    },
    delta: {
        fontSize: 18,
        paddingLeft: 10,
        paddingTop: 5
    }
});

module.exports = StockResults;