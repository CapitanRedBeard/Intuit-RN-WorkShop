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

    detailedView(data) {
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
        var infoColor = deltaInPercent >= 0 ? {color: "#91DC5A"} : {color: "#D80027"}
        deltaInPercent = deltaInPercent + "%";
        return (
            <TouchableHighlight underlayColor='#666666' style={styles.rowWrapper} 
                onPress={() => {
                    this.props.navigator.push({
                        title: rowData.resource.fields.symbol,
                        component: DetailPage,
                        passProps: {data: rowData.resource.fields}
                    }); 
                }}>
                <View>
                    <Text style={styles.ticker}>{ticker}</Text>
                    <View style={styles.info}>
                        <Text style={[styles.infoText, infoColor]}>{price}</Text>
                        {caret}
                        <Text style={[styles.infoText, infoColor]}>{deltaInPercent}</Text>
                    </View>
                </View> 
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
        );
    }

}


const styles = StyleSheet.create({
    container:{
        backgroundColor: "#001d3d",
        flex: 1
    },
    rowWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: 75,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    info: {
        flexDirection: 'row',
    },
    ticker: {
        color: "white",
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
    infoText: {
        fontSize: 18,
        paddingLeft: 10,
        paddingTop: 5
    }
});

module.exports = StockResults;