import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableHighlight,
    ListView
} from 'react-native';

class StockResults extends Component {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.resource.fields.symbol !== r2.resource.fields.symbol});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.list)
        };
    }

    renderRow(rowData, sectionID, rowID) {
        
        return (
            <TouchableHighlight underlayColor='#666666'>
                <View>
                    <Text>{rowData.resource.fields.name}</Text>
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

module.exports = StockResults;