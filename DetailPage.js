import React, {Component} from 'react';

import {
    Text,
    ScrollView,
    StyleSheet,
    View,
    Image
} from 'react-native';


var twoDigit = function(num) {
    return Math.round( num * 100 ) / 100;
} 

class DetailPage extends Component {

    render() {
        var data = this.props.data;
        var name = data.name;
        var ticker = data.symbol;
        var volume = data.volume;
        var price = twoDigit(data.price);
        var deltaInPercent = twoDigit(data.chg_percent);
        var delta = twoDigit(data.change);
        var dayLow = twoDigit(data.day_low);
        var dayHigh = twoDigit(data.day_high);
        var yearLow = twoDigit(data.year_low);
        var yearHigh = twoDigit(data.year_high);
        var caret = delta >= 0 ? 
            <Image source={require('./Resources/caret-up.png')} style={styles.caret}/> :
            <Image source={require('./Resources/caret-down.png')} style={styles.caret}/>;

        var infoColor = delta >= 0 ? {color: "#91DC5A"} : {color: "#D80027"}

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>{name} ({ticker})</Text>
                    {caret}
                    <View style={styles.row}>
                        <Text style={styles.info}>Price: {price}</Text>
                        <Text style={styles.info}>Volume: {volume}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.info, infoColor]}>Change: ${delta}</Text>
                        <Text style={[styles.info, infoColor]}>{deltaInPercent}%</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.info}>Day High: ${dayHigh}</Text>
                        <Text style={styles.info}>Day Low: ${dayLow}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.info}>Year High: ${yearHigh}</Text>
                        <Text style={styles.info}>Year Low: ${yearLow}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001d3d"
    },
    wrapper: {
        alignItems: "center",
        flexDirection: "column"
    },
    row: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between"
    },
    title: {
        marginTop: 20,
        color: "white",
        fontSize: 24,
        padding: 10
    },
    info: {
        color: "white",
        fontSize: 18,
        padding: 10
    },
    caret: {
        height: 48,
        width: 48,
        marginLeft: 10,
        marginTop: 5
    }
});

module.exports = DetailPage;