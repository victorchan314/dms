import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, ScrollView } from 'react-native';

module.exports = class AlarmDisplayer extends React.Component {
  static propTypes = {
    alarms: React.PropTypes.array,
  }

  render() {
    if (this.props.alarms.length == 0) {
      return (
        <View style={styles.container}>
          <View style={styles.alarmItem}>
            <Text>No alarms yet!</Text>
          </View>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        {this.props.alarms.map(alarm => {
          return (
            <View style={styles.alarmItem}>
              <Text>{alarm.name}: {alarm.repeatInterval}</Text>
              <Text>{alarm.alarmId}: {alarm.startDate.toString()}</Text>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 325,
    marginBottom: 10,
    borderRadius: 3,
  },
  alarmItem: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: 3,
    padding: 10,
    margin: 10,
  },
});
