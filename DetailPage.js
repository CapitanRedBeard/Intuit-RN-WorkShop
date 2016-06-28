import React, {Component} from 'react';
import _ from 'underscore'

import {
    Text,
    ScrollView,
    StyleSheet,
    View,
    Image,
    Animated
} from 'react-native';

var twoDigit = function(num) {
    return Math.round(num * 100) / 100;
};

class DetailPage extends Component {

    constructor(props) {
        super(props);

        let pricePan = new Animated.Value(-500);
        let deltaPan = new Animated.Value(500);
        let dayPan = new Animated.Value(-500);
        let yearPan = new Animated.Value(500);
        let graphOpacity = new Animated.Value(0);

        this.state = {
            pricePan: pricePan,
            deltaPan: deltaPan,
            dayPan: dayPan,
            yearPan: yearPan,
            graphOpacity: graphOpacity
        }
    }

    componentDidMount() {

        const slideAnimatedValues = [this.state.pricePan, this.state.deltaPan, this.state.dayPan, this.state.yearPan];

        let slideAnimations = _.map(slideAnimatedValues, (val) => {
            return Animated.timing(
                val,
                {
                    toValue: 0,
                    duration: 1000
                }
            )
        });

        let graphOpacityAnimation =
            Animated.timing(
                this.state.graphOpacity,
                {
                    toValue: 1,
                    duration: 500
                }
            );

        Animated.sequence([
            Animated.parallel(slideAnimations),
            graphOpacityAnimation
        ]).start();
    }

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

        var infoColor = delta >= 0 ? {color: "#91DC5A"} : {color: "#D80027"};

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>{name} ({ticker})</Text>
                    {caret}
                    <Animated.View style={[styles.row, {left: this.state.pricePan}]}>
                        <Text style={styles.info}>Price: {price}</Text>
                        <Text style={styles.info}>Volume: {volume}</Text>
                    </Animated.View>
                    <Animated.View style={[styles.row, {left: this.state.deltaPan}]}>
                        <Text style={[styles.info, infoColor]}>Change: ${delta}</Text>
                        <Text style={[styles.info, infoColor]}>{deltaInPercent}%</Text>
                    </Animated.View>
                    <Animated.View style={[styles.row, {left: this.state.dayPan}]}>
                        <Text style={styles.info}>Day High: ${dayHigh}</Text>
                        <Text style={styles.info}>Day Low: ${dayLow}</Text>
                    </Animated.View>
                    <Animated.View style={[styles.row, {left: this.state.yearPan}]}>
                        <Text style={styles.info}>Year High: ${yearHigh}</Text>
                        <Text style={styles.info}>Year Low: ${yearLow}</Text>
                    </Animated.View>
                    <Animated.Image
                        source={{uri: "http://chart.finance.yahoo.com/z?s=" + ticker + "&t=6m&q=l&l=on&z=s&p=m50,m200"}}
                        resizeMode={'stretch'}
                        style={[styles.graph, {opacity: this.state.graphOpacity}]}
                    />
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
    },
    graph: {
        marginTop: 25,
        width: 350,
        height: 250
    }
});

module.exports = DetailPage;